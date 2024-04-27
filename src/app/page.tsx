'use client'

import * as Tone from 'tone'

import { useEffect } from 'react'
import { BubbleSynth } from './audio/instruments/bubble-synth'
import { EffectsChain } from './audio/effects/effects-chain'
import Button from '@mui/material/Button'

import BabylonScene from './components/BabylonScene'

export default function Home() {
  const startContext = () => {
    Tone.start()
  }

  const startTransport = () => {
    Tone.Transport.start()
  }

  const stopTransport = () => {
    Tone.Transport.stop()
  }

  useEffect(() => {
    const bpm = 140
    const offset = 40
    const theScale = [
      0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27, 29, 31, 32,
      34, 36, 39, 41,
    ]
    const effects = new EffectsChain(bpm)
    const synth = new BubbleSynth()

    const note = {
      index: 0,
      count: 0,
    }
    const loop = new Tone.Loop((time) => {
      note.index = Math.floor(Math.random() * theScale.length)
      const midiNumber = theScale[note.index]

      // Higher notes are quieter
      const velocity = midiNumber > 24 ? 0.5 : 0.8

      if (
        note.count == 0 ||
        note.count % 3 === 0 ||
        note.count % 5 === 0 ||
        note.count % 8 === 0 ||
        note.count % 13 === 0 ||
        note.count % 21 === 0
      ) {
        synth.voice
          .triggerAttackRelease(
            Tone.Midi(midiNumber + offset).toFrequency(),
            '8n',
            time,
            velocity
          )
          .connect(effects.hpfChannel)
          .connect(effects.delayChannel)
      }

      note.count++
      console.log('loop')
    }, '4n')

    loop.start(0)
  })
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
        <Button variant="text" onClick={startContext}>
          start context
        </Button>
        <Button variant="text" onClick={startTransport}>
          play
        </Button>
        <Button variant="text" onClick={stopTransport}>
          stop
        </Button>
      </div>
      <BabylonScene></BabylonScene>
    </main>
  )
}
