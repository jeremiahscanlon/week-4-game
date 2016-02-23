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
			attack : 8,
			counter : 8,
		},
		rey : {
			name : 'Rey',
			image : 'assets/images/rey.png',
			divid : '#rey',
			health : 100,
			attack : 5,
			counter : 5,
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

	var points = {
		// your health
		healthPoints : 0,
		// your attack power
		attackPower : 0,
		// oponents health
		healthOpponent : 0,
		// opponents counter power
		counterPower : 0,
	}
	// select counter
	var selectCounter = 0;

	// ==========================================================================
	// Functions
	// ==========================================================================

	// select your fighter
	var selectYou = function(arr) {
		$(arr.divid).hide();
		points.healthPoints = arr.health;
		points.attackPower	= arr.attack;
		var youFighterName = '<img src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourPlayerName").empty().append(youFighterName);
		var youFighterInfo = '<p>Health Points Remaining: '+ points.healthPoints +'</p> <p>Attack Points: ' + points.attackPower + '<p>'
		$("#yourPlayerInfo").empty().append(youFighterInfo);
		$(".chooseHeader").empty().append('<h2>Choose Your Opponent</h2>');
		selectCounter++;
	}

	// select opponent
	var selectOpponent = function(arr) {
		$(arr.divid).hide();
		points.healthOpponent = arr.health;
		points.counterPower	= arr.attack;
		var oppFighterName = '<img src="' + arr.image +'" alt="'+ arr.name +'"> <h3>'+ arr.name +'</h3>'
		$("#yourOpponentName").empty().append(oppFighterName);
		var oppFighterInfo = '<p>Health Points Remaining: '+ points.healthOpponent +'</p> <p>Attack Points: ' + points.counterPower + '<p>'
		$("#yourOpponentInfo").empty().append(oppFighterInfo);
	}

	// attack
	var attack = function() {
		console.log(selectCounter);
		console.log('Your Health: ' + points.healthPoints);
		console.log('Opponent Health: ' + points.healthOpponent);
		console.log('Your Attack: ' + points.attackPower);
		console.log('Opponent Attack: ' + points.counterPower);
		points.healthOpponent = points.healthOpponent - points.attackPower;
		points.healthPoints = points.healthPoints - points.counterPower;
		points.attackPower	= points.attackPower * 2;

		console.log('Your Health: ' + points.healthPoints);
		console.log('Opponent Health: ' + points.healthOpponent);
		
	}

	// attack
	var startOver = function() {
		location.reload();
	}

	// ==========================================================================
	// BUTTONS
	// ==========================================================================

	// individual fighter selection buttons
	$('#obiWan').click(function(){
		if (selectCounter == 0) {
			selectYou(fighters.obiWan);
		} else {
			selectOpponent(fighters.obiWan);
		}
	});

	$('#rey').click(function(){
		if (selectCounter == 0) {
			selectYou(fighters.rey);
		} else {
			selectOpponent(fighters.rey);
		}
	});
	$('#kyloRen').click(function(){
		if (selectCounter == 0) {
			selectYou(fighters.kyloRen);
		} else {
			selectOpponent(fighters.kyloRen);
		}
	});
	$('#darthMaul').click(function(){
		if (selectCounter == 0) {
			selectYou(fighters.darthMaul);
		} else {
			selectOpponent(fighters.darthMaul);
		}
	});

	// attack button calls function
	$('#attackButton').click(function(){
		attack();
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

