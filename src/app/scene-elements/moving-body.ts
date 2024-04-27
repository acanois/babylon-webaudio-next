import {
  Scene,
  Vector3,
  Mesh,
  MeshBuilder,
  StandardMaterial,
  Color3,
} from '@babylonjs/core'

export class MovingBody {
  position: Vector3
  velocity: Vector3
  acceleration: Vector3
  mass: number
  radius: number
  mesh: Mesh
  scene: Scene
  color: Color3

  constructor(
    position: Vector3,
    velocity: Vector3,
    acceleration: Vector3,
    mass: number,
    radius: number,
    color: Color3,
    scene: Scene
  ) {
    this.position = position
    this.velocity = velocity
    this.acceleration = acceleration
    this.mass = mass
    this.radius = radius
    this.color = color
    this.scene = scene
    this.mesh = this.createMesh()
  }

  applyForce(force: Vector3) {
    const f = force.scale(1 / this.mass)
    this.acceleration = this.acceleration.add(f)
  }

  update() {
    this.velocity.addInPlace(this.acceleration)
    this.position.addInPlace(this.velocity)
    this.acceleration.multiplyInPlace(Vector3.Zero())
  }

  buildSphere() {
    const sphere = MeshBuilder.CreateSphere(
      'mover',
      {
        diameter: this.mass,
      },
      this.scene
    )
    sphere.position = this.position
    const sphereMaterial: StandardMaterial = new StandardMaterial(
      'moverMaterial',
      this.scene
    )
    sphereMaterial.diffuseColor = this.color
    sphere.material = sphereMaterial

    return sphere
  }

  setMeshType(meshType: string) {
    switch(meshType) {
      case 'sphere':
        return this.buildSphere()
    }
  }

  createMesh(): Mesh {
    const sphere = MeshBuilder.CreateSphere(
      'mover',
      {
        diameter: this.mass,
      },
      this.scene
    )
    sphere.position = this.position
    const sphereMaterial: StandardMaterial = new StandardMaterial(
      'moverMaterial',
      this.scene
    )
    sphereMaterial.diffuseColor = this.color
    sphere.material = sphereMaterial

    return sphere
  }
}
