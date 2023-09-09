import Phaser from 'phaser'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      squirrel(x: number, y: number, texture: string, frame?: string | number): Squirrel
    }
  }
}

enum HealthState {
  IDLE,
  DAMAGE,
  DEAD
}

export default class Squirrel extends Phaser.Physics.Arcade.Sprite {
  private _healthState = HealthState.IDLE
  private _health = 3
  private _damageTime = 0

  get health() {
    return this._health
  }

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.anims.play('squirrel-idle-down')
  }

  handleDamage(dir: Phaser.Math.Vector2) {
    // if (this._health <= 0 || this._healthState === HealthState.DAMAGE) {
    //   return
    // }

    // --this._health

    // if (this._health <= 0) {
      // dead
    // } else {
      this._healthState = HealthState.DAMAGE
      this.setVelocity(dir.x, dir.y)
      this._damageTime = 0
      
    // }
  }

  protected preUpdate(t: number, dt: number): void {
    super.preUpdate(t, dt)

    switch (this._healthState) {
      case HealthState.DAMAGE:
        this._damageTime += dt
        if (this._damageTime > 250) {
          this._healthState = HealthState.IDLE
          this.setTint(0xffffff)
          this._damageTime = 0
        }

        if (Math.floor(this._damageTime / 10) % 2 === 1) {
          this.setTint(0xff0000)
        } else {
          this.setTint(0xffffff)
        }
        break

      case HealthState.DEAD:

        break

      case HealthState.IDLE:

        break
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors || this._healthState === HealthState.DAMAGE) {
      return
    }

    const speed = 100
    const upDown = cursors.up?.isDown
    const downDown = cursors.down?.isDown
    const leftDown = cursors.left?.isDown
    const rightDown = cursors.right?.isDown

    if (upDown) {
      this.setVelocity(0, -speed)
      this.anims.play('squirrel-run-up', true)
    } else if (downDown) {
      this.setVelocity(0, speed)
      this.anims.play('squirrel-run-down', true)
    } else if (leftDown) {
      this.setVelocity(-speed, 0)
      this.anims.play('squirrel-run-left', true)
    } else if (rightDown) {
      this.setVelocity(speed, 0)
      this.anims.play('squirrel-run-right', true)
    } else {
      this.setVelocity(0, 0)
      if (this.anims.currentAnim !== null) {
        const frame = this.anims.currentAnim.key.split('-')
        frame[1] = 'idle'
        this.anims.play(frame.join('-'), true)
      }
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register('squirrel', function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, frame?: string | number) {
  const sprite = new Squirrel(this.scene, x, y, texture, frame)

  this.displayList.add(sprite)
  this.updateList.add(sprite)

  this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY)

  return sprite
})
