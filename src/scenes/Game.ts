import '../characters/Squirrel'

import Phaser from 'phaser'
import Squirrel from '../characters/Squirrel'
import { createSquirrelAnims } from '../anims/SquirrelAnims'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private squirrel!: Squirrel

	constructor() {
		super('game')
	}

	preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
	}

	create() {
    createSquirrelAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon-02' })
    const tileset = map.addTilesetImage('dungeon-02', 'tiles')

    map.createLayer('Ground', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    map.createLayer('Wall', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer

    this.squirrel = this.add.squirrel(100, 100, 'squirrel')
	}

  update(t: number, dt: number): void {
    if (this.squirrel) {
      this.squirrel.update(this.cursors)
    }
  }
}
