var stage = document.querySelector("#stage");

//the 2d array that defines the board
var board = [];

//the size of each cell
var SIZE = 100;

//the space between each cell
var SPACE = 10;

//display the array
var ROWS = 3; //user select size
var COLUMNS = 3; //user select size

for(var row = 0; row < ROWS; row++){
    for(var column = 0; column < COLUMNS; column++){
        //create a div HTML element called cell
        var cell = document.createElement("div");

        //set its CSS class to cell
        cell.setAttribute("class", "cell");

        //add the div HTML element to the stage
        stage.appendChild(cell);

        //position the cell
        cell.style.top = row * (SIZE + SPACE) + "px";
        cell.style.left = column * (SIZE + SPACE) + "px";
        //handle click
        cell.addEventListener("click", clickHandler, false);
    }
}

function clickHandler(){
    this.style.backgroundColor = "rgba(236, 85, 85, 0.80)";
    $.notify({
      // options
      message: "Cell " +  + "selected.",
    },{
      // settings
      newest_on_top: true,
      type: "danger",
      placement: {
        from: "bottom",
        align: "right"
      },
      delay: 50,
      timer: 1500,
      animate: {
        enter: 'animated slideInRight',
        exit: 'animated fadeOutUp'
      }
    });
}

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
  messageList.append(messageElement)

  //SCROLL TO BOTTOM OF MESSAGE LIST
  messageList[0].scrollTop = messageList[0].scrollHeight;
});
