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
  
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
  }
}