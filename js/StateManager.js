class StateManager extends Phaser.Scene {
	constructor(){
		super('stateManager');
	}
	
	create(){
		this.scene.start('boot');
	} 
}

const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1280,
		height: 720,
	},
	backgroundColor: 0xFF83B5,
	scene: [Boot, Load, Menu, Game],
}

const game = new Phaser.Game(config);
