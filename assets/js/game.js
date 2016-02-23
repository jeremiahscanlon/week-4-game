// ==========================================================================
// page load function
// ==========================================================================

$(document).ready(function() {

	// ==========================================================================
	// Variables, Arrays, and Objects
	// ==========================================================================

	var fighterArray = ['obiWan', 'rey', 'kyloRen', 'darthMaul']

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

	// creating universal variables within object
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
		winCounter : 0
	}
	
	// audio files to be used in attacks
	var audio = new Audio('assets/sounds/sthtwrl1.wav');
	var audio2 = new Audio('assets/sounds/doublebladedtwirl.wav');

	// ==========================================================================
	// Functions
	// ==========================================================================

	// select your fighter
	var selectYou = function(arr) {
		$(arr.divid).hide();
		points.healthPoints = arr.health;
		points.attackPower	= arr.attack;
		var youFighterName = '<img id="youImage" src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourPlayerName").empty().append(youFighterName);
		var youFighterInfo = '<p>Health Points Remaining: '+ points.healthPoints +'</p> <p>Attack Points: ' + points.attackPower + '<p>'
		$("#yourPlayerInfo").empty().append(youFighterInfo);
		$(".chooseHeader").empty().append('<h2>Choose Your Opponent</h2>');
		points.selectCounter++;
	}

	// select opponent
	var selectOpponent = function(arr) {
		$(arr.divid).hide();
		points.healthOpponent = arr.health;
		points.counterPower	= arr.attack;
		var oppFighterName = '<img id="oppImage" src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourOpponentName").empty().append(oppFighterName);
		var oppFighterInfo = '<p>Health Points Remaining: '+ points.healthOpponent +'</p> <p>Attack Points: ' + points.counterPower + '<p>'
		$("#yourOpponentInfo").empty().append(oppFighterInfo);
		points.opponentNow = true;
		points.selectCounter++;
		if (points.selectCounter == 4) {
			$(".chooseHeader").empty();
		}
	}

	// attack
	var attack = function(arr) {
		if (points.opponentNow) {
			
			$("#youImage").animate({left:"+=600px"}, "fast");
			audio.play(audio);
    		$("#youImage").animate({left:"-=600px"}, "fast");
    		$("#oppImage").delay( 500 ).animate({left:"-=600px"}, "fast");
    		audio.play(audio2);
    		$("#oppImage").animate({left:"+=600px"}, "fast");

			points.newPower	= points.newPower + points.attackPower;
			points.healthOpponent = points.healthOpponent - points.newPower;
			points.healthPoints = points.healthPoints - points.counterPower;
			var oppFighterInfo = '<p>Health Points Remaining: '+ points.healthOpponent +'</p> <p>Attack Points: ' + points.counterPower + '<p>'
			$("#yourOpponentInfo").empty().append(oppFighterInfo);
			var youFighterInfo = '<p>Health Points Remaining: '+ points.healthPoints +'</p> <p>Attack Points: ' + points.newPower + '<p>'
			$("#yourPlayerInfo").empty().append(youFighterInfo);
			var attackText = '<h2>You attacked with '+points.newPower+' points and your opponent countered with '+points.counterPower+' points.</h2>'
			$("#attackText").empty().append(attackText);

			// if the opponents health has dropped to zero or below
			if(points.healthOpponent <= 0) {
				
				// keep track of how many wins
				points.winCounter++;

				// if you have defeated 3 opponents then you have destroyed all enemies
				if (points.winCounter == 3) {
					
					//you do not currently have an opponent
					points.opponentNow = false;
					
					// print to document congratulations
					var attackText = '<h2>Congrats. You have defeated all of your enemies!</h2>'
					$("#attackText").empty().append(attackText);
				// if it's less than three then you still have more work to do	
				} else {
					
					// you do not currently have an opponent
					points.opponentNow = false;

					// print to screen good job and do it again.
					var attackText = '<h2>Good job! Please choose your next opponent.</h2>'
					$("#attackText").empty().append(attackText);
				}
				
				// remove the enemies information
				$("#yourOpponentName").empty()
				$("#yourOpponentInfo").empty()
				
				// exit beacuase you struck first, so there is no reason for retaliation
				return;

			}

			//
			if(points.healthPoints <= 0){
				var attackText = '<h2>You were defeated by this enemy. Please <a href="#" id="startOverLink">try again.</a></h2>'
				$("#attackText").empty().append(attackText);
				$('#startOverLink').click(function(){
					startOver();
				});
			}
		} else {
			var attackText = '<h2>You must choose an enemy.</h2>'
			$("#attackText").empty().append(attackText);
		}
	}

	// Start Over
	var startOver = function() {
		location.reload();
	}

	// ==========================================================================
	// BUTTONS
	// ==========================================================================

	// individual fighter selection buttons
	$('#obiWan').click(function(){
		if (points.selectCounter == 0) {
			selectYou(fighters.obiWan);
		} else {
			if (points.opponentNow) {
				var attackText = '<h2>You must finish your current battle first.</h2>'
				$("#attackText").empty().append(attackText);
			} else {
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
				$("#attackText").empty().append(attackText);
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
				$("#attackText").empty().append(attackText);
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
				$("#attackText").empty().append(attackText);
			} else {
				selectOpponent(fighters.darthMaul);
			}
		}
	});

	// attack button calls function
	$('#attackButton').click(function(){
		if (points.winCounter < 3) {
			if (points.selectCounter < 1) {
				var attackText = '<h2>Select your player first.</h2>'
				$("#attackText").empty().append(attackText);
			} else if (points.selectCounter == 1) {
				var attackText = '<h2>Select an opponent first.</h2>'
				$("#attackText").empty().append(attackText);
			} else {
				attack();
			}
		}
	});

	// start over button calls function
	$('#startOver').click(function(){
		startOver();
	});

	// click function to change background
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

