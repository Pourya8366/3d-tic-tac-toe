var selectedPoint = [];

$(function () {
    $(".point").on("click", function () {
        var selectedPointID = $(this).attr("id");
        selectedPoint.push(Number(selectedPointID.charAt(1)), Number(selectedPointID.charAt(2)), Number(selectedPointID.charAt(3)));
    });
});