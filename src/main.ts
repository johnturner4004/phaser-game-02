import Game from './scenes/Game'
import Phaser from 'phaser'
import Preload from './scenes/Preload'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 400,
	height: 304,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
      debug: true
		},
	},
	scene: [Preload, Game],
  scale: {
    zoom: 2
  }
}

export default new Phaser.Game(config)
