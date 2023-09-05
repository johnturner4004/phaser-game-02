import Phaser from 'phaser'

const createSquirrelAnims = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: 'squirrel-idle-down',
    frames: anims.generateFrameNames('squirrel', {start:0 ,end:1 ,suffix: '.png'}),
    repeat: -1,
    frameRate: 2
  })

  anims.create({
    key: 'squirrel-run-down',
    frames: anims.generateFrameNames('squirrel', { start: 2, end: 7, suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-attack-down',
    frames: anims.generateFrameNames('squirrel', { start: 8, end: 9, suffix: '.png' }),
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-idle-right',
    frames: anims.generateFrameNames('squirrel', { start: 33, end: 34, suffix: '.png' }),
    repeat: -1,
    frameRate: 2
  })

  anims.create({
    key: 'squirrel-run-right',
    frames: anims.generateFrameNames('squirrel', {start: 35, end: 40, suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-attack-right',
    frames: anims.generateFrameNames('squirrel', { start: 41, end: 42, suffix: '.png' }),
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-idle-left',
    frames: anims.generateFrameNames('squirrel', { start: 44, end: 45, suffix: '.png' }),
    repeat: -1,
    frameRate: 2
  })

  anims.create({
    key: 'squirrel-run-left',
    frames: anims.generateFrameNames('squirrel', {start: 46, end: 51, suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-attack-left',
    frames: anims.generateFrameNames('squirrel', { start: 52, end: 53, suffix: '.png' }),
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-idle-up',
    frames: anims.generateFrameNames('squirrel', { start: 77, end: 78, suffix: '.png' }),
    repeat: -1,
    frameRate: 2
  })

  anims.create({
    key: 'squirrel-run-up',
    frames: anims.generateFrameNames('squirrel', {start: 79, end: 84, suffix: '.png' }),
    repeat: -1,
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-attack-up',
    frames: anims.generateFrameNames('squirrel', { start: 85, end: 86, suffix: '.png' }),
    frameRate: 5
  })

  anims.create({
    key: 'squirrel-death',
    frames: anims.generateFrameNames('squirrel', { start: 91, end: 93, suffix: '.png' }),
    frameRate: 3
  })
}

export {
  createSquirrelAnims
}