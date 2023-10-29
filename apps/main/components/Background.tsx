'use client'

import { ThemeContext } from 'chora'
import darkBackground from 'chora/assets/images/chora_dark.png'
import lightBackground from 'chora/assets/images/chora_light.png'
import Image from 'next/image'
import { useContext } from 'react'

import styles from './Background.module.css'

const Background = () => {
  const { darkTheme } = useContext(ThemeContext)

  return (
    <div className={styles.background}>
      <Image alt="chora" src={darkTheme ? darkBackground : lightBackground} />
    </div>
  )
}

export default Background