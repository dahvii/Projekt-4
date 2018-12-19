class FormPage extends Component {

  constructor() {
    super();
    this.addRoute('/gameForm', 'Game Form');
    this.addEvents({
      'click #start-button': 'addPlayer',
      'keyup #name-input2': 'pressEnter',
      'click #start-button': 'addPlayer',
      'keyup #name-input1': 'pressEnter'
    });
    this.gamePage = new GamePage(this);
  }


  addPlayer() {

    if($('#typ-1').val() === 'bot'){
      this.player1= new Bot($('#name-input1').val(), 'red', 1, 21);
    }
    else{
      this.player1= new Player($('#name-input1').val(), 'red', 1, 21);
    }

    if($('#typ-2').val() === 'bot'){
      this.player2= new Bot($('#name-input2').val(), 'yellow', 2, 21);
    }
    else{
      this.player2= new Player($('#name-input2').val(), 'yellow', 2, 21);
    }

    $('#invalid-input1').hide();
    $('#invalid-input2').hide();
    let success = true;
    if (this.validate(this.player1.name)) {
      localStorage.setItem('player-1-name', this.player1.name);
    } else {
      $('#invalid-input1').show();
      success = false;
    }

    if (this.validate(this.player2.name)) {
      localStorage.setItem('player-2-name', this.player2.name);

    } else {
      $('#invalid-input2').show();
      success = false;
    }

    if (success) {
      if (this.player1.name !== this.player2.name) {
        location.href = '/game';
      }

      else {
        $('#invalid-input1').show();
        $('#invalid-input2').show();
      }
    }
  }

  validate(name) {
    return name.length >= 2 && name.length <= 10;
  }

  pressEnter(e) {
    if (e.which === 13) {
      this.addPlayer();
    }
  }
}

