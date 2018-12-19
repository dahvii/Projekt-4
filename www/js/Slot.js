class Slot extends Component {
 
    constructor(board, row, col){
      super();
      this.board = board;
      this.row = row;
      this.col = col;
      this.color = 'empty';
      /*this.addEvents({
        'click div': 'click'
      });*/
    }
}