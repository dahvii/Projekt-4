class Slot extends Component {
  constructor(gamePage, row, col) {
    super();
    this.gamePage = gamePage;
    this.row = row;
    this.col = col;
    this.color = 'empty';
    this.addEvents({
      'click .coll': 'click',
      'mouseenter .coll': 'mouseenter',
      'mouseleave .coll': 'mouseleave'
    });
    this.mouseIsInside = false;
  }//constructor

  mouseenter() {
    if (!this.mouseIsInside) {
      this.mouseIsInside = true;
      this.gamePage.placeNext(this);
    }
  };

  mouseleave() {
    this.mouseIsInside = false;
    this.gamePage.removeNext();
  };

  click() {
    this.gamePage.removeNext();
    this.gamePage.placeDisc(this);
  }//click
}//class