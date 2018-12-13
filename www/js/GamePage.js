class GamePage extends Component {

  constructor() {
    super();
    this.addRoute('/game', 'Game');
    /* TESTNING  
    console.log(localStorage.getItem('player-1-name'));
    console.log(localStorage.getItem('player-2-name'));
    this.addHighScore(localStorage.getItem('player-1-name'), 30); */ 
  }

  addHighScore(winnerName, moves) {
    //Modtager highscore fra spillet som string 
    const highscore = localStorage.getItem('highscore');
    //Findes noget i highscore parser vi til at være en array, og ellers får vi en tom array 
    const highscoreArray = highscore ? JSON.parse(highscore) : [];
    //Tilføjer object til highscoreArray 
    highscoreArray.push({ name: winnerName, moves: moves });
    // Local storage kan kun tage string 
    localStorage.setItem('highscore', JSON.stringify(highscoreArray));
  }
}