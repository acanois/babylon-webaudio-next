import * as Tone from 'tone'

export class EffectsChain {
  hpf: Tone.Filter
  bpf: Tone.Filter
  filterBase: number
  octaves: number
  delay: Tone.PingPongDelay
  delayTime: number
  reverb: Tone.Reverb
  dryGain: Tone.Gain
  hpfChannel: Tone.Channel
  delayChannel: Tone.Channel
  noteDivision: object
  meter: Tone.Meter
  bpm: number

  constructor(bpm: number) {
    this.bpm = bpm
    this.noteDivision = {
      whole: 1,
      half: 2,
      triplet4: 3,
      straight4: 4,
      dot4: 6,
      straight8: 8,
      triplet8: 9,
    }
    // Reverb, dry gain for reverb
    this.meter = new Tone.Meter({ normalRange: true, channels: 1 })
    this.reverb = new Tone.Reverb({ decay: 8, wet: 0.4 }).toDestination()
    this.reverb.connect(this.meter)
    this.dryGain = new Tone.Gain(0.7).connect(this.reverb) // to reverb

    // Filters
    this.filterBase = 300
    this.octaves = 6
    this.hpf = new Tone.Filter({
      type: 'highpass',
      frequency: 70,
      rolloff: -24,
    }).connect(this.dryGain) // to dry gain
    this.bpf = new Tone.Filter({
      type: 'bandpass',
      frequency: this.filterBase * this.octaves,
    }).connect(this.reverb) // to reverb
    this.bpf = new Tone.Filter({
      type: 'bandpass',
      frequency: this.filterBase * this.octaves,
    }).connect(this.reverb) // to reverb

    // Delay
    this.delayTime = (1 / BPM / 3) * 1000
    this.delay = new Tone.PingPongDelay({
      delayTime: this.delayTime,
      wet: 1.0,
    }).connect(this.bpf) // to bandpass

    // 15 seems to be as far as you can go without clipping
    this.hpfChannel = new Tone.Channel({
      volume: 12,
    }).connect(this.hpf)
    this.delayChannel = new Tone.Channel({
      volume: 15,
    }).connect(this.delay)
  }
}
