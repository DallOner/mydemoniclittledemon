class Menu extends Phaser.Scene {
	constructor(){
		super('menu');
	}

	create(){
		console.log('Menu Scene PAPAX');
		let gMenu = this.add.image(0, 0, 'bg-menu');
		gMenu.setOrigin(0, 0);

		const playButton = this.add.sprite(20, 20, 'btn-play');
		playButton.on('pointerdown', function (pointer)
        {

            this.setTint(0xff0000);
			this.scene.start('game');
        });
	}
}