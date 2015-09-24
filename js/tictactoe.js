var player = {
  money: 100,
  win: 0,
  lose: 0
};

var coin = {
  coinSide: 0, //0 for head, 1 for tails
  head: function (lol) {
    coinSide = 0;
    this.flip(coinSide);
    $('#money').html("Money: " + player.money);
    $('#win').html("Won: " + player.win);
    $('#lose').html("Loss: " + player.lose);
  },
  tail: function (lol) {
    this.coinSide = 1;
    this.flip(coinSide);
    $('#money').html("Money: " + player.money);
    $('#win').html("Won: " + player.win);
    $('#lose').html("Loss: " + player.lose);
  },
  flip: function (side) {
    var flipCoin = Math.floor(Math.random() * 2);
    if (side == flipCoin) {
      player.money += 100;
      player.win += 1;
      $.notify({
        // options
        message: 'You won $100!',
      },{
        // settings
        newest_on_top: true,
        type: "success",
        placement: {
          from: "bottom",
          align: "right"
        },
        delay: 1000,
        timer: 500,
        animate: {
          enter: 'animated slideInRight',
          exit: 'animated fadeOutUp'
        }
      });
    } else {
      player.money -= 100;
      player.lose += 1;
      $.notify({
      	// options
      	message: 'You lose $100',
      },{
      	// settings
        newest_on_top: true,
      	type: "danger",
      	placement: {
      		from: "bottom",
      		align: "right"
      	},
      	delay: 1000,
      	timer: 500,
      	animate: {
      		enter: 'animated slideInRight',
      		exit: 'animated fadeOutUp'
        }
      });
    }
  }
};

var dice = {
  human: 0,
  bot: 0,
  roll: function () {
    var rollDice = Math.floor(Math.random() * 6);

  },
  determineWinner: function () {

    if (human > bot) {
      console.log("Human wins.");
    } else {
      console.log("Bot wins.");
    }
  }
};

var object = {
  add: function () {

  }
};

var array = [];


object.add
