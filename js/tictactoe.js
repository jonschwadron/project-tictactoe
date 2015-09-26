var stage = document.querySelector("#stage");

//the 2d array that defines the board
var board = [[0,0,0],
             [0,0,0],
             [0,0,0]];

//board.length is row
//board[0].length is column
//cell 1,3:
//board.length 1
//board[0].length 3

var player;
var endGame;

var win = [[0,1,2], //0
           [3,4,5], //1
           [6,7,8], //2
           [0,3,6], //3
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [6,4,2]];

//the size of each cell
var SIZE = 200;

//the space between each cell
var SPACE = 1;

//board config
//original
//difficult       ROWS = board.length + 1
//more difficult  ROWS = board[0].length + 1 etc.........
var ROWS = board.length; //user select size
var COLUMNS = board[0].length; //user select size

function init(){
  player ="X";
  endGame = false;
  for(var row = 0; row < ROWS; row++){
    for(var column = 0; column < COLUMNS; column++){
        //create a div HTML element called cell
        var cellSelected = document.createElement("span");

        //set its CSS class to cell
        cellSelected.setAttribute("class", "cellSelected");
        cellSelected.setAttribute("onClick", ("setCell(" + (row+1) + "," + (column+1) + ")"));

        //add the div HTML element to the stage
        stage.appendChild(cellSelected);

        //position the cell
        cellSelected.style.top = row * (SIZE + SPACE) + "px";
        cellSelected.style.left = column * (SIZE + SPACE) + "px";

        //handle click
        cellSelected.addEventListener("click", clickHandler, false);
    }
  }
}

function clickHandler(cell){
    if (player == "X") {
      this.style.backgroundColor = "rgba(95, 128, 226, 0.8)";
    } else if (player == "O") {
      this.style.backgroundColor = "rgba(236, 85, 85, 0.80)";
    }
}

function changePlayer(){
  if (player == "X") {
    player = "O";
    //add an html text: O's turn
  } else {
    player = "X";
    //add an html text: X's turn
  }
}

function setCell(cellRow,cellColumn) {
  board[cellRow-1][cellColumn-1] = player;
  console.log(board);
  console.log("Player: " + player, "Cell: " + cellRow + "," + cellColumn);
  checkState();
  changePlayer();
}

//if x played 3 moves, check for winning play
// var win = [[0,1,2], //0
//            [3,4,5], //1
//            [6,7,8], //2
//            [0,3,6], //3
//            [1,4,7],
//            [2,5,8],
//            [0,4,8],
//            [6,4,2]];


function checkState() {
  if (board[0][0] == "X" && // [X,X,X]
      board[0][1] == "X" && // [0,0,0]
      board[0][2] == "X" || // [0,0,0]

      board[1][0] == "X" && // [0,0,0]
      board[1][1] == "X" && // [X,X,X]
      board[1][2] == "X" || // [0,0,0]

      board[2][0] == "X" && // [0,0,0]
      board[2][1] == "X" && // [0,0,0]
      board[2][2] == "X" || // [X,X,X]

      board[0][0] == "X" && // [X,0,0]
      board[1][0] == "X" && // [X,0,0]
      board[2][0] == "X" || // [X,0,0]

      board[0][1] == "X" && // [0,X,0]
      board[1][1] == "X" && // [0,X,0]
      board[2][1] == "X" || // [0,X,0]

      board[0][2] == "X" && // [0,0,X]
      board[1][2] == "X" && // [0,0,X]
      board[2][2] == "X" || // [0,0,X]

      board[0][0] == "X" && // [X,0,0]
      board[1][1] == "X" && // [0,X,0]
      board[2][2] == "X" || // [0,0,X]

      board[0][2] == "X" && // [0,0,X]
      board[1][1] == "X" && // [0,X,0]
      board[2][0] == "X") { // [X,0,0]
        endGame = true;
        notifyWinner();
  }
}

function notifyWinner() {
  $.notify({
    // options
    message: "Player " + player + " won.",
  },{
    // settings
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

$(document).ready(function(){
  init();
});

// FIREBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASE
// CREATE A REFERENCE TO FIREBASE
var messagesRef = new Firebase('https://mw5padi3kor.firebaseio-demo.com/');

// REGISTER DOM ELEMENTS
var messageField = $('#messageInput');
var nameField = $('#nameInput');
var messageList = $('#example-messages');

// LISTEN FOR KEYPRESS EVENT
messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    //FIELD VALUES
    var username = nameField.val();
    var message = messageField.val();

    //SAVE DATA TO FIREBASE AND EMPTY FIELD
    messagesRef.push({name:username, text:message});
    messageField.val('');
  }
});

// Add a callback that is triggered for each chat message.
messagesRef.limitToLast(10).on('child_added', function (snapshot) {
  //GET DATA
  var data = snapshot.val();
  var username = data.name || "anonymous";
  var message = data.text;

  //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
  var messageElement = $("<li>");
  var nameElement = $("<strong class='example-chat-username'></strong>")
  nameElement.text(username);
  messageElement.text(message).prepend(nameElement);

  //ADD MESSAGE
  messageList.append(messageElement);

  //SCROLL TO BOTTOM OF MESSAGE LIST
  messageList[0].scrollTop = messageList[0].scrollHeight;
});
