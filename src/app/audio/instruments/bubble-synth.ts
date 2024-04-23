import * as Tone from 'tone'

export class BubbleSynth {
  synth: Tone.FMSynth

  constructor() {
    // FM Synth
    this.synth = new Tone.FMSynth({
      modulationIndex: 12,
      oscillator: {
        type: 'sine',
        phase: Math.floor(Math.random() * 360),
        partialCount: 0,
      },
      envelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.0,
        release: 0.0,
        attackCurve: 'linear',
        releaseCurve: 'exponential',
        decayCurve: 'exponential',
      },
      modulation: {
        partialCount: 16,
        phase: 0,
        type: 'sine',
      },
      modulationEnvelope: {
        attack: 0.005,
        decay: 0.3,
        sustain: 0.0,
        release: 0.0,
        attackCurve: 'linear',
        releaseCurve: 'exponential',
        decayCurve: 'exponential',
      },
    })
  }
}
