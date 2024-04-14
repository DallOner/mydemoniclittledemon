const demonicPuzzle = {
	ALLOW_CLICK: 0,
	TWEENING: 1
};

class Game extends Phaser.Scene {
	constructor(){
		super('game');

        this.rows = 0;
        this.columns = 0;
        this.pieceWidth = 0;
        this.pieceHeight = 0;
        this.pieces = null;
        this.spacer = null;
        this.slideSpeed = 300;
        this.slideEase = 'power3';
        this.iterations = 3;

        //  The speed at which the pieces are shuffled at the start. This allows
        //  the player to see the puzzle before trying to solve it. However if
        //  you don't want this, just set the speed to zero and it'll appear
        //  instantly 'scrambled'.
        this.shuffleSpeed = 500;
        this.shuffleEase = 'power1';
        this.lastMove = null;
        this.photo = '';
        this.slices = [];
        this.action = demonicPuzzle.ALLOW_CLICK;
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

		window.solve = () => {
            this.nextRound();
        };

        this.startPuzzle('grid-test', 4, 4);
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

	startPuzzle (key, rows, columns){
        this.photo = key;
        this.rows = rows;
        this.columns = columns;

        const texture = this.textures.getFrame(key);
        const photoWidth = texture.width;
        const photoHeight = texture.height;

        //  Slice the pieces
        const pieceWidth = photoWidth / rows;
        const pieceHeight = photoHeight / columns;
        this.pieceWidth = pieceWidth;
        this.pieceHeight = pieceHeight;

        if (this.pieces){
            this.pieces.removeAll(true);
        } else {
            this.pieces = this.add.container(382, 100);
        }

        if (this.slices){
            this.slices.forEach(slice => slice.destroy());

            this.slices = [];
        }

        let i = 0;

        for (let y = 0; y < this.columns; y++){
            for (let x = 0; x < this.rows; x++){
                const slice = this.textures.addDynamicTexture(`slice${i}`, pieceWidth, pieceHeight);

                const ox = 0 + (x / this.rows);
                const oy = 0 + (y / this.columns);

                slice.stamp(key, null, 0, 0, { originX: ox, originY: oy });

                this.slices.push(slice);

                const piece = this.add.image(x * pieceWidth, y * pieceHeight, `slice${i}`);

                piece.setOrigin(0, 0);

                piece.setData({
                    row: x,
                    column: y,
                    correctRow: x,
                    correctColumn: y
                });

                piece.setInteractive();

                piece.on('pointerdown', () => this.checkPiece(piece));

                this.pieces.add(piece);

                i++;
            }
        }

        this.spacer = this.pieces.getAt(this.pieces.length - 1);
        this.spacer.alpha = 0;

        this.lastMove = null;

        this.shufflePieces();
    }

	shufflePieces (){
        const moves = [];

        const spacerCol = this.spacer.data.get('column');
        const spacerRow = this.spacer.data.get('row');

        if (spacerCol > 0 && this.lastMove !== Phaser.DOWN){
            moves.push(Phaser.UP);
        }

        if (spacerCol < this.columns - 1 && this.lastMove !== Phaser.UP){
            moves.push(Phaser.DOWN);
        }

        if (spacerRow > 0 && this.lastMove !== Phaser.RIGHT){
            moves.push(Phaser.LEFT);
        }

        if (spacerRow < this.rows - 1 && this.lastMove !== Phaser.LEFT){
            moves.push(Phaser.RIGHT);
        }

        this.lastMove = Phaser.Utils.Array.GetRandom(moves);

        switch (this.lastMove)
        {
            case Phaser.UP:
                this.swapPiece(spacerRow, spacerCol - 1);
                break;

            case Phaser.DOWN:
                this.swapPiece(spacerRow, spacerCol + 1);
                break;

            case Phaser.LEFT:
                this.swapPiece(spacerRow - 1, spacerCol);
                break;

            case Phaser.RIGHT:
                this.swapPiece(spacerRow + 1, spacerCol);
                break;
        }
    }

	swapPiece (row, column){
        const piece = this.getPiece(row, column);

        const spacer = this.spacer;
        const x = spacer.x;
        const y = spacer.y;

        // piece.data.set({
        //     row: spacer.data.get('row'),
        //     column: spacer.data.get('column')
        // });

        piece.data.values.row = spacer.data.values.row;
        piece.data.values.column = spacer.data.values.column;

        spacer.data.values.row = row;
        spacer.data.values.column = column;

        // spacer.data.set({
        //     row,
        //     column
        // });

        // this.spacer.data.row = row;
        // this.spacer.data.column = column;

        spacer.setPosition(piece.x, piece.y);

        if (this.shuffleSpeed === 0){
            piece.setPosition(x, y);

            if (this.iterations > 0){
                this.iterations--;
                this.shufflePieces();
            } else {
                this.startPlay();
            }
        } else {
            const tween = this.tweens.add({
                targets: piece,
                x,
                y,
                duration: this.shuffleSpeed,
                ease: this.shuffleEase
            });

            if (this.iterations > 0){
                this.iterations--;
                tween.on('complete', this.shufflePieces, this);
            } else {
                tween.on('complete', this.startPlay, this);
            }
        }
    }

	getPiece (row, column){
        for (let i = 0; i < this.pieces.length; i++){
            const piece = this.pieces.getAt(i);

            if (piece.data.get('row') === row && piece.data.get('column') === column){
                return piece;
            }
        }
        return null;
    }


	startPlay (){
        this.action = demonicPuzzle.ALLOW_CLICK;
    }

	checkPiece (piece){
        if (this.action !== demonicPuzzle.ALLOW_CLICK){
            return;
        }

        const spacer = this.spacer;

        if (piece.data.values.row === spacer.data.values.row){
            if (spacer.data.values.column === piece.data.values.column - 1){
                piece.data.values.column--;

                spacer.data.values.column++;
                spacer.y += this.pieceHeight;

                this.slidePiece(piece, piece.x, piece.y - this.pieceHeight);
            } else if (spacer.data.values.column === piece.data.values.column + 1){
                piece.data.values.column++;

                spacer.data.values.column--;
                spacer.y -= this.pieceHeight;

                this.slidePiece(piece, piece.x, piece.y + this.pieceHeight);
            }
        } else if (piece.data.values.column === spacer.data.values.column){
            if (spacer.data.values.row === piece.data.values.row - 1){
                piece.data.values.row--;

                spacer.data.values.row++;
                spacer.x += this.pieceWidth;

                this.slidePiece(piece, piece.x - this.pieceWidth, piece.y);
            } else if (spacer.data.values.row === piece.data.values.row + 1){
                piece.data.values.row++;

                spacer.data.values.row--;
                spacer.x -= this.pieceWidth;

                this.slidePiece(piece, piece.x + this.pieceWidth, piece.y);
            }
        }
    }

	slidePiece (piece, x, y){
        this.action = demonicPuzzle.TWEENING;

        //this.sound.play('move');

        this.tweens.add({
            targets: piece,
            x,
            y,
            duration: this.slideSpeed,
            ease: this.slideEase,
            onComplete: () => this.tweenOver()
        });
    }

	tweenOver (){
        let outOfSequence = false;

        this.pieces.each(piece => {
            if (piece.data.values.correctRow !== piece.data.values.row || piece.data.values.correctColumn !== piece.data.values.column){
                outOfSequence = true;
            }
        });

        if (outOfSequence){
            this.action = demonicPuzzle.ALLOW_CLICK;
        } else {
            //this.sound.play('win');

            this.tweens.add({
                targets: this.spacer,
                alpha: 1,
                duration: this.slideSpeed * 2,
                ease: 'linear',
                onComplete: () => {
                    this.input.once('pointerdown', this.nextRound, this);
                }
            });

            /* this.pieces.each(piece => {
                piece.setPostPipeline('ShinePostFX');
            }); */
        }
    }

	nextRound (){
        let size;
        let iterations;
        let nextPhoto;

        if (this.photo === 'grid-test'){
            nextPhoto = 'grid-test2';
            iterations = 20;
            size = 4;
        } else if (this.photo === 'grid-test2'){
            nextPhoto = 'grid-test3';
            iterations = 30;
            size = 5;
        } else {
            nextPhoto = 'grid-test';
            iterations = 10;
            size = 3;
        }

		this.photo = nextPhoto;
		this.iterations = iterations;
		this.startPuzzle(nextPhoto, size, size);

        /* this.reveal = this.add.image(this.pieces.x, this.pieces.y, nextPhoto).setOrigin(0, 0);
        this.reveal.setPostPipeline('WipePostFX');

		const pipeline = this.reveal.getPostPipeline('WipePostFX');
        pipeline.setTopToBottom();
        pipeline.setRevealEffect();

        this.tweens.add({
            targets: pipeline,
            progress: 1,
            duration: 2000,
            onComplete: () => {

                this.photo = nextPhoto;
                this.iterations = iterations;
                this.reveal.destroy();

                this.startPuzzle(nextPhoto, size, size);

            }
        }); */
    }

	update(){
		this.drawCandles();
	}
}