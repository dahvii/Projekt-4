class Game {

    constructor(){
        board[
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0]
        ];      
    }//constructor

    currPlayer=1;
    round=1;
    winner = 0;

    playerMove(click){
        //which player?
        if (round%2 === 0){
            currPlayer=2;
        }
        else{
            currPlayer=1;
        }

        //is the slot empty? if so put currPlayer in slot
        let moveIsDone= false;
        let currRow, currCol; 

        //FIXA: om kolumnen är full, låt användaren klicka igen utan att det blir nästa runda
        for(let i= 5; i>=0 && !moveIsDone; i--){
            if( board[i][click] === 0){ // om platsen är tom
                    board[i][click] = currPlayer; //lägg in spelarens siffra
                    currRow= i;
                    currCol= click;
                    moveIsDone=true;
            }
        }

        checkSide(currRow, currCol);
        if(round === 42){ //om brädet är fullt
            //reder oavgjord-sida
        }
        round++;
    }//playerMove

    checkSide(row, col){
        let winCounter = 0;

        //check to right
        for (let toRight=col+1; toRight < 7 && board[row][toRight] === currPlayer && winCounter <= 3 ; toRight++){
            winCounter++;  
        }

        //check to left
        for (let toLeft=col-1; toLeft > 0 && board[row][toLeft] === currPlayer && winCounter <= 3 ; toLeft--){
            winCounter++;
        }

        if (winCounter === 3){
            winner = currPlayer;
            //render winnerpage
        }
        else{
            checkDown(row, col);
        }
    }//checkSide

    checkDown(row, col){
        let winCounter = 0;
        //check down
        for (let down=row+1 ; down < 6 && board[down][col] === currPlayer && winCounter <= 3 ; down++){
            winCounter++;
        }

        if (winCounter === 3){
            winner = currPlayer;
            //render winnerpage
        }
        else{
            checkDiagRight(row, col);
        }
    }//checkDown
}//class