'use client'

import Image from "next/image";
import * as Tone from 'tone'

import { useEffect } from "react";
import { BubbleSynth } from "./audio/instruments/bubble-synth";

export default function Home() {
  useEffect(() => {
    Tone.start()
    const synth = new BubbleSynth()
  })
  return (
    <main className="flex min-h-screen flex-col items-center">
      Nothing
    </main>
  )
}
