class NavBar extends Component {

  constructor(){
    super();
    this.navItems = [
      new NavItem('Start', '/'),
      new NavItem('Game', '/game'),
      new NavItem('Game Rules', '/gameRules'),
      new NavItem('HiScore', '/hiScore'),
      new NavItem('Game Form', '/gameForm')

    ];
  }

}