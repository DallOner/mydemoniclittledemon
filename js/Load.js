class Load extends Phaser.Scene {
	constructor(){
		super('load');
	}

	preload(){
		this.add.text(20, 20, 'LOADING...');
		//this.load.setPath();
		this.load.image('phaser-logo', 'asset/img/boilerplate-logo.png');
		this.load.image('bg-skyblue', 'asset/img/bg_skyblue.png');
		this.load.image('bg-room', 'asset/img/MyDemonicLittleDemons_Gameplay.png');
		this.load.image('bg-menu', 'asset/img/MyDemonicLittleDemons_Menu.png');
		this.load.image('btn-play', 'asset/img/mdld_Menu_btn-play.png');

		this.load.spritesheet('glyph_test', 'asset/img/ss_glyphs_test.png', {frameWidth: 96, frameHeight: 128});
	}

	create(){
		this.scene.start('menu');
	}
}