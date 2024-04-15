class Menu extends Phaser.Scene {
	constructor(){
		super('menu');
	}

	create(){
		console.log('Menu Scene PAPAX');
		let gMenu = this.add.image(0, 0, 'bg-menu');
		gMenu.setOrigin(0, 0);

		// Play Background music
		const music = this.sound.add('song');
		music.play();

		// Play Button in the Main Menu
		const playButton = this.add.sprite(240, 296, 'btn-play').setInteractive();
		playButton.on('pointerdown', function (pointer){
            //this.setTint(0xd1d1d1);
			this.scene.start('game');
        }, this);

		playButton.on('pointerout', function (pointer){
            this.clearTint();
        });

        playButton.on('pointerup', function (pointer){
            this.clearTint();
        });

		const creditsButton = this.add.sprite(240, 465, 'btn-credits').setInteractive();
		creditsButton.on('pointerdown', function (pointer){
            //this.setTint(0xd1d1d1);
			this.scene.start('game');
        }, this);

		const menu_shadow = this.add.image(0, 0, 'bg-menuShadow');
		menu_shadow.setOrigin(0, 0);
		menu_shadow.setAlpha(.4);
	}


}