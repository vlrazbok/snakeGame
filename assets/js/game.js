var snake, coin, size, score, level, updateLevel,
  direction, newDirection, addNew, cursors, scoreTextValue,
  levelTextValue, textStyleKey, textStyleValue

var Game = {
  preload: function (){
      
      game.load.image('snake', './assets/img/player.png');
      game.load.image('coin', './assets/img/coin.png');
  },
  create: function(){
    snake = []
    coin = {}
    size = 18
    score = 0
    level = 0
    updateLevel = 0
    direction = 'up'
    newDirection = null
    addNew = false

    cursors = game.input.keyboard.createCursorKeys()




    for (var i = 0; i < 3; i++)
        {
           
            snake[i] = game.add.sprite(180 + i * size, 180, 'snake');
        }

    this.generateCoin()

    textStyleKey = {font: "bold 25px sans-serif", fill: "yellow", align: "center"}
    textStyleValue = { font: "bold 28px sans-serif", fill: "yellow", aling: "center"}

    game.add.text(30, 20, "Score", textStyleKey)

    scoreTextValue = game.add.text(110, 18, score.toString(), textStyleValue)

    game.add.text(200, 20, "Level", textStyleKey)
    levelTextValue = game.add.text( 280, 18, level.toString(), textStyleValue)

  },
  update: function ()
    {

        if (cursors.right.isDown && direction != 'left')
        {
            newDirection = 'right'
        }
        else if (cursors.left.isDown && direction != 'right')
        {
            newDirection = 'left'
        }
        else if (cursors.up.isDown && direction != 'down')
        {
            newDirection = 'up'
        }
        else if (cursors.down.isDown && direction != 'up')
        {
            newDirection = 'down'
        }

      
        level = Math.min(10, Math.floor(score / 5))
      
        levelTextValue.text = '' + level

       
        updateLevel++

        if (updateLevel % (10 - level) == 0)
        {
            
            var firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

           
            if (newDirection)
            {
                direction = newDirection
                newDirection = null
            }


            if (direction == 'right')
            {
                lastCell.x = firstCell.x + 18
                lastCell.y = firstCell.y
            }
            else if (direction == 'left')
            {
                lastCell.x = firstCell.x - 18
                lastCell.y = firstCell.y
            }
            else if (direction == 'up')
            {
                lastCell.x = firstCell.x
                lastCell.y = firstCell.y - 18
            }
            else if (direction == 'down')
            {
                lastCell.x = firstCell.x
                lastCell.y = firstCell.y + 18
            }

            
            snake.push(lastCell)
            firstCell = lastCell

            
            if (addNew)
            {
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'))
                addNew = false
            }

            
            this.coinCollision()

           
            this.selfCollision(firstCell);

            
            this.wallCollision(firstCell);
        }
    },
    generateCoin: function ()
    {   
        var randomX = Math.floor(Math.random() * 30) * size,
            randomY = Math.floor(Math.random() * 30) * size

        coin = game.add.sprite(randomX, randomY, 'coin')
    },
    coinCollision: function ()
    {
        
        for (var i = 0; i < snake.length; i++)
        {
            if (snake[i].x == coin.x && snake[i].y == coin.y)
            {
               
                addNew = true
              
                coin.destroy()
               
                this.generateCoin()

                score++

                scoreTextValue.text = score.toString()
            }
        }

    },

    selfCollision: function (head)
    {
        
        for (var i = 0; i < snake.length - 1; i++)
        {
            if (head.x == snake[i].x && head.y == snake[i].y)
            {
                game.state.start('Game_Over')
            }
        }

    },

    wallCollision: function (head)
    {
       
        if (head.x >= 600 || head.x < 0 || head.y >= 600 || head.y < 0)
        {
            
            game.state.start('Game_Over');
        }
    }
}