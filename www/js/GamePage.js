class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/game', 'Game');
    this.formPage = Global.formPage;
    this.game = new Game(this);
    //Global.activeGame=true;        
    this.addEvents({
      'click .btn-outline-success': 'highScore',
      'click #rematch': 'newGame',
      'click .btn-outline-dark': 'newGame',
    });
    this.buildMatrix();
    this.bot();
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

    //which player?
    if (this.game.round % 2 === 0) {
      Global.formPage.currPlayer = Global.formPage.player2;
      Global.formPage.currPlayer.moves--;
    } else {

      Global.formPage.currPlayer = Global.formPage.player1;
      Global.formPage.currPlayer.moves--;
    }
    let col=currSlot.col;
    let row = this.game.findEmptyCell(col);

    //gör draget
    this.placeColor(row, col); 
    this.game.playerMove(row, col); 

    //kolla om nästa spelare är en bot och låt den isåfall gör ett drag
    if(this.game.winner === 0){
      this.bot(); 
    }
  }//placeDisc
  
  placeColor(col, row){
    // remove empty and add player color
    if (this.formPage.currPlayer.color === 'red') {
      this.matrix[col][row].color='red';
      //this.matrixOfColor[col][row]='red';
    } else {
      this.matrix[col][row].color='yellow';
      //this.matrixOfColor[col][row]='yellow';
    }
    this.render(); 
    console.log('jag är här')   
  }//placeColor

  //kollar om "type" är bot och gör isåfall ett drag
  bot(){
    if (this.formPage.currPlayer instanceof Bot){
      let millisecondsToWait = 500;
      let emptyCell, rand;
      setTimeout(() => {
        while(emptyCell === undefined && this.game.winner == undefined && this.game.round <= 42){
          rand = (Math.floor(Math.random() * 7));            
          emptyCell=this.game.findEmptyCell(rand);
        }            
        if(emptyCell !== undefined && this.game.winner == undefined ){
          this.placeColor(rand, emptyCell);
          this.game.playerMove(rand, emptyCell);
        }
        
      }, millisecondsToWait);
    }
  }//bot
   
      
  rematch(){
    // remove old GamePage instance
    // (mostly to not waste memory)
    delete App.pageContent.gamePage;
    // add a new instance (with clean new property values)
    App.pageContent.gamePage = new GamePage();
    // rerender the whole pageContent component
    // to show the new gamePage instance
    App.pageContent.render();
  }

  newGame(){
    this.game = new Game(this);   
    this.buildMatrix();
    this.render();
    this.bot();

  }
}
