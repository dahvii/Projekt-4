class GamePage extends Component {
  constructor() {
    super();
    this.addRoute('/game', 'Game');
    this.formPage = Global.formPage;
    this.game = new Game(this);
    Global.activeGame=true;        
    this.addEvents({
      'click .btn-outline-success': 'highScore',
      'click #rematch': 'rematch',
      'click .btn-outline-dark': 'rematch',
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
  }//buildMatrix

  highScore() {
    history.pushState(null, null, '/hiScore');
      Global.router.setPath('/hiScore');
      Global.router.mainInstance.render();
  }

  placeDisc(currSlot){
    console.log('placeDisc');
    console.log('currPlayer', this.formPage.currPlayer);
    let col=currSlot.col;
    let row = this.game.findEmptyCell(col);

    //gör draget
    this.placeColor(col, row); 
    this.game.playerMove(col, row); 

    //kolla om nästa spelare är en bot och låt den isåfall gör ett drag
    if(this.game.winner === 0){
      this.bot(); 
    }
  }//placeDisc
  
  placeColor(col, row){
    // remove empty and add player color
    if (this.formPage.currPlayer.color === 'red') {
      this.matrix[col][row].color='red';
    } else {
      this.matrix[col][row].color='yellow';
    }
    this.render();
    console.log('placeColor');
    console.log(this.matrix);
    
    
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
}
