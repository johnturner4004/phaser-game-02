import Phaser from 'phaser'
import { createSquirrelAnims } from '../anims/SquirrelAnims'

export default class Game extends Phaser.Scene {
	constructor() {
		super('game')
	}

	// preload() {
    
	// }

	create() {
    createSquirrelAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon-02' })
    const tileset = map.addTilesetImage('dungeon-02', 'tiles')

    map.createLayer('Ground', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    map.createLayer('Wall', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer

    const squirrel = this.add.sprite(100, 100, 'squirrel', '0.png')
    squirrel.anims.play('squirrel-idle-down')
	}
}
