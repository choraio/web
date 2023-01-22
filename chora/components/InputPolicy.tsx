import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import {
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from "../api/cosmos/group/v1/types"

import InputNumber from "./InputNumber";

import * as styles from "./InputPolicy.module.css"

const defaultId = "policy"
const defaultLabel = "policy"

const thresholdPlaceholder = "1"
const percentagePlaceholder = "0.5"
const periodPlaceholder = "3600"

const InputPolicy = ({ id, label, setPolicy }: any) => {

  const [type, setType] = useState<string>("threshold")
  const [threshold, setThreshold] = useState<string>("")
  const [percentage, setPercentage] = useState<string>("")
  const [votingPeriod, setVotingPeriod] = useState<string>("")
  const [minExecutionPeriod, setMinExecutionPeriod] = useState<string>("")

  useEffect(() => {
    setPolicy(undefined)
  }, [type])

  useEffect(() => {

    const w = {
      votingPeriod: {
        seconds: Long.fromString(votingPeriod || "0"),
      },
      minExecutionPeriod: {
        seconds: Long.fromString(minExecutionPeriod || "0"),
      },
    }

    let p: any

    if (type === "threshold") {
      p = {
        typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy",
        value: ThresholdDecisionPolicy.encode({
          threshold: threshold,
          windows: w,
        }).finish(),
      }
    }

    if (type === "percentage") {
      p = {
        typeUrl: "/cosmos.group.v1.PercentageDecisionPolicy",
        value: PercentageDecisionPolicy.encode({
          percentage: percentage,
          windows: w,
        }).finish(),
      }
    }

    setPolicy(p)

  }, [threshold, percentage, votingPeriod, minExecutionPeriod])

  return (
    <span className={styles.policy}>
      <label htmlFor={(id || defaultId) + "-type"}>
        {(label || defaultLabel) + " type"}
        <select
          id={(id || defaultId) + "-type"}
          value={type}
          onChange={event => setType(event.target.value)}
        >
          <option value="threshold">
            {"threshold"}
          </option>
          <option value="percentage">
            {"percentage"}
          </option>
        </select>
      </label>
      {type == "threshold" ? (
        <InputNumber
          id={(id || defaultId) + "-threshold"}
          label={(label || defaultLabel) + " threshold"}
          placeholder={thresholdPlaceholder}
          number={threshold}
          setNumber={setThreshold}
        />
      ) : (
        <InputNumber
          id={(id || defaultId) + "-percentage"}
          label={(label || defaultLabel) + " percentage"}
          placeholder={percentagePlaceholder}
          number={percentage}
          setNumber={setPercentage}
        />
      )}
      <InputNumber
        id={(id || defaultId) + "-voting-period"}
        label={(label || defaultLabel) + " voting period"}
        placeholder={periodPlaceholder}
        number={votingPeriod}
        setNumber={setVotingPeriod}
      />
      <InputNumber
        id={(id || defaultId) + "-min-execution-period"}
        label={(label || defaultLabel) + " min execution period"}
        placeholder={periodPlaceholder}
        number={minExecutionPeriod}
        setNumber={setMinExecutionPeriod}
      />
    </span>
  )
}

export default InputPolicy