class GamePage extends Component {
  constructor() {
    super();
    this.player = 'red';
    this.addRoute('/game', 'Game');
    this.game = new Game();
    this.playerCounter1 = 21;
    this.playerCounter2 = 21;
    this.eventListeners();
    this.addEvents({
      'click .btn-outline-success': 'highScore',
      'click #rematch': 'rematch'
    });
    this.setEmpty();
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
  eventListeners() {
    let that = this;
    let col;
    document.addEventListener('click', function (event) {
      Global.activeGame=true;        
      if (event.target.classList.contains('empty')) {
        // columns and rows
        col = event.target.getAttribute('h-coll');
        let row=that.game.findEmptyCell(col);
        col = parseInt(col);

        // find the last cell in the row. For now jquery
        //let lastEmptyCell = findLastEmptyCell(col);
        
        // remove empty and add player color to div
        if (this.player == 'red') {
          Global.color[col][row]='red';
          //lastEmptyCell[0].classList.remove('empty');
          //lastEmptyCell[0].classList.add('red');
          this.player = 'yellow';
          that.playerCounter1--;
          document.getElementById("drag2").innerHTML = "Drag: " + that.playerCounter1;
          document.getElementById("turn").innerHTML = localStorage.getItem('player-1-name') + "'s turn!";
          document.getElementById("players").style.color =  "rgb(211, 211, 0)";
          document.getElementById("players2").style.color = "green";



        } else {
          Global.color[col][row]='yellow';          
          //lastEmptyCell[0].classList.remove('empty');
          //lastEmptyCell[0].classList.add('yellow');
          this.player = 'red';
          that.playerCounter2--;
          document.getElementById("drag").innerHTML = "Drag: " + that.playerCounter2;
          document.getElementById("turn").innerHTML = localStorage.getItem('player-2-name') + "'s turn!";
          document.getElementById("players").style.color = "green";
          document.getElementById("players2").style.color = "red";




        }

        that.game.playerMove(col, row);
        that.render();
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
  rematch(){
    location.reload(); 
    this.game.buildBoard();
    this.setEmpty();
  }
}
