class Game {
    constructor(gamePage) {
        this.gamePage = gamePage;
        this.round = 1;
        this.winner;
    } //constructor

    findEmptyCell(col){
        let moveIsDone = false;
        let row;
        
        //is the slot empty? 
        for (let i = 5; i >= 0 && !moveIsDone; i--) {
            // om platsen är tom, spara radnr och skicka tillbaka
            if (this.gamePage.matrix[i][col].color === 'empty') { 
                row = i;
                moveIsDone = true;
            }//if
        }//for
        return row;
    }//findEmptyCell

    playerMove(col, row) {    
        //kolla om det finns matchande slots brevid aktuell slot    
        this.checkSide(row, col);

        //om brädet är fullt, det är oavgjort
        if (this.round === 42) { 
            $('#modalDraw').modal('show')
            Global.activeGame = false;
        }//if

        this.round++;     
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
        //om det är fyra i rad
        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);

        } 
        //annars kolla nedåt
        else {
            this.checkDown(row, col);
        }
    } //checkSide

    checkDown(row, col) {
        let winCounter = 0;
        //check down
        for (let down = row + 1; down < 6 &&  this.gamePage.matrix[down][col].color === Global.formPage.currPlayer.color && winCounter <= 3; down++) {
            winCounter++;
        }
        //om det är fyra i rad
        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);
        } 
         //annars kolla diagonalt åt höger
        else {
            this.checkDiagRight(row, col);
        }
    } //checkDown

    checkDiagRight(row, col) {
        let winCounter = 0;

        //check to down to right
        for (let down = row + 1, right = col + 1; down < 6 && right < 7 &&  this.gamePage.matrix[down][right].color === Global.formPage.currPlayer.color && winCounter <= 3; down++, right++) {
            winCounter++;
        }
        //om det är fyra i rad
        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);
        } 
        //annars kolla diagonalt åt vänster
        else {
            this.checkDiagLeft(row, col);
        }
    } //checkDiagRight

    checkDiagLeft(row, col) {
        let winCounter = 0;

        //check to down to left
        for (let down = row + 1, left = col - 1; down < 6 && left >= 0 &&  this.gamePage.matrix[down][left].color === Global.formPage.currPlayer.color && winCounter <= 3; left--, down++) {
            winCounter++;
        }
        //om det är fyra i rad
        if (winCounter >= 3) {
            this.setWinner(Global.formPage.currPlayer);
        }
    } //checkDiagLeft

    setWinner(winner){
        //om vinnaren är player1
        if(winner.number === 1){
            this.winner = localStorage.getItem('player-1-name')  
        }else{ //om vinnaren är player2
            this.winner = localStorage.getItem('player-2-name')
        }

        //visa vinnarsidan och lägg till highscore
        document.getElementById("modal-body").innerHTML = this.winner+' is the winner';
        this.addHighScore(22-winner.moves);

        $('#modalWinner').modal('show');
        
        Global.activeGame=false;

        //om vi har en vinnare ska en ej kunna spela vidare så stoppa klick-eventet
        if(winner !== null){
            $("#gamepage").click(function (e) {
                // Don't cancel the browser's default action
                // and don't bubble this event!
                e.stopPropagation();
            }); 
        }
    }//setWinner
    
    async addHighScore(moves) {
        //recieve highscore from game as a string 
        let highscore = await JSON._load('highscoreArray.json');
        //If there is something in highscore, we parse it to be an array
        // else we give an empty array
        const highscoreArray = highscore ? highscore : [];
        //Add objects to the highscore 
        highscoreArray.push({ name: this.winner, moves: moves });
        //Saving the data in our json-file
        await JSON._save('highscoreArray.json', highscoreArray);
    }//async
} //class