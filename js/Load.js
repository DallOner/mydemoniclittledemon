class Load extends Phaser.Scene {
	constructor(){
		super('load');
	}

	preload(){
		this.add.text(20, 20, 'LOADING...');
		this.load.image('phaser-logo', 'assets/img/boilerplate-logo.png');
		this.load.image('bg-skyblue', 'assets/img/bg_skyblue.png');
	}

	create(){
		this.scene.start('menu');
	}
}