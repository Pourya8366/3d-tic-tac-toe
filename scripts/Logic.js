function Logic() {
    this.board = [
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
            [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
        ];

    this.availablePoints = 64;

    //1 for w, -1 for b
    this.currentPlayer = 'w';
}

Logic.prototype.fillInBoard = function (selectedPoint) {
    if (this.currentPlayer == 'w') {
        this.board[selectedPoint[0]][selectedPoint[1]][selectedPoint[2]] = 1;
    } else {
        this.board[selectedPoint[0]][selectedPoint[1]][selectedPoint[2]] = -1;
    }
    this.availablePoints--;
}

Logic.prototype.winCheck = function (selectedPoint) {
    var i = 0,
        j = 0,
        k = 0,
        count = 0,
        turn = 1,
        firstMate = 1,
        secondMate = 1,
        winPath = [],
        startPoint = [];

    if (this.currentPlayer == 'b') {
        turn = -1;
    }

    //-------------------------------------- One change! ------------------------------------------

    //change x
    for (i = 0; i < 4; i++) {
        if (this.board[i][selectedPoint[1]][selectedPoint[2]] == turn) {
            count++;
            winPath.push([i, selectedPoint[1], selectedPoint[2]]);
        } else {
            winPath = [];
            break;
        }
    }

    if (count == 4) {
        return [1, winPath];
    }

    count = 0;

    //change y
    for (i = 0; i < 4; i++) {
        if (this.board[selectedPoint[0]][i][selectedPoint[2]] == turn) {
            count++;
            winPath.push([selectedPoint[0], i, selectedPoint[2]]);
        } else {
            winPath = [];
            break;
        }
    }

    if (count == 4) {
        return [1, winPath];
    }

    count = 0;

    //change z
    for (i = 0; i < 4; i++) {
        if (this.board[selectedPoint[0]][selectedPoint[1]][i] == turn) {
            count++;
            winPath.push([selectedPoint[0], selectedPoint[1], i]);
        } else {
            winPath = [];
            break;
        }
    }

    if (count == 4) {
        return [1, winPath];
    }

    count = 0;

    //-------------------------------------- two change! ------------------------------------------

    //change y and z
    firstMate = 1;
    secondMate = 1;
    startPoint = [];

    if (selectedPoint[1] == selectedPoint[2] || (selectedPoint[1] + selectedPoint[2]) == 3) {

        if (selectedPoint[1] == selectedPoint[2]) {
            startPoint = [selectedPoint[0], 0, 0];
        } else {
            startPoint = [selectedPoint[0], 0, 3];
            secondMate = -1;
        }

        for (i = 0; i < 4; i++) {
            if (this.board[startPoint[0]][startPoint[1] + (i * firstMate)][startPoint[2] + (i * secondMate)] == turn) {
                count++;
                winPath.push([startPoint[0], startPoint[1] + (i * firstMate), startPoint[2] + (i * secondMate)]);
            } else {
                winPath = [];
                break;
            }
        }
        if (count == 4) {
            return [1, winPath];
        }
        count = 0;

    }

    //Change x and y
    firstMate = 1;
    secondMate = 1;
    startPoint = [];
    var startPattern = /^([03][03]|[12][12])/;
    var pointForTest = "" + selectedPoint[0] + selectedPoint[1];

    if (startPattern.test(pointForTest)) {

        if (selectedPoint[0] == selectedPoint[1]) {
            startPoint = [0, 0, selectedPoint[2]];
        } else {
            startPoint = [0, 3, selectedPoint[2]];
            secondMate = -1;
        }

        for (i = 0; i < 4; i++) {
            if (this.board[startPoint[0] + (i * firstMate)][startPoint[1] + (i * secondMate)][startPoint[2]] == turn) {
                count++;
                winPath.push([startPoint[0] + (i * firstMate), startPoint[1] + (i * secondMate), startPoint[2]]);
            } else {
                winPath = [];
                break;
            }
        }

        if (count == 4) {
            return [1, winPath];
        }
        count = 0;
    }

    //change x and z
    firstMate = 1;
    secondMate = 1;
    startPoint = [];
    var startPattern = /^([03][03]|[12][12])/;
    var pointForTest = "" + selectedPoint[0] + selectedPoint[2];


    if (startPattern.test(pointForTest)) {

        firstMate = 1;
        secondMate = 1;

        if (selectedPoint[0] == selectedPoint[2]) {
            startPoint = [0, selectedPoint[1], 0];
        } else {
            startPoint = [0, selectedPoint[1], 3];
            secondMate = -1;
        }

        for (i = 0; i < 4; i++) {
            if (this.board[startPoint[0] + (i * firstMate)][startPoint[1]][startPoint[2] + (i * secondMate)] == turn) {
                count++;
                winPath.push([startPoint[0] + (i * firstMate), startPoint[1], startPoint[2] + (i * secondMate)]);
            } else {
                winPath = [];
                break;
            }
        }

        if (count == 4) {
            return [1, winPath];
        }
        count = 0;
    }


    //-------------------------------------- three change! ------------------------------------------
    var startPattern = /^([03][03][03]|[12][12][12])/;
    var pointForTest = "" + selectedPoint[0] + selectedPoint[1] + selectedPoint[2];

    if (startPattern.test(pointForTest)) {
        //Four points in corners
        firstMate = 1;
        secondMate = 1;
        var thirdMate = 1
        startPoint = [];

        if (selectedPoint[1] == selectedPoint[2]) {
            if (selectedPoint[0] == selectedPoint[1]) {
                startPoint = [0, 0, 0];
            }else{
                startPoint = [3, 0, 0];
                firstMate = -1;
            }

        } else {
            if (selectedPoint[0] == selectedPoint[1]) {
                startPoint = [0, 0, 3];
                thirdMate = -1;
            }else{
                startPoint = [0, 3, 0];
                secondMate = -1;
            }
        }


        for (i = 0; i < 4; i++) {
            if (this.board[startPoint[0] + (i * firstMate)][startPoint[1] + (i * secondMate)][startPoint[2] + (i * thirdMate)] == turn) {
                count++;
                winPath.push([startPoint[0] + (i * firstMate), startPoint[1] + (i * secondMate), startPoint[2] + (i * thirdMate)]);
            } else {
                winPath = [];
                break;
            }
        }
        if (count == 4) {
            return [1, winPath];
        }
        count = 0;
    }

    if (this.availablePoints = 0) {
        return [0, winPath];
    }

    return [-1, winPath];
}

Logic.prototype.changeTurn = function () {
    if (this.currentPlayer == 'w') {
        this.currentPlayer = 'b';
    } else {
        this.currentPlayer = 'w';
    }
}