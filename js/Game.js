class Game extends Phaser.Scene {
	constructor(){
		super('game');
	}

	create(){
		console.log('Game started');
		this.add.text(20,20,'Game started');
	}
}