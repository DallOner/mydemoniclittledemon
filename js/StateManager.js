class StateManager extends Phaser.Scene {
	constructor(){
		super('stateManager');
	}
	
	create(){
		this.scene.start('boot');
	} 
}

const config = {
	width: 960,
	height: 720,
	backgroundColor: 0xFF83B5,
	scene: [Boot, Menu, Game],
}

const game = new Phaser.Game(config);
