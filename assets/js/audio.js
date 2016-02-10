HueFuse.audio = {
	player: new Audio(),
	currentTrack: 0,
	play: function(){
		var f = this.files, r = Math.ceil(Math.random() * f.length);
		this.player.src = 'assets/bg/' + f[r];
		this.currentTrack = r;
		this.player.load();
		this.player.onended = function(){
			var f = HueFuse.audio.files, c = HueFuse.audio.currentTrack;
			var shuffle = function(){
				var track = Math.ceil(Math.random() * f.length);
				if(track == c) {
					while(track == c)
						track = Math.ceil(Math.random() * f.length);
				}
				return track;
			}

			var n = shuffle();
			this.src = 'assets/bg/' + f[n];
			HueFuse.audio.currentTrack = n;
			this.load();
			this.play();
		}
		return this.player.play();
	},
	paused: false,
	pause: function(){
		this.paused = true;
		this.player.pause();
	},
	files: [
		"4lienetic - Nos Couleurs - Original Mix.mp3",
		"A.Squared - Overseas - Radio Mix.mp3",
		"Alan Fitzpatrick - Reflections - Original Mix.mp3",
		"Alexxi - Whisper The Words - Radio Edit.mp3",
		"Aly & Fila - Rosaires - Chill Out Mix.mp3",
		"Arty - Rebound - Original Mix Edit.mp3",
		"Cass - Lilli's Aftermath.mp3",
		"Clem Leek - Breaking Down.mp3",
		"Coyote Kisses - Diving At Night - Original Mix.mp3",
		"Dimitri Vangelis & Wyman - Payback.mp3",
		"Envio - Touched By The Sun - Rusch & Elusive’s Chill Out Mix.mp3",
		"Flying Lotus - Zodiac Shit.mp3",
		"Hans-Joachim Roedelius - Gently Falling Snow.mp3",
		"Harold van Lennep - Liberation - Radio Edit.mp3",
		"Jerome Isma-Ae - Underwater Love - Chiller Twist Blue Line Remix.mp3",
		"Jesse Rose - FatMan.mp3",
		"Jon Hopkins - Autumn Hill.mp3",
		"Jon Hopkins - Small Memory.mp3",
		"Keith Kenniff - Branch.mp3",
		"Kygo - ID - Ultra Music Festival Anthem.mp3",
		"Lemon Jelly - Closer.mp3",
		"Little People - Start Shootin'.mp3",
		"Melosense - Connected - Original Mix.mp3",
		"MiM0SA - Psychedelic Stereo.mp3",
		"Ookay - Ghost.mp3",
		"Ólafur Arnalds - Eyes Shut - Nocturne in C Minor.mp3",
		"Petit Biscuit - Sunset Lover.mp3",
		"Phil France - The Swimmer.mp3",
		"Porter Robinson - Language.mp3",
		"Portico Quartet - Window Seat.mp3",
		"Prefuse 73 - Perverted Undertone.mp3",
		"RÜFÜS - Simplicity Is Bliss.mp3",
		"René Aubry - Salento.mp3",
		"Robbie Rivera - Roxy.mp3",
		"Russ Liquid - Opus One.mp3",
		"Sandro Silva - Epic.mp3",
		"Sandro Silva - Payback - Original Mix.mp3",
		"Sidney Samson - Trojan - Original Mix.mp3",
		"Sons Of Maria - Need You - Radio Mix.mp3",
		"The Gentleman Losers - Pebble Beach.mp3",
		"Tycho - Awake.mp3",
		"Tycho - Daydream.mp3",
		"Wolfgang Gartner - The Way It Was.mp3",
		"deadmau5 - Faxing Berlin - Original Mix.mp3",
		"deadmau5 - Right This Second.mp3",
		"deadmau5 - The 16th Hour.mp3",
		"deadmau5 - aural psynapse - Original Mix.mp3"
	]
}
