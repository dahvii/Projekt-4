class PageContent extends Component {

  constructor() {
    super();
    this.startPage = new StartPage();
    this.formPage = new FormPage();
    this.gamePage = new GamePage();
    this.gameRulesPage = new GameRulesPage();
    this.missingPage = new MissingPage();
    this.hiScorePage = new HiScorePage();
    this.drawPage = new Draw();
    this.winnerPage = new WinnerPage();
  }

}