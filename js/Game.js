class Game extends Phaser.Scene {
	constructor(){
		super('game');
	}

	create(){
		console.log('Game started');

		const frames = this.textures.get('glyph_test').getFrameNames();
		const glyphs = [];
		for (var i=0; i<16; i++) {
			glyphs.push(this.add.sprite(0, 0, 'glyph_test', Phaser.Math.RND.pick(frames)));
		}

		Phaser.Actions.GridAlign(glyphs, {
            width: 4,
            height: 4,
            cellWidth: 300,
            cellHeight: 150,
            x: 100,
            y: 100
        });
	}
}