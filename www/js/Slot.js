class Slot extends Component {
    constructor(gamePage, row, col){
      super();
      this.gamePage = gamePage;
      this.row = row;
      this.col = col;
      this.color = 'empty';
      this.addEvents({
        'click .coll': 'click'
      });
    }//constructor

    click(){
        this.gamePage.placeDisc(this);
    }//click
}//class