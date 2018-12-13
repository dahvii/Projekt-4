class FormPage extends Component {

    constructor(){
      super();
      this.addRoute('/gameForm', 'Game Form');
      this.addEvents({
        'click #start-button': 'addPlayer',
        'click .btn-cancel': 'cancel'
      });
    }


    addPlayer(){
      $('#invalid-input1').hide();
      $('#invalid-input2').hide();
      const player1 = $('#name-input1').val();
      const player2 = $('#name-input2').val();
      const typ1 = $('#typ-1').val();
      const typ2 = $('#typ-2').val();
      let success = true;
      if (this.validate(player1)) {
        localStorage.setItem('player-1-name', player1);
        localStorage.setItem('typ-1', typ1);
      } else {
        $('#invalid-input1').show();
        success = false;
      }

      if (this.validate(player2)) {
        localStorage.setItem('player-2-name', player2);
        localStorage.setItem('typ-2', typ2);

      } else {
        $('#invalid-input2').show();
        success = false;
      }

      if (success) {
        if (player1!==player2){
        location.href = '/game';}
        
        else{
        $('#invalid-input1').show();
        $('#invalid-input2').show();
      }
      }
    }

    validate(name){
      return name.length >= 2 && name.length <= 10;
    }
    
     cancel(){
      location.href = '/game';
    }
  } 

    

  

    

   
  