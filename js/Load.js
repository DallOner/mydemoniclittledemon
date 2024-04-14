class Load extends Phaser.Scene {
	constructor(){
		super('load');
	}

	preload(){
		this.add.text(20, 20, 'LOADING...');
		
		// Load Sprites
		this.load.image('phaser-logo', 'asset/img/boilerplate-logo.png');
		this.load.image('bg-skyblue', 'asset/img/bg_skyblue.png');
		this.load.image('bg-room', 'asset/img/MyDemonicLittleDemons_Gameplay.png');
		this.load.image('bg-menu', 'asset/img/MyDemonicLittleDemons_Menu.png');
		this.load.image('btn-play', 'asset/img/mdld_Menu_btn-play.png');
		this.load.image('bg-board', 'asset/img/MyDemonicLittleDemons_Board.png');
		this.load.image('candle-off', 'asset/img/T_MDLD_Candle_off.png');
		this.load.image('candle-on', 'asset/img/T_MDLD_Candle_on.png');
		this.load.image('bg-floor', 'asset/img/T_MDLD_Bg_Floor.png');
		this.load.image('bg-circle', 'asset/img/T_MDLD_Circle.png');
		this.load.image('bg-shadow', 'asset/img/T_MDLD_elements_justshadow.png');
		this.load.image('portrait-1', 'asset/img/T_MDLD_Portrait_01.png');
		this.load.image('portrait-2', 'asset/img/T_MDLD_Portrait_02.png');
		this.load.image('portrait-1', 'asset/img/T_MDLD_Portrait_01.png');
		this.load.image('bg-gameplay', 'asset/img/T_MDLD_Bg_Gameplay.png');
		this.load.image('cat', 'asset/img/T_MDLD_Cat.png');
		this.load.image('cross', 'asset/img/T_MDLD_Cross.png');
		this.load.image('curtain', 'asset/img/T_MDLD_Curtain.png');
		this.load.image('lamp', 'asset/img/T_MDLD_Lamp.png');
		


		this.load.image('grid-test', 'asset/img/mdld_grid-test.png');
		this.load.image('grid-test2', 'asset/img/mdld_grid-test2.png');
		this.load.image('grid-test3', 'asset/img/mdld_grid-test3.png');
		
		// Load Spritesheets
		this.load.spritesheet('glyph_test', 'asset/img/ss_glyphs_test.png', {frameWidth: 96, frameHeight: 128});
		
	
		// Load Audio
		this.load.audio('song', 'asset/audio/Eternal_Procession.mp3');
	}

	create(){
		this.scene.start('menu');
	}
}