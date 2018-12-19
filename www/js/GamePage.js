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

    //Global.activeGame=true;        
    this.addEvents({
      'click #highscoreButton': 'highScore',
      'click #rematch': 'rematch',
      'click .btn-outline-dark': 'rematch',
    });
    this.buildMatrix();
    //this.bot();
    console.log('GamePagekonstruktor');
    
  }//constructor


  // TODO: Generate HTML with array
  // Make it more responsive (mobile looka too small. Should be easy)
  // Animation
  // Mouse over animation/shadow (don't know why it doesn't work)
  // remove white showing next to cell/token

  buildMatrix(){
    this.matrix = [];
    for(let row = 0; row < 6; row++){
      let rowArr = [];
      for(let col = 0; col < 7; col++){
        rowArr.push(new Slot(this, row, col));
      }
      this.matrix.push(rowArr);
    }

    /* nedan endast för enklare avläsning i inspektion
    this.matrixOfColor = [];
    for(let row = 0; row < 6; row++){
      let rowArr = [];
      for(let col = 0; col < 7; col++){
        rowArr.push('empty');
      }
      this.matrixOfColor.push(rowArr);
    }*/
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
    this.board = [];
    for(let row = 0; row < 10; row++){
      let rowArr = [];
      for(let col = 0; col < 11; col++){
        rowArr.push('empty');
      }
      this.board.push(rowArr);
    }

    let col=currSlot.col;
    let row = this.game.findEmptyCell(col);

    //gör draget
    this.placeColor(row, col); 
    this.game.playerMove(row, col); 

    //which player
    if (this.game.round % 2 === 0) {
      Global.formPage.currPlayer = Global.formPage.player2;
      Global.formPage.currPlayer.moves--;
    } else {

      Global.formPage.currPlayer = Global.formPage.player1;
      Global.formPage.currPlayer.moves--;
    }
    //kolla om nästa spelare är en bot och låt den isåfall gör ett drag
      this.bot(); 
    
  }//placeDisc
  
  placeColor(col, row){
    // remove empty and add player color
    if (this.formPage.currPlayer.color === 'red') {
      this.matrix[col][row].color='red';
      this.player='yellow'
      this.movesLeft--;
      //this.matrixOfColor[col][row]='red';
    } else {
      this.matrix[col][row].color='yellow';
      this.player='red'
      this.movesLeft2--;
      //this.matrixOfColor[col][row]='yellow';
    }
    this.render(); 
    console.log('jag är här')   
  }//placeColor

  //kollar om "type" är bot och gör isåfall ett drag
  bot(){
    console.log('i bot() och currPlayer är ', this.formPage.currPlayer);
    
    if (this.formPage.currPlayer instanceof Bot){
      console.log('går in i bot() if');      
      let millisecondsToWait = 500;
      let emptyCell, rand;
      setTimeout(() => {
        while(emptyCell === undefined && this.game.winner == undefined && this.game.round <= 42){
          rand = (Math.floor(Math.random() * 7));            
          emptyCell=this.game.findEmptyCell(rand);
        }            
        if(emptyCell !== undefined && this.game.winner == undefined ){
          this.placeDisc(this.matrix[emptyCell][rand]);
          //this.placeColor(rand, emptyCell);
          //this.game.playerMove(rand, emptyCell);
        }
        
      }, millisecondsToWait);
    }
  }//bot
   

  rematch() {
    this.clearBoard();
    // rerender the whole pageContent component
    // to show the new gamePage instance
    this.buildMatrix();
    Global.router.mainInstance.render();
  }
      
  clearBoard(){
    // remove old GamePage instance
    // (mostly to not waste memory)
    const pageContent = Global.router.mainInstance;
    delete pageContent.gamePage;
    // add a new instance (with clean new property values)
    pageContent.gamePage = new GamePage();
  }
}
