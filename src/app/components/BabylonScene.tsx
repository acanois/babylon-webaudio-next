'use client'

import React from 'react'

import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  Color4,
  Color3,
} from '@babylonjs/core'

import SceneComponent from 'babylonjs-hook'

import { MovingBody } from '../scene-elements/moving-body'

const MAX_BODIES = 360

// Camera stuff
let camera: ArcRotateCamera
let camTheta = 0.0

const cameraAlphaOrigin = Math.PI / 2
const cameraBetaOrigin = Math.PI / 2
const cameraRadius = 175

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()
  canvas!.width = window.innerWidth
  canvas!.height = window.innerHeight - 60 // Magic number - height of the header

  scene.clearColor = new Color4(0, 0, 0, 1.0)

  camera = new ArcRotateCamera(
    'Camera',
    cameraAlphaOrigin,
    cameraBetaOrigin,
    cameraRadius,
    Vector3.Zero(),
    scene
  )
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(-1, 1, 1), scene)
  light.intensity = 1.0

  let theta = 0.0
  let radius = 1.0 + (Math.random() - 0.5)
  let red = 0.0
  let blue = 1.0
  let colorMod = 1 / MAX_BODIES / 2

  for (let i = 0; i < MAX_BODIES; i++) {
    const star = new MovingBody(
      new Vector3(Math.sin(theta) * radius, 0.0, Math.cos(theta) * radius), // position
      new Vector3(0.0, 0.0, 0.0), // velocity
      new Vector3(0.0, 0.0, 0.0), // acceleration
      1.0,
      radius,
      new Color3(1, blue, 1),
      scene
    )
    theta += (1 / MAX_BODIES) * 100
    radius += 0.25
    red += colorMod
    blue -= colorMod
  }
}

const onRender = () => {
  camTheta += 0.001
  camera.alpha -= 0.00005
  camera.beta = cameraBetaOrigin + (Math.sin(camTheta) * 0.03)
}

function BabylonScene() {
  return (
    <div className="App">
      <header className="App-header">
        <SceneComponent
          antialias
          onSceneReady={onSceneReady}
          onRender={onRender}
          id="my-canvas"
        />
      </header>
    </div>
  )
}

export default BabylonScene
