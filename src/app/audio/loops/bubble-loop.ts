import * as Tone from 'tone'
import { Bubble } from '../sceneElements/reactiveElement'

export class BubbleLoop {
  loop: Tone.Loop
  noteCount: number
  noteIndex: number

  constructor(bubbles: Bubble[]) {
    const theScale = [
      0, 1, 3, 5, 7, 8, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27, 29, 31, 32,
      34, 36, 39, 41,
    ]
    this.noteIndex = 0
    this.noteCount = 0

    this.loop = new Tone.Loop((time) => {
      this.noteIndex = Math.floor(Math.random() * theScale.length)
      const note = theScale[this.noteIndex]
      const offset = 42
      const velocity = note > 24 ? 0.5 : 0.8

      if (
        this.noteCount == 0 ||
        this.noteCount % 3 === 0 ||
        this.noteCount % 5 === 0 ||
        this.noteCount % 8 === 0 ||
        this.noteCount % 13 === 0 ||
        this.noteCount % 21 === 0
      ) {
        bubbles[this.noteIndex].synth.synth.triggerAttackRelease(
          Tone.Midi(note + offset).toFrequency(),
          '8n',
          time,
          velocity
        )
      }
      this.noteCount += 1
    }, '4n')
  }

  start() {
    this.loop.start(0)
  }

  stop() {
    this.loop.stop()
  }
}
