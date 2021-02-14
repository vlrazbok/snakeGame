var Game_Over = {

  preload: function ()
  {
      
      game.load.image('gameover', './assets/img/gameover.png')
  },

  create: function ()
  {
      
      this.add.button(90, 20, 'gameover', this.startGame, this)

     
      game.add.text(90, 350, "Your score", { font: "bold 25px sans-serif", fill: "yellow", align: "center"})
      game.add.text(250, 350, score.toString(), { font: "bold 28px sans-serif", fill: "yellow", aling: "center"})
  },

  startGame: function ()
  {
      this.state.start('Start')
  }
};
