class HiScorePage extends Component {

  constructor() {
    super();
    this.addRoute('/hiScore', 'HiScore', this);
  }

  //mount --> Creating components in the dom 
  mount() {
    const highscore = localStorage.getItem('highscore');
    this.highscoreArray = highscore ? JSON.parse(highscore) : [];
    // Sorting highscore depending on moves 
    this.highscoreArray = this.highscoreArray.slice().sort((a, b) => { return a.moves > b.moves ? 1 : -1; });
    // Setting timeout so the html has been loaded 
    setTimeout(() => {
      this.fillHighscore();
    }, 100);
  }

  fillHighscore() {
    // convert the raw array of JSON-like objects in highScoreArray
    // to an array of HighScoreRow objects
    // (because HighScoreRow objects are Componeents - you can just 
    // include an array of them in the html template and all of them will render)
    this.highScores = [];
    let no = 1;
    for(let highScore of this.highscoreArray){
      this.highScores.push(new HighScoreRow(no, highScore.name, highScore.moves));
      no++;
    }
    this.render();
  }

}