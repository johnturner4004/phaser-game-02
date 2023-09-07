import Phaser from 'phaser'

const debugDraw = (layer: Phaser.Tilemaps.StaticTilemapLayer, scene: Phaser.Scene, color: { red: number, green: number, blue: number, alpha: number}) => {
  const debugGraphics = scene.add.graphics().setAlpha(0.75)
  layer.renderDebug(debugGraphics, {
    tileColor: null,
    collidingTileColor:  new Phaser.Display.Color(color.red, color.green, color.blue, color.alpha),
    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
  })
}

export {
  debugDraw
}