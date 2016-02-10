var direction = true, timer, gainTime = 0, endless = false;

function $(el) { return document.querySelector(el) };

var HueFuse = {
	init: function(){
		// Play intro loop sound
		loop = new SeamlessLoop();
		loop.addUri('_bg/bodygold_loop.wav', 14275, "intro");

		title = setInterval(function(){
			$('#load').setAttribute('style', 'width: 100%');
			var rand = function(){ return Math.floor(Math.random() * 255) };
			document.querySelector('#card-home h6').style.color = 'rgb(' + rand() + ',' + rand() + ',' + rand() + ')';
		}, 1000);

		// Buttons and keypresses
		setTimeout(function(){
			/* Home buttons */
			// endless mode
			$('#btn-endless').addEventListener('click', function(){
				endless = true;
				HueFuse.begin();
			});
			// arcade mode
			$('#btn-arcade').addEventListener('click', function(){
				endless = false;
				HueFuse.begin();
			});
			// show game info
			$('#btn-about').addEventListener('click', function(){
				$('#card-home').className = 'hide';
				$('#card-about').removeAttribute('class');
			});
			// exit info on title click
			$('#card-about h6').addEventListener('click', function(){
				$('#card-about').className = 'hide';
				$('#card-home').removeAttribute('class');
			});

			/* Game over screen buttons */
			// replay in endless mode
			$('#btn-endless2').addEventListener('click', function(){
				endless = true;
				HueFuse.reset();
			});
			// replay in arcade mode
			$('#btn-arcade2').addEventListener('click', function(){
				endless = false;
				HueFuse.reset();
			});
			// reset game
			$('#btn-reload').addEventListener('click', function(){
				window.location.reload();
			});

			// Handle keypresses
			document.body.addEventListener('keydown', function(e){
				// Only respond to screen presses after the reference color is shown
				if(disabled)
					return;

				var k = e.keyCode || e.which;

				if(k == 32) { // space bar
					HueFuse.controls.submit();
					return;
				} else if(k == 27) { // escape key
					HueFuse.controls.toggleGame();
					return;
				} else {
					if(k == 37)      // left arrow key - red
						index = 0;
					else if(k == 40) // down arrow key - green
						index = 1;
					else if(k == 39) // right arrow key - blue
						index = 2;
					else             // everything else
						return;

					c = HueFuse.controls.enteredColor[index];

					if(direction) {
						if(c < 255)
							c += 15;
						else {
							c = 255;
							direction = false;
						}
					} else {
						if(c > 0)
							c -= 15;
						else {
							direction = true;
							c = 0;
						}
					}

					// Update color levels and resulting color
					attr = 'height:calc(80px * ' + (c/255) + ')';
					$('#level-'+index).setAttribute('style', attr);
					$('#level-'+index).setAttribute('data-level', c);
					HueFuse.controls.enteredColor[index] = parseInt($('#level-'+index).getAttribute('data-level'));
					HueFuse.controls.updateView();
				}
			});
			loop.start("intro");
			$('#loading').className = 'hide';
		}, 1600);
	},
	time: 20.0,
	tick: function(origTime){
		timer = window.setInterval(function(){
			HueFuse.time -= 0.1;
			$('#time').setAttribute('style','width:'+ (HueFuse.time / origTime * 100) + '%');

			if(HueFuse.time <= 0) {
				HueFuse.announce("Time's up!");
				resetTimer(timer);
				setTimeout(function(){
					HueFuse.gameOver();
				}, 1700);
			}
		}, 100);
	},
	points: 0,
	actual: [0,0,0],
	newLevel: function(){
		var body = document.body;
		var rand = function() { return Math.ceil(Math.random() * Math.random() * 255) };

		// Generate random color
		this.actual = [rand(), rand(), rand()];
		a = this.actual;
		body.setAttribute('style','background-color:rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')');
		
		$('#time').setAttribute('style','width:100%');
		HueFuse.time = 20.0 - gainTime;

		disabled = true;
		setTimeout(function(){
			body.setAttribute('style', 'background:black');
			disabled = false;
			HueFuse.tick(20.0 - gainTime);
		}, (2000 - (gainTime * 100)));
	},
	begin: function(){
		var body = document.body;

		loop.stop();
		clearInterval(title);
		$('#game').setAttribute('style','background:none');
		$('#card').className = 'hide';
		$('#hud').className = '';
		
		// Play bg music
		HueFuse.audio.play();

		HueFuse.newLevel();
		HueFuse.announce('Try to match this color!');
	},
	announce: function(message) {
		var m = $('#status');
		m.innerHTML = message;
		setTimeout(function(){ m.innerHTML = '&nbsp;' }, (2000 - (gainTime * 100)));
	},
	controls: {
		enteredColor: [0,0,0],
		lastColor: [0,0,0],
		updateView: function() {
			var r = this.enteredColor[0],
				g = this.enteredColor[1],
				b = this.enteredColor[2];
			document.body.setAttribute('style', 'background-color:rgb(' + r + ',' + g + ',' + b + ')');
		},

		// Check color accuracy
		submit: function(){
			var e = this.enteredColor, h = HueFuse,
				r = e[0], g = e[1], b = e[2];

			if(e.toString() == this.lastColor.toString()) {
				if(this.lastColor.toString() != HueFuse.actual.toString()) {
					h.announce('Make a color first.');
					return;
				}
			} else
				this.lastColor = [r,g,b];

			var diffR = Math.abs(h.actual[0] - r),
				diffG = Math.abs(h.actual[1] - g),
				diffB = Math.abs(h.actual[2] - b);

			if(diffR < 50 && diffG < 50 && diffB < 50) {
				h.announce('Excellent!');
				this.award(1);
			} else if (diffR < 80 && diffG < 80 && diffB < 80) {
				h.announce('Good!');
				this.award(2);
			} else if (diffR < 120 && diffG < 130 && diffB < 130) {
				h.announce('Okay!');
				this.award(3);
			} else {
				h.announce('Nice try!');
				this.award(4);
			}

			this.enteredColor = [0,0,0];
			for (var i = 0; i < 3; i++)
				$('#level-'+i).setAttribute('style','height:0');

			document.body.setAttribute('style', 'background:black');
			resetTimer(timer);
			setTimeout(HueFuse.newLevel, 500);
		},

		// Award points based on color accuracy
		award: function(rank){
			var points = function(min, max) {
				// Generate a random number within a range.
				// adapted from http://stackoverflow.com/a/1527820 - check out the answer, it's pretty cool
				return Math.floor(Math.random() * Math.random() * (max - min + 1) + min);
			}

			if(rank < 4) {
				if(rank == 1)
					HueFuse.points += points(900, 1300);
				else if(rank == 2)
					HueFuse.points += points(700, 900);
				else if(rank == 3)
					HueFuse.points += points(400, 700);
			} else
				HueFuse.points += points(100, 300);

			if(!endless) {
				if(gainTime < 17.0)
					gainTime += 1.0;        // Decrease by 0.2 sec each level
			}

			$('#score').innerHTML = HueFuse.points;
		},

		// Pause and resume
		paused: false,
		toggleGame: function(){
			var s = this.paused;
			if(s)
				this.resume();
			else
				this.pause();
			this.paused = !this.paused;
		},
		pause: function(){
			resetTimer(timer);

			// Announce pause
			HueFuse.announce('Paused');

			// Pause bg music
			HueFuse.audio.pause();
		},
		resume: function(){
			// Announce resume
			HueFuse.announce('Resumed');

			// TODO: Resume after 3 sec

			// Resume bg music
			HueFuse.audio.player.play();

			HueFuse.tick(20.0 - gainTime);
		}
	},

	// Game over
	gameOver: function() {
		disabled = true;
		$('#card').className = '';
		var cards = ['home', 'high', 'about'];
		for(var i = 0; i < cards.length; i++)
			document.getElementById('card-'+cards[i]).className = 'hide';

		// Stop background music
		HueFuse.audio.pause();
		HueFuse.audio.player.currentTime = 0;
		HueFuse.audio.player.src = '';

		$('#card-stats h1').innerHTML = HueFuse.points;
		document.getElementById('card-stats').removeAttribute('class');
	},

	// Replay game
	reset: function(){
		$('#card').className = 'hide';
		HueFuse.points = 0;
		HueFuse.time = 0;
		gainTime = 0;
		document.getElementById('score').innerHTML = '0';
		document.getElementById('time').setAttribute('style', 'width:0');
		HueFuse.newLevel();
	}
}

function resetTimer(timer) {
	if(timer)
		window.clearInterval(timer);
	else {
		// Dirty hack to prevent ghost timers for now.
		// DO NOT USE IN FINAL
		for(var i = 0; i < 99999; i++)
			window.clearInterval(i);
	}
}
