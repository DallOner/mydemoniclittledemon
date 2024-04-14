class Game extends Phaser.Scene {
	constructor(){
		super('game');
	}

	init(){
		let candle1_state = false;
		let candle2_state = false;
		let candle3_state = false;
		let candle4_state = false;
		let candle5_state = false;
	}

	create(){
		console.log('Game started');

		this.drawGrid();
	}

	drawGrid() {
		console.log('Drawing the grid');
		let bgFloor = this.add.image(0,0, 'bg-floor');
		bgFloor.setOrigin(0,0);

		let bgCircle = this.add.image(0,0, 'bg-circle');
		bgCircle.setOrigin(0,0);

		//let bgBoard = this.add.image(0,0, 'bg-board');
		//bgBoard.setOrigin(0,0);
	}

	drawCandles(){
		if (this.candle1_state == true){
			let candle1 = this.add.sprite(430, 100, 'candle-on');
			//this.candle1_state = false;
		} else {
			let candle1 = this.add.sprite(430, 100, 'candle-off');
			//this.candle1_state = true;
		}

		if (this.candle2_state == true){
			let candle2 = this.add.sprite(844, 92, 'candle-on');
		} else {
			let candle2 = this.add.sprite(844, 92, 'candle-off');
		}

		if (this.candle3_state == true){
			let candle3 = this.add.sprite(364, 412, 'candle-on');
		} else {
			let candle3 = this.add.sprite(364, 412, 'candle-off');
		}

		if (this.candle4_state == true){
			let candle4 = this.add.sprite(932, 386, 'candle-on');
		} else {
			let candle4 = this.add.sprite(932, 386, 'candle-off');
		}

		if (this.candle5_state == true){
			let candle5 = this.add.sprite(0,0, 'candle-on');
		} else {
			let candle5 = this.add.sprite(628, 586, 'candle-off');
		}
	}

	update(){
		this.drawCandles();
	}
}