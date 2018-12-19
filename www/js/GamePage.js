class GamePage extends Component {
  constructor() {
    super();
    this.player = 'red';
    this.addRoute('/game', 'Game');
    this.game = new Game();
    this.playerCounter1 = 21;
    this.playerCounter2 = 21;
    Global.activeGame=true;        
    this.eventListeners();
    this.addEvents({
      'click .btn-outline-success': 'highScore',
      'click #rematch': 'rematch',
      'click .btn-outline-dark': 'rematch'
    });
    this.setEmpty();
    this.firstMove();

  }

  // TODO: Generate HTML with array
  // Make it more responsive (mobile looka too small. Should be easy)
  // Animation
  // Mouse over animation/shadow (don't know why it doesn't work)
  // remove white showing next to cell/token
  setEmpty(){
    Global.color=[];

    for (let row = 0; row < 7; row++) {
      let rowArr = [];
      for (let col = 0; col < 6; col++) {
          rowArr.push('empty');
      }
      Global.color.push(rowArr);
    }  
  }//setEmpty

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

        // find the last cell in the row. For now jquery
        //let lastEmptyCell = findLastEmptyCell(col);
        
        // remove empty and add player color to div
        that.placeColor(col,row);
        that.game.playerMove(col, row);         
        if (that.game.winner === 0){
          that.bot();
        }
    
      }//if empty

      /*//jQuery
      function findLastEmptyCell(col) {
        const cells = $(`.coll[h-coll='${col}']`);

        for (let i = cells.length - 1; i >= 0; i--) {
          const $cell = $(cells[i]);
          if ($cell.hasClass('empty')) {
            return $cell;
          }
        }
        return null;
      }*/
    });//addevent click
  }//metoden eventlistener
  
  placeColor(col, row){
    // remove empty and add player color to div
    if (this.player == 'red') {
      Global.color[col][row]='red';
      //lastEmptyCell[0].classList.remove('empty');
      //lastEmptyCell[0].classList.add('red');
      this.player = 'yellow';
      this.playerCounter1--;
      //document.getElementById("drag2").innerHTML = "Drag: " + this.playerCounter1;
      //document.getElementById("turn").innerHTML = localStorage.getItem('player-1-name') + "'s turn!";
      //document.getElementById("players").style.color =  "rgb(211, 211, 0)";
      //document.getElementById("players2").style.color = "green";

    } else {
      Global.color[col][row]='yellow';          
      //lastEmptyCell[0].classList.remove('empty');
      //lastEmptyCell[0].classList.add('yellow');
      this.player = 'red';
      this.playerCounter2--;
      //document.getElementById("drag").innerHTML = "Drag: " + this.playerCounter2;
      //document.getElementById("turn").innerHTML = localStorage.getItem('player-2-name') + "'s turn!";
      //document.getElementById("players").style.color = "green";
      //document.getElementById("players2").style.color = "red";
  }
  this.render();
}
  //kollar om "type" är bot och gör isåfall ett drag
  bot(){
        if (localStorage.getItem('typ-1')=='bot' || localStorage.getItem('typ-2')=='bot' ){
          let millisecondsToWait = 500;
          let that=this;
          let emptyCell, rand;
          setTimeout(function() {
            while(emptyCell === undefined && that.game.winner === 0 && that.game.round <= 42){
              rand = (Math.floor(Math.random() * 7));            
              emptyCell=that.game.findEmptyCell(rand);
            }            
            if(emptyCell !== undefined && that.game.winner === 0 ){
              that.game.playerMove(rand, emptyCell);
            }
            if(emptyCell !== undefined && that.game.winner === 0 ){
              that.placeColor(rand, emptyCell);
            }
            
          }, millisecondsToWait);
        }
   }
   
   firstMove(){
     //kollar om det första draget görs av en bot
    if (localStorage.getItem('typ-1')=='bot'){
      this.bot();
    }
    //kollar om båda är botar
    if (localStorage.getItem('typ-1')=='bot' && localStorage.getItem('typ-2')=='bot' ){
      for(let i=0; this.game.winner === 0 && i<= 42; i++){        
        this.bot();                
      }
    }
   }
        
      
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
