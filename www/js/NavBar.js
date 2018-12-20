class NavBar extends Component {
  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Game','/game'),
      new NavItem('Game Rules', '/gameRules'),
      new NavItem('HiScore', '/hiScore'),
    ];
  }//constructor

  replaceLink(name, link) {
    this.navItems[1] = new NavItem(name, link)
    this.render(); 
  }//replaceLink

  itemClicked(item) {
    const { mainInstance } = Global.router;
    mainInstance.hiScorePage.setLoaded(false);
    if (item && item.innerText === 'Cancel') {
      mainInstance.gamePage.clearBoard();
      Global.activeGame = false;
    }
  }//itemClicked
}//class