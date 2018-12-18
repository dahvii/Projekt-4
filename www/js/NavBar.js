class NavBar extends Component {

  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Game','/game'),
      new NavItem('Game Rules', '/gameRules'),
      new NavItem('HiScore', '/hiScore'),
      //new NavItem('Game dirr ', '/game'),

    ];
  }
  replaceLink(name, link) {
    this.navItems[1] = new NavItem(name, link)
    this.render(); 
  }

  itemClicked(item) {
    if (item && item.innerText === 'Cancel') {
      Global.activeGame = false;
    }
  }
}