'use client'

import Image from 'next/image'
import * as Tone from 'tone'

import { useEffect } from 'react'
import { BubbleSynth } from './audio/instruments/bubble-synth'
import ResponsiveAppBar from './components/Navigation'

export default function Home() {
  useEffect(() => {
    Tone.start()

    const BPM = 140
    const synth = new BubbleSynth()
  })
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ResponsiveAppBar></ResponsiveAppBar>
    </main>
  )
}
