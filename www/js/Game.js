class Game {

    constructor(gamePage) {
        this.gamePage = gamePage;
        //this.currPlayer = Global.formPage.player1;
        this.round = 1;
        this.winner;
    } //constructor

    findEmptyCell(col){
        col = parseInt(col);
        //is the slot empty? 
        let moveIsDone = false;
        let row;

        for (let i = 5; i >= 0 && !moveIsDone; i--) {
            // om platsen är tom
            if (this.gamePage.matrix[i][col].color === 'empty') { 
                row = i;
                moveIsDone = true;
            }
        }
        return row;
    }//findEmptyCell

    playerMove(col, row) {        
        this.checkSide(row, col);
        if (this.round === 42) { //om brädet är fullt
            $('#modalDraw').modal('show')
            Global.activeGame = false;
        }

        this.round++;   
        // call the bot method in gamePage
        this.gamePage.bot();
       
    } //playerMove
        

    checkSide(col, row) {
        let winCounter = 0;

        //check to right
        for (let toRight = col + 1; toRight < 7 && this.gamePage.matrix[row] && this.gamePage.matrix[row][toRight].color === Global.formPage.currPlayer.color && winCounter <= 3; toRight++) {
            winCounter++;
        }

        //check to left
        for (let toLeft = col - 1; toLeft >= 0 &&  this.gamePage.matrix[row] && this.gamePage.matrix[row][toLeft].color === Global.formPage.currPlayer.color && winCounter <= 3; toLeft--) {
            winCounter++;
        }

        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);

        } else {
            this.checkDown(row, col);
        }
    } //checkSide

    checkDown(row, col) {
        let winCounter = 0;
        //check down
        for (let down = row + 1; down < 6 &&  this.gamePage.matrix[down][col].color === Global.formPage.currPlayer.color && winCounter <= 3; down++) {
            winCounter++;
        }

        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);
        } else {
            this.checkDiagRight(row, col);
        }
    } //checkDown

    checkDiagRight(row, col) {
        let winCounter = 0;
        
        for (let down = row + 1, right = col + 1; down < 6 && right < 7 &&  this.gamePage.matrix[down][right].color === Global.formPage.currPlayer.color && winCounter <= 3; down++, right++) {
            winCounter++;
        }

        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);

        } else {
            this.checkDiagLeft(row, col);
        }
    } //checkDiagRight

    checkDiagLeft(row, col) {
        let winCounter = 0;

        //check to down to left
        for (let down = row + 1, left = col - 1; down < 6 && left >= 0 &&  this.gamePage.matrix[down][left].color === Global.formPage.currPlayer.color && winCounter <= 3; left--, down++) {
            winCounter++;
        }

        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);
        }
    } //checkDiagLeft

    setWinner(winner){

        if(winner.number === 1){
            this.winner = localStorage.getItem('player-1-name')  
        }else{
            this.winner = localStorage.getItem('player-2-name')
        }
        document.getElementById("modal-body").innerHTML = this.winner+' is the winner';
        this.addHighScore(this.player2round);

        $('#modalWinner').modal('show');
           
        Global.activeGame=false;
        if(winner !== null){
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
    }//async
} //class