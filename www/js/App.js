class App extends Component {

  constructor(){
    super();
    this.navBar = new NavBar();
    this.pageContent = new PageContent();
    this.footer = new Footer();
    // only in the App class:
    Global.router = new Router(this.pageContent, this.navBar);
    $('body').html(this.render());
  }

}
