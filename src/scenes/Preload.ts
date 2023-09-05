import Phaser from 'phaser'

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('tiles', '/tilemaps/0x72_16x16DungeonTileset.v5.png')
    this.load.tilemapTiledJSON('dungeon-02', '/tilemaps/dungeon-02.json')
  }

  create() {
    this.scene.start('game')
  }
}