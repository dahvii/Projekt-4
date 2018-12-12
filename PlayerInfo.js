class PlayerInfo extends Component {

    constructor(){
      super();
      this.addEvents({
        'click #start-button': 'addPlayer'
      });
    }


    addPlayer(){
      $('#invalid-input1').hide();
      $('#invalid-input2').hide();
      const player1 = $('#name-input1').val();
      const player2 = $('#name-input2').val();
      let success = true;
      if (this.validate(player1)) {
        localStorage.setItem('player-1-name', player1);
      } else {
        $('#invalid-input1').show();
        success = false;
      }

      if (this.validate(player2)) {
        localStorage.setItem('player-2-name', player2);
      } else {
        $('#invalid-input2').show();
        success = false;
      }

      if (success) {
        location.href = '/game';
      }
    }

    validate(name){
      return name.length >= 2 && name.length <= 10;
    }
  } 
