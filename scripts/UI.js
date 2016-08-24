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


        if (logic.winCheck(selectedPoint)) {
            alert(logic.currentPlayer + " win!");
        } else {
            logic.changeTurn();
            selectedPoint = [];
        }
    });
});