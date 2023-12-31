import Phaser from 'phaser'

export default class Preload extends Phaser.Scene {
  constructor() {
    super('preload')
  }

  preload() {
    this.load.image('tiles', '/tilemaps/0x72_16x16DungeonTileset.v5.png')
    this.load.tilemapTiledJSON('dungeon-02', '/tilemaps/dungeon-02.json')

    this.load.atlas('squirrel', '/sprites/character/squirrel.png', '/sprites/character/squirrel.json')
    this.load.atlas('skeleton', '/sprites/enemies/skeleton.png', '/sprites/enemies/skeleton.json')

    this.load.image('ui-heart-empty', '/ui/hearts/ui_heart_empty.png')
    this.load.image('ui-heart-half', '/ui/hearts/ui_heart_half.png')
    this.load.image('ui-heart-full', '/ui/hearts/ui_heart_full.png')
  }

  create() {
    this.scene.start('game')
  }
}