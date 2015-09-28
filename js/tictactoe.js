var stage = document.querySelector("#stage");

var board = [[0,0,0],
             [0,0,0],
             [0,0,0]];
var player;
var playerBlue;
var playerRed;
var endGame;
var moves;
var blueScore;
var redScore;

function init(){
  board = [[0,0,0],
           [0,0,0],
           [0,0,0]];
  player ="X";
  blueScore = 0;
  redScore = 0;
  moves = 9;
  endGame = false;
  getNames();
  clearBoard();
  renderBoard();
  displayStats();
}

function getNames() {
  //retrieve names
  playerBlueName = document.getElementById("player-blue-name");
  playerRedName = document.getElementById("player-red-name");
}

function displayStats() {
  //hide form
  $(".form-group").css("display","none");
  //display names and score
  $(".display-stats").css("display","block");
  $(".display-p1-name").text(playerBlueName.value + " ");
  $(".display-p2-name").text(playerRedName.value + " ");
}

function clearBoard() {
  // reset
}

function renderBoard () {
  for(var row = 0; row < board.length; row++){
    for(var column = 0; column < board[0].length; column++){
        //create a div HTML element called cell
        var cellSelected = document.createElement("span");

        //set its CSS class to cell
        cellSelected.setAttribute("class", "cellSelected cellSelected" + row + column);
        cellSelected.setAttribute("onClick", ("setCell(" + (row) + "," + (column) + ")"));

        //add the div HTML element to the stage
        stage.appendChild(cellSelected);

        //position the cell
        cellSelected.style.top = row * (201) + "px";
        cellSelected.style.left = column * (201) + "px";
    }
  }
}

function changePlayer(){
  if (player == "X") {
    player = "O";
  } else {
    player = "X";
  }
}

function setCell(cellRow,cellColumn) {
  var row = cellRow;
  var col = cellColumn;
  if ((board[row][col] != "X") && (board[row][col] != "O")) {
    if (player == "X") {
      board[row][col] = player;
      $(".cellSelected"+row+col).css("background-color", "rgba(95, 128, 226, 0.80)");
      checkState();
      moves -= 1;
      changePlayer();
      renderText();
    } else if (player == "O") {
      board[row][col] = player;
      $(".cellSelected"+row+col).css("background-color", "rgba(236, 85, 85, 0.80)");
      checkState();
      moves -= 1;
      changePlayer();
      renderText();
    }
    else {
      console.log("wtf?");
    }
  }
  checkState();
}

function checkState() {
  console.log(moves);
    if (board[0][0] == player && // [X,X,X]
        board[0][1] == player && // [0,0,0]
        board[0][2] == player || // [0,0,0]

        board[1][0] == player && // [0,0,0]
        board[1][1] == player && // [X,X,X]
        board[1][2] == player || // [0,0,0]

        board[2][0] == player && // [0,0,0]
        board[2][1] == player && // [0,0,0]
        board[2][2] == player || // [X,X,X]

        board[0][0] == player && // [X,0,0]
        board[1][0] == player && // [X,0,0]
        board[2][0] == player || // [X,0,0]

        board[0][1] == player && // [0,X,0]
        board[1][1] == player && // [0,X,0]
        board[2][1] == player || // [0,X,0]

        board[0][2] == player && // [0,0,X]
        board[1][2] == player && // [0,0,X]
        board[2][2] == player || // [0,0,X]

        board[0][0] == player && // [X,0,0]
        board[1][1] == player && // [0,X,0]
        board[2][2] == player || // [0,0,X]

        board[0][2] == player && // [0,0,X]
        board[1][1] == player && // [0,X,0]
        board[2][0] == player) { // [X,0,0]

        endGame = true;
        $('.messageText').text('Player ' + player + ' wins');
        if (player == "X") {
          blueScore += 1;
          $(".blueScore").text(blueScore.value);
        } else {
          redScore += 1;
          $(".redScore").text(redScore.value);
        }
        notifyWinner();
    } else if (moves === 0) {
      $('.messageText').text('Tied!');
    }
}

function renderText(){
  $('.messageText').text('Player: ' + player + "'s turn...")
}

function notifyWinner() {
  $.notify({
    message: "Player " + player + " wins!",
  },{
    newest_on_top: true,
    type: 'success',
    placement: {
      from: "bottom",
      align: "right"
    },
    delay: 2000,
    timer: 1500,
    animate: {
      enter: 'animated slideInRight',
      exit: 'animated fadeOutUp'
    }
  });
}

function notifyError() {
  $.notify({
    message: "That cell is taken.",
  },{
    newest_on_top: true,
    type: 'danger',
    placement: {
      from: "bottom",
      align: "right"
    },
    delay: 2000,
    timer: 1500,
    animate: {
      enter: 'animated slideInRight',
      exit: 'animated fadeOutUp'
    }
  });
}
