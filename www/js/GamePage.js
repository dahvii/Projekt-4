class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/game', 'Game');
    Global.gamePage = this;
    this.formPage = Global.formPage;
    this.game = new Game(this);
    this.player='red'
    this.movesLeft = 21;
    this.movesLeft2 = 21;
    this.addEvents({
      'click #highscoreButton': 'highScore',
      'click #rematch': 'rematch',
      'click .btn-outline-dark': 'rematch',
    });
    this.buildMatrix();
  }//constructor

  buildMatrix(){
    this.matrix = [];
    for(let row = 0; row < 6; row++){
      let rowArr = [];
      for(let col = 0; col < 7; col++){
        rowArr.push(new Slot(this, row, col));
      }
      this.matrix.push(rowArr);
    }//for   
  }//buildMatrix

  highScore() {
    this.clearBoard();
    $('#modalWinner').modal('hide');
    history.pushState(null, null, '/hiScore');
    Global.router.setPath('/hiScore');
    Global.router.mainInstance.render();
  }

  placeDisc(currSlot){
    Global.activeGame=true; 

    let col=currSlot.col;
    let row = this.game.findEmptyCell(col);

    //om det finns en tom plats i kolumnen, gör draget
    if (row !== undefined){
      this.placeColor(row, col); 
      this.game.playerMove(row, col); 

      //ändra aktuell spelare inför nästa drag
      if (this.game.round % 2 === 0) {
        Global.formPage.currPlayer = Global.formPage.player2;
        Global.formPage.currPlayer.moves--;
      } else {

        Global.formPage.currPlayer = Global.formPage.player1;
        Global.formPage.currPlayer.moves--;
      }
      //kolla om nästa spelare är en bot och låt den isåfall gör ett drag
        this.bot(); 
    }//if 
  }//placeDisc
  
  placeColor(col, row){
    //add currPlayers color
    if (this.formPage.currPlayer.color === 'red') {
      this.matrix[col][row].color='red';
      this.player='yellow'
      this.movesLeft--;
    } else {
      this.matrix[col][row].color='yellow';
      this.player='red'
      this.movesLeft2--;
    }//if
    this.render(); 
  }//placeColor

  bot(){    
    //kollar om currPlayer är bot
    if (this.formPage.currPlayer instanceof Bot){
      let millisecondsToWait = 500;
      let emptyCell, rand;
      setTimeout(() => {
        //hitta random kolumn och hitta dens lägsta tomma cell
        //om kolumnen är full, loopa och hitta en ny kolumn
        while(emptyCell === undefined && this.game.winner == undefined && this.game.round <= 42){
          rand = (Math.floor(Math.random() * 7));            
          emptyCell=this.game.findEmptyCell(rand);
        }  
        //gör draget          
        if(emptyCell !== undefined && this.game.winner == undefined ){
          this.placeDisc(this.matrix[emptyCell][rand]);
        }  
      }, millisecondsToWait);
    }//if
  }//bot
   

  rematch() {
    this.clearBoard();
    // rerender the whole pageContent component
    // to show the new gamePage instance
    Global.router.mainInstance.render();
    this.formPage.player1.moves = 21; 
    this.formPage.player2.moves = 21;
    Global.formPage.currPlayer = this.formPage.player1;
  }//rematch
      
  clearBoard(){
    // remove old GamePage instance
    // (mostly to not waste memory)
    const pageContent = Global.router.mainInstance;
    delete pageContent.gamePage;
    // add a new instance (with clean new property values)
    pageContent.gamePage = new GamePage();
  }//clearBoard
}//class
