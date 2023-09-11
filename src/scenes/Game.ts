import '../characters/Squirrel'

import Phaser from 'phaser'
import Skeleton from '../enemies/Skeleton'
import Squirrel from '../characters/Squirrel'
import { createSkeletonAnims } from '../anims/SkeletonAnims'
import { createSquirrelAnims } from '../anims/SquirrelAnims'
import { debugDraw } from '../utils/debug'
import { sceneEvents } from '../events/EventsCenter'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private squirrel!: Squirrel
  private skeletons!: Phaser.Physics.Arcade.Group
  private squirrelSkeletonCollider?: Phaser.Physics.Arcade.Collider
  private cameraPosition = {
    x: 200,
    y: 152
  }

	constructor() {
		super('game')
	}

	preload() {
    this.cursors = this.input.keyboard!.createCursorKeys()
	}

	create() {
    this.scene.run('game-ui')

    createSquirrelAnims(this.anims)
    createSkeletonAnims(this.anims)

    const map = this.make.tilemap({ key: 'dungeon-02' })
    const tileset = map.addTilesetImage('dungeon-02', 'tiles')

    map.createLayer('Ground', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer

    this.squirrel = this.add.squirrel(100, 100, 'squirrel')
    this.squirrel.setSize(this.squirrel.width * 0.5, this.squirrel.height * 0.8)
    this.squirrel.body!.offset.x = 9
    
    const wallLayer = map.createLayer('Wall', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    wallLayer.setCollisionByProperty({ collides: true })
    // debugDraw(wallLayer, this, {red: 243, green: 234, blue: 48, alpha: 255})
    
    const doorLayer = map.createLayer('Door', (tileset as Phaser.Tilemaps.Tileset), 0, 0) as Phaser.Tilemaps.TilemapLayer
    doorLayer.setCollisionByProperty({ door: true })
    // debugDraw(doorLayer, this, {red: 227, green: 28, blue: 121, alpha: 255})

    this.skeletons = this.physics.add.group({
      classType: Skeleton,
      createCallback: (go) => {
        const skeletonGo = go as Skeleton
        skeletonGo.body!.onCollide = true
      }
    })

    const skeletonLayer = map.getObjectLayer('Skeletons') 
    skeletonLayer?.objects.forEach(skeletonObj => {
      this.skeletons.get(skeletonObj.x, skeletonObj.y, 'skeleton')
    })

    this.physics.add.collider(this.squirrel, wallLayer)
    this.physics.add.collider(this.squirrel, doorLayer, this.handleSquirrelDoorCollision, undefined, this)

    this.physics.add.collider(this.skeletons, wallLayer)
    this.physics.add.collider(this.skeletons, doorLayer)

    this.squirrelSkeletonCollider = this.physics.add.collider(this.squirrel, this.skeletons, this.handleSquirrelSkeletonCollision, undefined, this)
	}

  private handleSquirrelDoorCollision(obj1: Phaser.Physics.Arcade.Sprite, obj2: Phaser.GameObjects.GameObject): void {
    const squirrelObj = obj1
    const direction = squirrelObj.anims.currentAnim!.key.split('-')[2]

    if (direction === 'down') {
      this.cameraPosition.y += 304
      this.cameras.main.pan(this.cameraPosition.x, this.cameraPosition.y, 2000, 'Sine.easeInOut')
      squirrelObj.y += 70
    } else if (direction === 'up') {
      this.cameraPosition.y -= 304
      this.cameras.main.pan(this.cameraPosition.x, this.cameraPosition.y, 2000, 'Sine.easeInOut')
      squirrelObj.y -= 70
    }
  }

  private handleSquirrelSkeletonCollision(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    const skeleton = obj2 as Skeleton

    const dx = this.squirrel.x - skeleton.x
    const dy = this.squirrel.y - skeleton.y

    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)

    this.squirrel.handleDamage(dir)

    sceneEvents.emit('player-health-changed', this.squirrel.health)

    if (this.squirrel.health <= 0) {
      this.squirrelSkeletonCollider?.destroy()
    }
  }

  update(t: number, dt: number): void {
    if (this.squirrel) {
      this.squirrel.update(this.cursors)
    }
  }
}
