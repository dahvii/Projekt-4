class Game {

    constructor() {
        this.currPlayer = 1;
        this.round = 1;
        this.winner = 0;
        this.board = [];
        this.buildBoard();
        this.player1round = 0;
        this.player2round = 0;
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

    findEmptyCell(col) {
        col = parseInt(col);
        //is the slot empty? 
        let moveIsDone = false;
        let row;

        for (let i = 5; i >= 0 && !moveIsDone; i--) {
            if (this.board[i][col] === 0) { // om platsen är tom
                row = i;
                moveIsDone = true;
            }
        }
        return row;
    }//findEmptyCell

    playerMove(col, row) {
        //which player?
        if (this.round % 2 === 0) {
            this.currPlayer = 2;
            this.player2round++;
        } else {
            this.currPlayer = 1;
            this.player1round++;
        }
        //lägg in spelarens siffra
        this.board[row][col] = this.currPlayer;

        this.checkSide(row, col);
        if (this.round === 42) { //om brädet är fullt
            $('#modalDraw').modal('show')
            Global.activeGame = false;
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
        for (let toLeft = col - 1; toLeft >= 0 && this.board[row][toLeft] === this.currPlayer && winCounter <= 3; toLeft--) {
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
        for (let down = row + 1, right = col + 1; down < 6 && right < 7 && this.board[down][right] === this.currPlayer && winCounter <= 3; down++ , right++) {
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
        for (let down = row + 1, left = col - 1; down < 6 && left >= 0 && this.board[down][left] === this.currPlayer && winCounter <= 3; left-- , down++) {
            winCounter++;
        }

        if (winCounter === 3) {
            this.setWinner(this.currPlayer);
        }
    } //checkDiagLeft

    setWinner(winner) {
        if (winner === 1) {
            this.winner = localStorage.getItem('player-1-name')
            //this.baseEl.find(`#modal-body`).val()= localStorage.getItem('player-1-name')+' is the winner';
            document.getElementById("modal-body").innerHTML = localStorage.getItem('player-1-name') + ' is the winner';
            this.addHighScore(this.player1round);
        } else {
            this.winner = localStorage.getItem('player-2-name')
            //this.baseEl.find(`#modal-body`).val()= localStorage.getItem('player-2-name')+' is the winner';
            document.getElementById("modal-body").innerHTML = localStorage.getItem('player-2-name') + ' is the winner';
            this.addHighScore(this.player2round);
        }
        $('#modalWinner').modal('show');

        //localStorage.setItem('winner', this.winner);
        //location.href = '/winner';
        Global.activeGame = false;
        if (winner !== null) {
            $("#gamepage").click(function (e) {
                // Don't cancel the browser's default action
                // and don't bubble this event!
                e.stopPropagation();
            });

        }
    }//setWinner

    async addHighScore(moves) {
        //Modtager highscore fra spillet som string
        let highscore = await JSON._load('highscoreArray.json');
        //Findes noget i highscore parser vi til at være en array, og ellers får vi en tom array
        const highscoreArray = highscore ? highscore : [];
        //Tilføjer object til highscoreArray
        highscoreArray.push({ name: this.winner, moves: moves });
        await JSON._save('highscoreArray.json', highscoreArray);
    }
} //class