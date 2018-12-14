class GamePage extends Component {
  constructor() {
    super();
    this.player = 'red';
    this.eventListeners();
    this.addRoute('/game', 'Game');
    //this.addRoute('/gamePage', 'GamePage');
    /* TESTNING  
    console.log(localStorage.getItem('player-1-name'));
    console.log(localStorage.getItem('player-2-name'));
    this.addHighScore(localStorage.getItem('player-1-name'), 30); */
  }
  /* 
  addHighScore(winnerName, moves) {
    //Modtager highscore fra spillet som string
    const highscore = localStorage.getItem('highscore');
    //Findes noget i highscore parser vi til at være en array, og ellers får vi en tom array
    const highscoreArray = highscore ? JSON.parse(highscore) : [];
    //Tilføjer object til highscoreArray
    highscoreArray.push({ name: winnerName, moves: moves });
    // Local storage kan kun tage string
    localStorage.setItem('highscore', JSON.stringify(highscoreArray));
  } */

  // TODO: Generate HTML with array
  // Make it more responsive (mobile looka too small. Should be easy)
  // Animation
  // Mouse over animation/shadow (don't know why it doesn't work)
  // remove white showing next to cell/token

  eventListeners() {
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('empty')) {
        // columns and rows
        let col = event.target.getAttribute('h-col');
        let row = event.target.getAttribute('h-row');

        // find the last cell in the row. For now jquery
        let lastEmptyCell = findLastEmptyCell(col);

        // remove empty and add player color to div
        if (this.player == 'red') {
          lastEmptyCell[0].classList.remove('empty');
          lastEmptyCell[0].classList.add('red');
          this.player = 'yellow';
        } else {
          lastEmptyCell[0].classList.remove('empty');
          lastEmptyCell[0].classList.add('yellow');
          this.player = 'red';
        }
      }

      //jQuery
      function findLastEmptyCell(col) {
        const cells = $(`.col[h-col='${col}']`);
        for (let i = cells.length - 1; i >= 0; i--) {
          const $cell = $(cells[i]);
          if ($cell.hasClass('empty')) {
            return $cell;
          }
        }
        return null;
      }
    });
  }
}
