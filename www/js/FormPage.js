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
    Global.formPage = this;
  }


  addPlayer() {
    console.log('addPlayer');


    if($('#typ-1').val() === 'bot'){
      this.player1= new Bot($('#name-input1').val(), 'red', 1, 21);
      console.log('skapar bot');
      
    }
    else{
      this.player1= new Player($('#name-input1').val(), 'red', 1, 21);
      console.log('skapar human');

    }

    if($('#typ-2').val() === 'bot'){
      this.player2= new Bot($('#name-input2').val(), 'yellow', 2, 21);
      console.log('skapar bot');

    }
    else{
      this.player2= new Player($('#name-input2').val(), 'yellow', 2, 21);
      console.log('skapar human');

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

    if (!success || this.player1.name === this.player2.name) {
      $('#invalid-input1').show();
      $('#invalid-input2').show();
    }    
    else {
      history.pushState(null, null, '/game');
      Global.router.setPath('/game');
      Global.router.mainInstance.render();
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

