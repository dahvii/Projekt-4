class GamePage extends Component {
  constructor(formPage) {
    super();
    this.addRoute('/game', 'Game');
    this.game = new Game(this);
    Global.activeGame=true;        
    this.eventListeners();
    this.addEvents({
      'click .btn-outline-success': 'highScore',
      'click #rematch': 'rematch',
      'click .btn-outline-dark': 'rematch'
    });
    this.buildMatrix();
    this.bot();
    this.formPage = formPage;

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
    location.href = '/hiScore'
  }

  placeDisk(){
    let col; 
    if(this.h-coll === 'empty'){
      col = this.h-coll; 
      let row = that.game.findEmptyCell(col);
      col = parseInt(col); 
      that.placeColor(col, row); 
      that.game.playerMove(col, row); 
      if(that.game.winner === 0){
        that.bot(); 
      }
    }
  }

  eventListeners() {
    let that = this;
    let col;
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('empty')) {
        // columns and rows
        col = event.target.getAttribute('h-coll');
        let row=that.game.findEmptyCell(col);
        col = parseInt(col);
        
        // remove empty and add player color to div
        that.placeColor(col,row);
        that.game.playerMove(col, row);         
        if (that.game.winner == undefined){
          that.bot();
        }
      }//if empty
    });//addevent click
  }//metoden eventlistener
  
  placeColor(col, row){
    // remove empty and add player color to div
    if (this.game.currPlayer.color === 'red') {
      this.matrix[col][row].color='red';
    } else {
      this.matrix[col][row].color='yellow';
    }
    this.render();
  }//placeColor

  //kollar om "type" är bot och gör isåfall ett drag
  bot(){
    if (this.game.currPlayer instanceof Bot){
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
