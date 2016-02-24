// ==========================================================================
// page load function
// ==========================================================================

$(document).ready(function() {

	// ==========================================================================
	// Variables, Arrays, and Objects
	// ==========================================================================

	var fighterDivId = ['#obiWan', '#rey', '#kyloRen', '#darthMaul']

	// create main object for game
	var fighters = {
		obiWan : {
			name : 'Obi Wan',
			image : 'assets/images/obi-wan.png',
			divid : '#obiWan',
			health : 125,
			attack : 15,
			counter : 15,
		},
		rey : {
			name : 'Rey',
			image : 'assets/images/rey.png',
			divid : '#rey',
			health : 100,
			attack : 10,
			counter : 10,
		},
		kyloRen : {
			name : 'Kylo Ren',
			image : 'assets/images/kylo-ren.png',
			divid : '#kyloRen',
			health : 150,
			attack : 20,
			counter : 20,
		},
		darthMaul : {
			name : 'Darth Maul',
			image : 'assets/images/darth-maul.png',
			divid : '#darthMaul',
			health : 180,
			attack : 25,
			counter : 25,
		},
	}

	// creating universal variables by creating an object
	var points = {
		// your health
		healthPoints : 0,
		// your attack power
		attackPower : 0,
		// calculated new power
		newPower : 0,
		// oponents health
		healthOpponent : 0,
		// opponents counter power
		counterPower : 0,
		// select opponent counter	
		selectCounter : 0,
		// is there an opponent
		opponentNow : false,
		// win counter
		winCounter : 0,
	}
	
	// audio files to be used in attacks
	var audio = new Audio('assets/sounds/sthtwrl1.wav');
	var audio2 = new Audio('assets/sounds/doublebladedtwirl.wav');

	// ==========================================================================
	// Functions
	// ==========================================================================

	// select your fighter
	var selectYou = function(arr) {
		
		// hide your choice from the menu
		$(arr.divid).hide();
		
		// set the initial values based on character and populate the html
		points.healthPoints = arr.health;
		points.attackPower	= arr.attack;
		var youFighterName = '<img id="youImage" src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourPlayerName").html(youFighterName);
		var youFighterInfo = '<p>Health Points Remaining: '+ points.healthPoints +'</p> <p>Attack Points: ' + points.attackPower + '<p>'
		$("#yourPlayerInfo").html(youFighterInfo);

		// increment select counter
		points.selectCounter++;
	}

	// select opponent
	var selectOpponent = function(arr) {

		// hide the choice from the menu
		$(arr.divid).hide();
		
		// set the initial values base on the character and populate to html
		points.healthOpponent = arr.health;
		points.counterPower	= arr.attack;
		var oppFighterName = '<img id="oppImage" src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourOpponentName").html(oppFighterName);
		var oppFighterInfo = '<p>Health Points Remaining: '+ points.healthOpponent +'</p> <p>Attack Points: ' + points.counterPower + '<p>'
		$("#yourOpponentInfo").html(oppFighterInfo);
		
		// register that you now have an opponent
		points.opponentNow = true;
		
		// increment select counter
		points.selectCounter++;
	}

	// attack
	var attack = function(arr) {
		
		// check if you have an opponent 
		if (points.opponentNow) {
			
			// animate the attacks and play the sounds
			$("#youImage").animate({left:"+=600px"}, "fast");
			audio.play(audio);
    		$("#youImage").animate({left:"-=600px"}, "fast");
    		$("#oppImage").delay( 500 ).animate({left:"-=600px"}, "fast");
    		audio.play(audio2);
    		$("#oppImage").animate({left:"+=600px"}, "fast");

    		// calculate opponents health chnage and print to screen
			points.healthPoints = points.healthPoints - points.counterPower;
			var oppFighterInfo = '<p>Health Points Remaining: '+ points.healthOpponent +'</p> <p>Attack Points: ' + points.counterPower + '<p>'
			$("#yourOpponentInfo").html(oppFighterInfo);

			// calculate your health change, your new attack power points, and print to screen
			points.newPower	= points.newPower + points.attackPower;
			points.healthOpponent = points.healthOpponent - points.newPower;
			var youFighterInfo = '<p>Health Points Remaining: '+ points.healthPoints +'</p> <p>Attack Points: ' + points.newPower + '<p>'
			$("#yourPlayerInfo").html(youFighterInfo);
			
			// message what happened
			var attackText = '<h2>You attacked with '+points.newPower+' points and your opponent countered with '+points.counterPower+' points.</h2>'
			$("#attackText").html(attackText);

			// if the opponents health has dropped to zero or below
			if(points.healthOpponent <= 0) {
				
				// keep track of how many wins
				points.winCounter++;

				// if you have defeated 3 opponents then you have destroyed all enemies
				if (points.winCounter == 3) {
					
					//you do not currently have an opponent
					points.opponentNow = false;
					
					// message congratulations
					var attackText = '<h2>Congrats. You have defeated all of your enemies!</h2>'
					$("#attackText").html(attackText);

					// change attack button to fight again
					$('#attackButton').text('Fight Again').removeClass( "btn-danger" ).addClass( "btn-warning" );
					$('#attackButton').click(function(){
						startOver();
					});

				// if it's less than three then you still have more work to do	
				} else {
					
					// you do not currently have an opponent
					points.opponentNow = false;

					// message good job and do it again.
					var attackText = '<h2>Good job! Please choose your next opponent.</h2>'
					$("#attackText").html(attackText);
				}
				
				// remove the enemies information
				$("#yourOpponentName").empty()
				$("#yourOpponentInfo").empty()
				
				// exit beacuase you struck first, so there is no reason for retaliation
				return;

			}

			// You lose
			if(points.healthPoints <= 0){
				
				// message to screen that you were defeated
				var attackText = '<h2>You were defeated by this enemy. Please <a href="#" id="startOverLink">try again.</a></h2>'
				$("#attackText").html(attackText);
				$('#startOverLink').click(function(){
					startOver();
				});

				// change attack button to start over
				$('#attackButton').text('Start Over').removeClass( "btn-danger" ).addClass( "btn-warning" );
				$('#attackButton').click(function(){
					startOver();
				});
			}

		// if you don't have an opponent message that you must choose one first
		} else {
			var attackText = '<h2>You must choose an enemy.</h2>'
			$("#attackText").html(attackText);
		}
	}

	// Start Over
	var startOver = function() {
		location.reload();
	}

	// ==========================================================================
	// BUTTONS
	// ==========================================================================


	// IF THERE IS TIME, REPLACE THIS SECTION WITH A FOR LOOP.

	// individual fighter selection buttons
	$('#obiWan').click(function(){

		// if selected first
		if (points.selectCounter == 0) {

			// run the function to create as your player
			selectYou(fighters.obiWan);
		
		// if selected after first make character opponent
		} else {

			// if you currently already have an opponent
			if (points.opponentNow) {
				// message that you have an opponent already
				var attackText = '<h2>You must finish your current battle first.</h2>'
				$("#attackText").html(attackText);
			} else {
				// run the function to create as opponent
				selectOpponent(fighters.obiWan);	
			}
			
		}
	});

	$('#rey').click(function(){
		if (points.selectCounter == 0) {
			selectYou(fighters.rey);
		} else {
			if (points.opponentNow) {
				var attackText = '<h2>You must finish your current battle first.</h2>'
				$("#attackText").html(attackText);
			} else {
				selectOpponent(fighters.rey);	
			}
		}
	});
	$('#kyloRen').click(function(){
		if (points.selectCounter == 0) {
			selectYou(fighters.kyloRen);
		} else {
			if (points.opponentNow) {
				var attackText = '<h2>You must finish your current battle first.</h2>'
				$("#attackText").html(attackText);
			} else {
				selectOpponent(fighters.kyloRen);	
			}
		}
	});
	$('#darthMaul').click(function(){
		if (points.selectCounter == 0) {
			selectYou(fighters.darthMaul);
		} else {
			if (points.opponentNow) {
				var attackText = '<h2>You must finish your current battle first.</h2>'
				$("#attackText").html(attackText);
			} else {
				selectOpponent(fighters.darthMaul);
			}
		}
	});

	// attack button click function
	$('#attackButton').click(function(){

		// if won less than three times
		if (points.winCounter < 3) {

			// if you hit the button before choosing your player
			if (points.selectCounter < 1) {
				
				//message that you have to choose your player
				var attackText = '<h2>Select your player first.</h2>'
				$("#attackText").html(attackText);

			// if you hit the button before choosing 
			} else if (points.selectCounter == 1) {

				//message that you have to choose your opponent
				var attackText = '<h2>Select an opponent first.</h2>'
				$("#attackText").html(attackText);

			} else {
				
				// you meet all the requirements run the function
				attack();
			}
		}
	});

	// start over button calls function
	$('#startOver').click(function(){
		startOver();
	});

	// click function to change background by removing any possible previous class and
	// adding the reuqested one
	$('#forest').click(function() {
		$( 'body' ).removeClass( "snow junk ship street" ).addClass( "forest" );
	});
	$('#snow').click(function() {
		$( 'body' ).removeClass( "forest  junk ship street" ).addClass( "snow" );
	});
	$('#junk').click(function() {
		$( 'body' ).removeClass( "forest snow ship street" ).addClass( "junk" );
	});
	$('#ship').click(function() {
		$( 'body' ).removeClass( "forest snow junk street" ).addClass( "ship" );
	});
	$('#street').click(function() {
		$( 'body' ).removeClass( "forest snow junk ship" ).addClass( "street" );
	});
	
});

