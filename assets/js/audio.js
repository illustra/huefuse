// HueFuse audio controller

HueFuse.audio = {
	player: new Audio(),

	// Shuffle background music
	currentTrack: 0,
	files: 30,
	play: function(r){
		var f = this.files;
		r = (r) ? r : Math.ceil(Math.random() * f);
		console.log(r);

		this.player.src = 'http://dl.aureljared.tk/huefusebg/' + r + '.mp3';
		this.currentTrack = r;
		this.player.load();
		this.player.onended = function(){
			var f = HueFuse.audio.files, c = HueFuse.audio.currentTrack;
			var shuffle = function(){
				var track = Math.ceil(Math.random() * f);
				if(track == c) {
					while(track == c)
						track = Math.ceil(Math.random() * f);
				}
				return track;
			}

			var n = shuffle();
			this.src = 'http://dl.aureljared.tk/huefusebg/' + n + '.mp3';
			HueFuse.audio.currentTrack = n;
			this.load();
			this.play();
		}
		
		return this.player.play();
	},

	// Pause
	paused: false,
	pause: function(){
		this.paused = true;
		this.player.pause();
	}
}
