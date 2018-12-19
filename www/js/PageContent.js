class PageContent extends Component {

  constructor() {
    super();
    App.pageContent = this; // make me global
    this.startPage = new StartPage();
    this.formPage = new FormPage();
    this.gamePage = new GamePage();
    this.gameRulesPage = new GameRulesPage();
    this.missingPage = new MissingPage();
    this.hiScorePage = new HiScorePage();
  }
}