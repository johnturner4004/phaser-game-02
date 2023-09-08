import Phaser from 'phaser'

const createSkeletonAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'skeleton-idle-down',
    frames: [{ key: 'skeleton', frame: 'skeleton/120.png' }],
    repeat: -1
  })

  anims.create({
    key: 'skeleton-run-up',
    frames: anims.generateFrameNames('skeleton', {start: 126, end: 127, prefix: 'skeleton/', suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'skeleton-run-down',
    frames: anims.generateFrameNames('skeleton', {start: 124, end: 125, prefix: 'skeleton/', suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'skeleton-run-right',
    frames: anims.generateFrameNames('skeleton', {start: 128, end: 129, prefix: 'skeleton/', suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })
}

export {
  createSkeletonAnims
}