import Phaser from 'phaser'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      squirrel(x: number, y: number, texture: string, frame?: string | number): Squirrel
    }
  }
}

export default class Squirrel extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)

    this.anims.play('squirrel-idle-down')
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) {
      return
    }

    const speed = 100
    const upDown = cursors.up?.isDown
    const downDown = cursors.down?.isDown
    const leftDown = cursors.left?.isDown
    const rightDown = cursors.right?.isDown

    if (upDown) {
      this.setVelocity(0, -speed)
    } else if (downDown) {
      this.setVelocity(0, speed)
    } else if (leftDown) {
      this.setVelocity(-speed, 0)
    } else if (rightDown) {
      this.setVelocity(speed, 0)
    } else {
      this.setVelocity(0, 0)
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
