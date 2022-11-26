import * as React from "react"
import { createContext, useState } from "react"

import { ChainInfo, Key } from "@keplr-wallet/types"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const WalletContext = createContext({}) // TODO

const WalletContextProvider = (props: any) => {

  const [network, setNetwork] = useState<string>(choraLocal.chainId);
  const [chainInfo, setChainInfo] = useState<ChainInfo>(choraLocal);
  const [keplr, setKeplr] = useState<any>() // TODO
  const [wallet, setWallet] = useState<any>() // TODO

  const [error, setError] = useState<string>("")
  const [result, setResult] = useState<string>("");

  const getKeplr = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (window.keplr) {
      console.log("keplr", window.keplr)
      setKeplr(window.keplr)

      switch (network) {
        case choraLocal.chainId:
          setChainInfo(choraLocal)
          break
        case choraTestnet.chainId:
          setChainInfo(choraTestnet)
          break
        case regenLocal.chainId:
          setChainInfo(regenLocal)
          break
        case regenRedwood.chainId:
          setChainInfo(regenRedwood)
          break
        case regenHambach.chainId:
          setChainInfo(regenHambach)
          break
      }

      // enable chain
      await window.keplr.enable(network).then(() => {
        setResult(network)
      }).catch(async err => {
        console.log(err.message)
        setError(err.message)

        await window.keplr?.experimentalSuggestChain(chainInfo).then(() => {
          setResult(network)
          setError("")
        }).catch(err => {
          console.log(err.message)
          setError(err.message)
        })
      })

      // get active key
      await window.keplr.getKey(network).then(wallet => {
        console.log(" wallet", wallet)
        setWallet(wallet)
        setError("")
      }).catch(err => {
        console.log(err.message)
        setError(err.message)
      })
    }

    if (document.readyState === "complete") {
      console.log("ready state complete", window.keplr)
      setKeplr(window.keplr)
      setError("")
    }

    const windowStateChange = async (event: Event) => {
      console.log("window state change", event)

      // get active key
      if (window && window.keplr) {
        await window.keplr.getKey(network).then((wallet: Key) => {
          console.log(network + " wallet", wallet)
          setWallet(wallet)
          setError("")
        }).catch((err: { message: string }) => {
          console.log(err.message)
          setError(err.message)
        })
      }
    }

    const documentStateChange = (event: Event) => {
      console.log("document state change", event)

      if (event.target && (event.target as Document).readyState === "complete") {
        console.log("ready state complete", event)

        document.removeEventListener("readystatechange", documentStateChange)
        window.removeEventListener("keplr_keystorechange", windowStateChange)
      }
    }

    document.addEventListener("readystatechange", documentStateChange)
    window.addEventListener("keplr_keystorechange", windowStateChange)
  }

  return (
    <WalletContext.Provider value={{
        getKeplr,
        chainInfo,
        setChainInfo,
        network,
        setNetwork,
        result,
        keplr,
        wallet,
        error,
    }}>
      {props.children}
    </WalletContext.Provider>
  )
}

export { WalletContext, WalletContextProvider }