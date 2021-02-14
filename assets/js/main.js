var game

game = new Phaser.Game(600, 600, Phaser.AUTO, '')

game.state.add('Start', Start)

game.state.add('Game', Game)

game.state.start('Start')

game.state.add('Game_Over', Game_Over)