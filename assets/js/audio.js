// HueFuse audio controller

HueFuse.audio = {
	// Multiple Audio objects for preloading music
	players: {
		arcade: [],
		endless: []
	},
	files: {
		arcade: 4,
		endless: 11,
		total: 15
	},

	// Shuffle background music
	currentTrack: 0,
	play: function(){
		if(endless) 
			var p = this.players.endless, f = this.files.endless;
		else
			var p = this.players.arcade, f = this.files.arcade;

		var r = Math.ceil(Math.random() * f);	
		this.currentTrack = r;
		return p[r].play();
	},

	// Pause
	paused: false,
	pause: function(){
		this.paused = true;
		var r = this.currentTrack;
		if(endless)
			this.players.endless[r].pause();
		else
			this.players.arcade[r].pause();
	}
}
