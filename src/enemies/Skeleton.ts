import Phaser from 'phaser'

enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

const randomDirection = (exclude: Direction): Direction => {
  let newDirection = Phaser.Math.Between(0, 3)

  while (newDirection === exclude) {
    newDirection = Phaser.Math.Between(0, 3)
  }

  return newDirection
}

export default class Skeleton extends Phaser.Physics.Arcade.Sprite {
  private direction = Direction.DOWN
  private moveEvent
  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.anims.play('skeleton-idle-down')

    this.moveEvent = scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.direction = randomDirection(this.direction)
      },
      loop: true
    })
  }

  protected preUpdate(t: number, dt: number): void {
      super.preUpdate(t, dt)

      const speed = 50

      switch (this.direction) {
        case Direction.UP:
          this.setVelocity(0, -speed)
          this.anims.play('skeleton-run-up', true)
          break

        case Direction.DOWN:
          this.setVelocity(0, speed)
          this.anims.play('skeleton-run-down', true)
          break

        case Direction.LEFT:
          this.setVelocity(-speed, 0)
          this.anims.play('skeleton-run-right', true)
          this.setFlipX(true)
          break

        case Direction.RIGHT:
          this.setVelocity(speed, 0)
          this.anims.play('skeleton-run-right', true)
          this.setFlipX(false)
          break
      }
  }
}