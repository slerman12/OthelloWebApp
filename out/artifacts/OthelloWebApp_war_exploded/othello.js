var size = 8;
var Board = [];
var EmptySquares = [];
var playerTurn = true;
var playerClr = "B";
var difficulty = 1;

var playerMovePromise = null;
var computerMovePromise = null;
var skipTurnPromise = null;

Board[0] = ["_", "_", "_", "_", "_", "_", "_", "_"];
Board[1] = ["_", "_", "_", "_", "_", "_", "_", "_"];
Board[2] = ["_", "_", "x", "x", "x", "x", "_", "_"];
Board[3] = ["_", "_", "x", "W", "B", "x", "_", "_"];
Board[4] = ["_", "_", "x", "B", "W", "x", "_", "_"];
Board[5] = ["_", "_", "x", "x", "x", "x", "_", "_"];
Board[6] = ["_", "_", "_", "_", "_", "_", "_", "_"];
Board[7] = ["_", "_", "_", "_", "_", "_", "_", "_"];

EmptySquares[0] = {X: 2, Y: 2};
EmptySquares[1] = {X: 2, Y: 3};
EmptySquares[2] = {X: 2, Y: 4};
EmptySquares[3] = {X: 2, Y: 5};
EmptySquares[4] = {X: 3, Y: 5};
EmptySquares[5] = {X: 4, Y: 5};
EmptySquares[6] = {X: 5, Y: 5};
EmptySquares[7] = {X: 5, Y: 4};
EmptySquares[8] = {X: 5, Y: 3};
EmptySquares[9] = {X: 5, Y: 2};
EmptySquares[10] = {X: 4, Y: 2};
EmptySquares[11] = {X: 3, Y: 2};

function createBoard() {

    var element = $('#othelloBoard');

    for(i = 0; i < size; i++) {
        for(j = 0; j < size; j++) {
            if((i+j)%2 === 0) {
                if (Board[i][j] === 'x' || Board[i][j] === '_') {
                    $('<div class="even row' + i + 'col' + j + '"><div class="empty"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
                else if (Board[i][j] === 'B') {
                    $('<div class="even row' + i + 'col' + j + '"><div class="black"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
                else if (Board[i][j] === 'W') {
                    $('<div class="even row' + i + 'col' + j + '"><div class="white"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
            }
            else {
                if (Board[i][j] === 'x' || Board[i][j] === '_') {
                    $('<div class="odd row' + i + 'col' + j + '"><div class="empty"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
                else if (Board[i][j] === 'B') {
                    $('<div class="odd row' + i + 'col' + j + '"><div class="black"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
                else if (Board[i][j] === 'W') {
                    $('<div class="odd row' + i + 'col' + j + '"><div class="white"></div></div>').data('row', i).data('col', j).appendTo(element);
                }
            }
            $('.row' + i + 'col' + j).on("click", function() {
                if(playerTurn) {
                    playerTurn = false;
                    playerMovePromise = $.post("PlayerMove", {row: $.data(this, 'row'), col: $.data(this, 'col'), board: JSON.stringify(Board), emptySpaces: JSON.stringify(EmptySquares), clr: playerClr}, function (responsePlayer) {
                        if (responsePlayer.valid) {
                            updateBoard(responsePlayer.board, responsePlayer.emptySpaces);
                            computerTurn();
                        }
                        else{
                            playerTurn = true;
                        }
                    });
                }
            });
        }
    }
}

function updateBoard(board, emptySpaces){
    Board = board;
    EmptySquares = emptySpaces;
    for (i = 0; i < size; i++){
        for (j = 0; j < size; j++){
            if(Board[i][j] === 'x' || Board[i][j] === '_') {
                $('.row' + i + 'col' + j).html('<div class="empty"></div>');
            }
            else if (Board[i][j] === 'B') {
                $('.row' + i + 'col' + j).html('<div class="black"></div>');
            }
            else if (Board[i][j] === 'W') {
                $('.row' + i + 'col' + j).html('<div class="white"></div>');
            }
        }
    }
}

function configureWidthHeight(){
    var w = $('#othelloApp').width();
    var h = $('#othelloApp').height();

    if (w < h) {
        $('#othelloBoard').css({'height': Math.floor(0.8 * w / 8)*8 + 'px'});
        $('#othelloBoard').css({'width': Math.floor(0.8 * w / 8)*8 + 'px'});
    }
    else{
        $('#othelloBoard').css({'height': Math.floor(0.8 * h / 8)*8 + 'px'});
        $('#othelloBoard').css({'width': Math.floor(0.8 * h / 8)*8 + 'px'});
    }
}

function startOver() {
    var NewBoard = [];
    var NewEmptySquares = [];

    NewBoard[0] = ["_", "_", "_", "_", "_", "_", "_", "_"];
    NewBoard[1] = ["_", "_", "_", "_", "_", "_", "_", "_"];
    NewBoard[2] = ["_", "_", "x", "x", "x", "x", "_", "_"];
    NewBoard[3] = ["_", "_", "x", "W", "B", "x", "_", "_"];
    NewBoard[4] = ["_", "_", "x", "B", "W", "x", "_", "_"];
    NewBoard[5] = ["_", "_", "x", "x", "x", "x", "_", "_"];
    NewBoard[6] = ["_", "_", "_", "_", "_", "_", "_", "_"];
    NewBoard[7] = ["_", "_", "_", "_", "_", "_", "_", "_"];

    NewEmptySquares[0] = {X: 2, Y: 2};
    NewEmptySquares[1] = {X: 2, Y: 3};
    NewEmptySquares[2] = {X: 2, Y: 4};
    NewEmptySquares[3] = {X: 2, Y: 5};
    NewEmptySquares[4] = {X: 3, Y: 5};
    NewEmptySquares[5] = {X: 4, Y: 5};
    NewEmptySquares[6] = {X: 5, Y: 5};
    NewEmptySquares[7] = {X: 5, Y: 4};
    NewEmptySquares[8] = {X: 5, Y: 3};
    NewEmptySquares[9] = {X: 5, Y: 2};
    NewEmptySquares[10] = {X: 4, Y: 2};
    NewEmptySquares[11] = {X: 3, Y: 2};

    updateBoard(NewBoard, NewEmptySquares);

    if (playerClr === 'B') {
        playerTurn = true;
    }
    else{
        playerTurn = false;
        computerTurn();
    }
}

function cancelRequests() {

    if(playerMovePromise) {
        playerMovePromise.abort();
        playerMovePromise = null;
    }

    if(computerMovePromise) {
        computerMovePromise.abort();
        computerMovePromise = null;
    }

    if(skipTurnPromise) {
        skipTurnPromise.abort();
        skipTurnPromise = null;
    }
}

function computerTurn() {
    computerMovePromise = $.post("ComputerMove", {board: JSON.stringify(Board), emptySpaces: JSON.stringify(EmptySquares), clr: playerClr, difficulty: difficulty}, function (responseComputer) {
        updateBoard(responseComputer.board, responseComputer.emptySpaces);
        playerTurn = true;
    });
}

function skipTurn(){
    skipTurnPromise = $.post("SkipTurn", {board: JSON.stringify(Board), emptySpaces: JSON.stringify(EmptySquares), clr: playerClr}, function (responseSkipTurn) {
        if (responseSkipTurn.valid){
            playerTurn = false;
            computerTurn();
        }
        else {
            alert("You can only skip a turn when you have no valid moves");
        }
    });
}

$(function() {
    createBoard();

    configureWidthHeight();
    $( window ).resize(function() {
        configureWidthHeight();
    });

    $('#othelloSettings .difficulty .easy').on('click', function() {
        difficulty = 1;
        $('#othelloSettings .difficulty .active').removeClass('active');
        $('#othelloSettings .difficulty .easy').addClass('active');
    });
    $('#othelloSettings .difficulty .medium').on('click', function() {
        difficulty = 3;
        $('#othelloSettings .difficulty .active').removeClass('active');
        $('#othelloSettings .difficulty .medium').addClass('active');
    });
    $('#othelloSettings .difficulty .hard').on('click', function() {
        difficulty = 6;
        $('#othelloSettings .difficulty .active').removeClass('active');
        $('#othelloSettings .difficulty .hard').addClass('active');
    });

    $('#othelloSettings .main .start-over').on('click', function() {
        cancelRequests();
        startOver();
    });

    $('#othelloSettings .skip-turn').on('click', function() {
        skipTurn();
    });
});