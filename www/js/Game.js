class Game {

    constructor() {
        this.currPlayer = 1;
        this.round = 1;
        this.winner = 0;
        this.board = [];
        this.buildBoard();
    } //constructor

    buildBoard() {
        
        for (let row = 0; row < 6; row++) {
            let rowArr = [];
            for (let col = 0; col < 7; col++) {
                rowArr.push(0);
            }
            this.board.push(rowArr);
        }
    } //buildBoard

    playerMove(click) {
        //which player?
        if (this.round % 2 === 0) {
            this.currPlayer = 2;
        } else {
            this.currPlayer = 1;
        }

        //is the slot empty? if so put currPlayer in slot
        let moveIsDone = false;
        let currRow, currCol;
        //FIXA: om kolumnen är full, låt användaren klicka igen utan att det blir nästa runda
        for (let i = 5; i >= 0 && !moveIsDone; i--) {
            if (this.board[i][click] === 0) { // om platsen är tom
                this.board[i][click] = this.currPlayer; //lägg in spelarens siffra
                let currRow = i;
                let currCol = click;
                moveIsDone = true;
            }
        }

        this.checkSide(currRow, currCol);
        if (this.round === 42) { //om brädet är fullt
            location.href = '/draw';
        }
        this.round++;
        } //playerMove

        checkSide(row, col) {
        let winCounter = 0;

        //check to right
        for (let toRight = col + 1; toRight < 7 && this.board[row][toRight] === this.currPlayer && winCounter <= 3; toRight++) {
            winCounter++;
        }

        //check to left
        for (let toLeft = col - 1; toLeft > 0 && this.board[row][toLeft] === this.currPlayer && winCounter <= 3; toLeft--) {
            winCounter++;
        }

        if (winCounter === 3) {
            this.setWinner(this.currPlayer);

        } else {
            this.checkDown(row, col);
        }
    } //checkSide

    checkDown(row, col) {
        let winCounter = 0;
        //check down
        for (let down = row + 1; down < 6 && this.board[down][col] === this.currPlayer && winCounter <= 3; down++) {
            winCounter++;
        }

        if (winCounter === 3) {
            this.setWinner(this.currPlayer);
        } else {
            this.checkDiagRight(row, col);
        }
    } //checkDown

    checkDiagRight(row, col) {
        let winCounter = 0;

        //check to down to right
        for (let down = row + 1, right = col + 1; down < 6 && right < 7 && this.board[down][right] === this.currPlayer && winCounter <= 3; down++, right++) {
            winCounter++;
        }

        if (winCounter === 3) {
            this.setWinner(this.currPlayer);

        } else {
            this.checkDiagLeft(row, col);
        }
    } //checkDiagRight

    checkDiagLeft(row, col) {
        let winCounter = 0;

        //check to down to left
        for (let down = row + 1, left = col - 1; down < 6 && left > 0 && this.board[down][left] === this.currPlayer && winCounter <= 3; left--, down++) {
            winCounter++;
        }

        if (winCounter === 3) {
            this.setWinner(this.currPlayer);
        }
    } //checkDiagLeft

    setWinner(winner){
        if(winner === 1){
            this.winner = localStorage.getItem('player-1-name')  
        }else{
            this.winner = localStorage.getItem('player-2-name')
        }
               
        localStorage.setItem('winner', this.winner);
        location.href = '/winner';
    }
} //class