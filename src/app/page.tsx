'use client'

import Image from "next/image";
import * as Tone from 'tone'

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Tone.start()
  })
  return (
    <main className="flex min-h-screen flex-col items-center">
      Nothing
    </main>
  )
}
