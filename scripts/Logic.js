function Logic() {
    this.board = [
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        ]
        //1 for w, -1 for b
    this.currentPlayer = 'w';
}

Logic.prototype.fillInBoard = function (selectedPoint) {
    if (this.currentPlayer == 'w') {
        this.board[selectedPoint[0]][selectedPoint[1]][selectedPoint[2]] = 1;
    } else {
        this.board[selectedPoint[0]][selectedPoint[1]][selectedPoint[2]] = -1;
    }
}

Logic.prototype.winCheck = function (selectedPoint) {
    var i = 0,
        j = 0,
        k = 0,
        count = 0,
        turn = 1,
        firstMate = 1,
        secondMate = 1;

    if (this.currentPlayer == 'b') {
        turn = -1;
    }

    //-------------------------------------- One change! ------------------------------------------

    //change x
    for (i = 0; i < 3; i++) {
        if (this.board[i][selectedPoint[1]][selectedPoint[2]] == turn)
            count++;
        else {
            break;
        }
    }

    if (count == 3) {
        return true;
    }

    count = 0;

    //change y
    for (i = 0; i < 3; i++) {
        if (this.board[selectedPoint[0]][i][selectedPoint[2]] == turn)
            count++;
        else {
            break;
        }
    }

    if (count == 3) {
        return true;
    }

    count = 0;

    //change z
    for (i = 0; i < 3; i++) {
        if (this.board[selectedPoint[0]][selectedPoint[1]][i] == turn)
            count++;
        else {
            break;
        }
    }

    if (count == 3) {
        return true;
    }

    count = 0;

    //-------------------------------------- two change! ------------------------------------------
    var validityForCheck1 = Math.abs(selectedPoint[0] - selectedPoint[1]);
    var validityForCheck2 = Math.abs(selectedPoint[0] - selectedPoint[2]);

    //Change x and y
    if (validityForCheck1 != 1) { //Allow for check
        if (selectedPoint[0] == 1) { //middle board
            //1: start from [0][0][selectedPoint[2]]
            for (i = 0; i < 3; i++) {
                if (this.board[i][i][selectedPoint[2]] == turn)
                    count++;
                else {
                    break;
                }
            }
            if (count == 3) {
                return true;
            }
            count = 0;

            //2: start from [0][2][selectedPoint[2]]
            for (i = 0; i < 3; i++) {
                if (this.board[i][2 - i][selectedPoint[2]] == turn)
                    count++;
                else {
                    break;
                }
            }

            if (count == 3) {
                return true;
            }
            count = 0;

        } else {
            //other top or bottom boards
            if (selectedPoint[0] == 2) {
                firstMate = -1;
            }

            if (selectedPoint[1] == 2) {
                secondMate = -1;
            }

            for (i = 0; i < 3; i++) {
                if (this.board[selectedPoint[0] + (i * firstMate)][selectedPoint[1] + (i * secondMate)][selectedPoint[2]] == turn)
                    count++;
                else {
                    break;
                }
            }

            if (count == 3) {
                return true;
            }
            count = 0;
        }
    }

    //change x and z
    if (validityForCheck2 != 1) { //Allow for check
        if (selectedPoint[0] == 1) { //middle board
            //1: start from [0][selectedPoint[1]][0]
            for (i = 0; i < 3; i++) {
                if (this.board[i][selectedPoint[1]][i] == turn)
                    count++;
                else {
                    break;
                }
            }
            if (count == 3) {
                return true;
            }
            count = 0;

            //2: start from [0][selectedPoint[1]][2]
            for (i = 0; i < 3; i++) {
                if (this.board[i][selectedPoint[1]][2 - i] == turn)
                    count++;
                else {
                    break;
                }
            }

            if (count == 3) {
                return true;
            }
            count = 0;

        } else {
            //other top or bottom boards
            firstMate = 1;
            secondMate = 1;

            if (selectedPoint[0] == 2) {
                firstMate = -1;
            }

            if (selectedPoint[2] == 2) {
                secondMate = -1;
            }

            for (i = 0; i < 3; i++) {
                if (this.board[selectedPoint[0] + (i * firstMate)][selectedPoint[1]][selectedPoint[2] + (i * secondMate)] == turn)
                    count++;
                else {
                    break;
                }
            }

            if (count == 3) {
                return true;
            }
            count = 0;

        }
    }

    //-------------------------------------- three change! ------------------------------------------

    //middle point --- special point!
    if (selectedPoint[0] == 1 && selectedPoint[1] == 1 && selectedPoint[2] == 1) {
        //1: start from [0][0][0]
        for (i = 0; i < 3; i++) {
            if (this.board[i][i][i] == turn)
                count++;
            else {
                break;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;


        //2: start from [0][0][2]
        for (i = 0; i < 3; i++) {
            if (this.board[i][i][2 - i] == turn)
                count++;
            else {
                break;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;

        //3: start from [0][2][0]
        for (i = 0; i < 3; i++) {
            if (this.board[i][2 - i][i] == turn)
                count++;
            else {
                break;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;

        //4: start from [0][2][2]
        for (i = 0; i < 3; i++) {
            if (this.board[i][2 - i][2 - i] == turn)
                count++;
            else {
                break;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;

    } else if (selectedPoint[0] != 1 && selectedPoint[1] != 1 && selectedPoint[2] != 1) {
        //Four points in corners
        firstMate = 1;
        secondMate = 1;
        thirdMate = 1;

        if (selectedPoint[0] == 2) {
            firstMate = -1;
        }

        if (selectedPoint[1] == 2) {
            secondMate = -1;
        }

        if (selectedPoint[2] == 2) {
            thirdMate = -1;
        }

        for (i = 0; i < 3; i++) {
            if (this.board[selectedPoint[0] + (i * firstMate)][selectedPoint[1] + (i * secondMate)][selectedPoint[2] + (i * thirdMate)] == turn)
                count++;
            else {
                break;
            }
        }
        if (count == 3) {
            return true;
        }
        count = 0;
    }

    return false;
}

Logic.prototype.changeTurn = function () {
    if (this.currentPlayer == 'w') {
        this.currentPlayer = 'b';
    } else {
        this.currentPlayer = 'w';
    }
}