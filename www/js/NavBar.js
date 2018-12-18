class NavBar extends Component {

  constructor() {
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Game', '/gameForm'),
      new NavItem('Game Rules', '/gameRules'),
      new NavItem('HiScore', '/hiScore')
    ];
  }
  replaceLink(name, link) {
    this.navItems[1] = new NavItem(name, link)
    this.render(); 
  }
}