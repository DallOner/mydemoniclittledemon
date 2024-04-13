class Boot extends Phaser.Scene {
	constructor(){
		super('boot');
	}

	init(){
		// Function to prepare data.
	}

	preload(){
		// Function to load music and img into memory.
	}

	create(){
		// Function to add the object to the game
		this.add.text(20, 20, 'Loading ...');
		console.log('Game Booted...');
		this.scene.start('menu');
	}

	update(){
		// Function loop that runs constantly.
	}
}