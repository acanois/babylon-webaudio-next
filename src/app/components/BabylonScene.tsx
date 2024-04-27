'use client'

import React from 'react'
import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
} from '@babylonjs/core'
import SceneComponent from 'babylonjs-hook'

const onSceneReady = (scene: Scene) => {
  const canvas = scene.getEngine().getRenderingCanvas()
  canvas!.width = window.innerWidth
  canvas!.height = window.innerHeight - 60

  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 2.5,
    3,
    new Vector3(0, 0, 0),
    scene
  )
  camera.attachControl(canvas, true)

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
  scene.addLight(light)
  const box = MeshBuilder.CreateBox('box', {}, scene)
  scene.addMesh(box)
}

const onRender = () => {}

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
