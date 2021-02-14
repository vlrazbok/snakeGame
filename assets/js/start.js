var Start =
    {
        preload: function ()
        {
          game.load.image('start', './assets/img/button-image.png');
        },

        create: function ()
        {

            this.add.button(90, 150, 'start', this.startGame, this);
        },

        startGame: function ()
        {
            this.state.start('Game');
        }
    };