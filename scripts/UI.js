var selectedPoint = [];
var logic = new Logic();

$(function () {
    
    $(".point").on("click", function () {
        var selectedPointID = $(this).attr("id");

        selectedPoint.push(Number(selectedPointID.charAt(1)), Number(selectedPointID.charAt(2)), Number(selectedPointID.charAt(3)));

        if (logic.currentPlayer == 'w')
            $(this).css("background-color", "white");
        else
            $(this).css("background-color", "black");

        logic.fillInBoard(selectedPoint);

        var winPath = logic.winCheck(selectedPoint);

        if (winPath[0] == -1) { //Keep going!
            logic.changeTurn();
            selectedPoint = [];
        } else if (winPath[0] == 0) { // Tie!
            alert("Tie!");
        } else { //Win!
            showWinPath(winPath[1]);
            alert(logic.currentPlayer + " win!");
        }
    });
    
});

function showWinPath(winPath) {
    var selectorID;
    for (x in winPath) {
        selectorID = "#p" + winPath[x][0] + winPath[x][1] + winPath[x][2];
        $(selectorID).css("border-style", "solid");
        $(selectorID).css("border-color", "red");
    }
};