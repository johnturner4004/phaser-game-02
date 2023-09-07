import '../characters/Squirrel'

import Phaser from 'phaser'
import Squirrel from '../characters/Squirrel'
import { createSquirrelAnims } from '../anims/SquirrelAnims'
import { debugDraw } from '../utils/debug'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private squirrel!: Squirrel

	constructor() {
		super('game')
	}

	preload() {
    this.cursors = this.input.keyboard!.createCursorKeys()
	}

	create() {
    createSquirrelAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon-02' })
    const tileset = map.addTilesetImage('dungeon-02', 'tiles')

    map.createLayer('Ground', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer

    this.squirrel = this.add.squirrel(100, 100, 'squirrel')
    this.squirrel.setSize(this.squirrel.width * 0.5, this.squirrel.height * 0.8)
    this.squirrel.body!.offset.x = 9
    
    const wallLayer = map.createLayer('Wall', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    wallLayer.setCollisionByProperty({ collides: true })
    debugDraw(wallLayer, this, {red: 243, green: 234, blue: 48, alpha: 255})
    
    const doorLayer = map.createLayer('Door', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    doorLayer.setCollisionByProperty({ door: true })
    debugDraw(doorLayer, this, {red: 227, green: 28, blue: 121, alpha: 255})

    this.physics.add.collider(this.squirrel, wallLayer)
    this.physics.add.collider(this.squirrel, doorLayer, this.handleSquirrelDoorCollision, undefined, this)
	}

  private handleSquirrelDoorCollision(obj1: Phaser.Physics.Arcade.Sprite, obj2: Phaser.GameObjects.GameObject): void {
    const squirrelObj = obj1
    const doorObj = obj2
    const direction = squirrelObj.anims.currentAnim!.key.split('-')[2]

    if (direction === 'down') {
      this.cameras.main.scrollY += 304
      squirrelObj.y += 70
    } else if (direction === 'up') {
      this.cameras.main.scrollY -= 304
      squirrelObj.y -= 70
    }
  }

  update(t: number, dt: number): void {
    if (this.squirrel) {
      this.squirrel.update(this.cursors)
    }
  }
}
