const demonicPuzzle = {
	ALLOW_CLICK: 0,
	TWEENING: 1
};

/*
    Crear un sistema de seleccion despues de cada completacion de puzzle que
    permita al jugador elegir entre los objetos que se mostraran en la habitacion
    cada objeto cuenta con habilidad para facilitar el puzzle. 
    - Numero de Iteraciones
    - Velociodad de Swap entre fichas
    - Dios/demonio mas grande (en escala)
    Esto se puede hacer directamente con las variables ya existentes con modificadores.
    Adicional a esto, se debe incrementar el numero de niveles reutilizando los seals.
    
    Crear un Thanks for Playing al final del Run.
*/

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
        this.iterations = 10;

        this.shuffleSpeed = 150;
        this.shuffleEase = 'power1';
        this.lastMove = null;
        this.photo = '';
        this.slices = [];
        this.action = demonicPuzzle.ALLOW_CLICK;
	}

	init(){
		this.candle1_state = false;
        this.candle1_on = this.add.image(430, 100, 'candle-on');
        this.candle1_off = this.add.image(430, 100, 'candle-off');

        this.candle2_state = false;
        this.candle2_on = this.add.image(844, 92, 'candle-on');
        this.candle2_off = this.add.image(844, 92, 'candle-off');

		this.candle3_state = false;
        this.candle3_on = this.add.image(364, 412, 'candle-on');
        this.candle3_off = this.add.image(364, 412, 'candle-off');

        this.candle4_state = false;
        this.candle4_on = this.add.image(932, 386, 'candle-on');
        this.candle4_off = this.add.image(932, 386, 'candle-off');

		this.candle5_state = false;
        this.candle5_on = this.add.image(628, 586, 'candle-on');
        this.candle5_off = this.add.image(628, 586, 'candle-off');
        
        this.glyph_preview = '';
	}

	create(){
		console.log('Game started');

        //this.audioMove = this.sound.add('sfx-move');

		this.drawGrid();
		this.drawCandles();

		window.solve = () => {
            this.nextRound();
        };

        this.startPuzzle('gly-01', 4, 4);
	}

	drawGrid() {
		console.log('Drawing the grid');
		let bgFloor = this.add.image(0,0, 'bg-floor');
		bgFloor.setOrigin(0,0);

        //let bgBoard = this.add.image(0,0, 'bg-board');
		//bgBoard.setOrigin(0,0);

        //let bgGrid = this.add.image(0,0, 'bg-gameplay-grid');
        //bgGrid.setOrigin(0);
        //bgGrid.setAlpha(.4);

		let bgCircle = this.add.image(0,0, 'bg-circle');
		bgCircle.setOrigin(0,0);

        //const rm_shadow = this.add.image(0, 0, 'bg-shadow');
        //rm_shadow.setOrigin(0);
	}

	drawCandles(){
		if (this.candle1_state == true){
			this.candle1_off.setAlpha(0);
            this.candle1_on.setAlpha(1);
			this.candle1_on.setDepth(1);
		} else if (this.candle1_state == false){
			this.candle1_on.setAlpha(0);
            this.candle1_off.setAlpha(1);
            this.candle1_off.setDepth(1);
		}

		if (this.candle2_state == true){
			this.candle2_off.setAlpha(0);
            this.candle2_on.setAlpha(1);
			this.candle2_on.setDepth(1);
		} else if (this.candle2_state == false){
			this.candle2_on.setAlpha(0);
            this.candle2_off.setAlpha(1);
            this.candle2_off.setDepth(1);
		}

        if (this.candle3_state == true){
			this.candle3_off.setAlpha(0);
            this.candle3_on.setAlpha(1);
			this.candle3_on.setDepth(1);
		} else if (this.candle3_state == false){
            this.candle3_on.setAlpha(0);
            this.candle3_off.setAlpha(1);
			this.candle3_off.setDepth(1);
		}

        if (this.candle4_state == true){
			this.candle4_off.setAlpha(0);
            this.candle4_on.setAlpha(1);
			this.candle4_on.setDepth(1);
		} else if (this.candle4_state == false){
            this.candle4_on.setAlpha(0);
            this.candle4_off.setAlpha(1);
			this.candle4_off.setDepth(1);
		}

        if (this.candle5_state == true){
			this.candle5_off.setAlpha(0);
            this.candle5_on.setAlpha(1);
			this.candle5_on.setDepth(1);
		} else if (this.candle5_state == false){
            this.candle5_on.setAlpha(0);
            this.candle5_off.setAlpha(1);
			this.candle5_off.setDepth(1);
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

        switch(this.photo) {
            case 'gly-01':
                this.glyph_preview = this.add.image(1020, 436, 'gly-01');
                this.glyph_preview.setOrigin(0);
                this.glyph_preview.setScale(0.35);
                this.glyph_preview.setAlpha(1);
                break;

            case 'gly-02':
                this.glyph_preview = this.add.image(1020, 436, 'gly-02');
                this.glyph_preview.setOrigin(0);
                this.glyph_preview.setScale(0.35);
                this.glyph_preview.setAlpha(1);
                break;

            case 'gly-03':
                this.glyph_preview = this.add.image(1020, 436, 'gly-03');
                this.glyph_preview.setOrigin(0);
                this.glyph_preview.setScale(0.35);
                this.glyph_preview.setAlpha(1);
                break;

            case 'gly-04':
                this.glyph_preview = this.add.image(1020, 436, 'gly-04');
                this.glyph_preview.setOrigin(0);
                this.glyph_preview.setScale(0.35);
                this.glyph_preview.setAlpha(1);
                break;
            
            case 'gly-05':
                this.glyph_preview = this.add.image(1020, 436, 'gly-05');
                this.glyph_preview.setOrigin(0);
                this.glyph_preview.setScale(0.35);
                this.glyph_preview.setAlpha(1);
                break;

            default:
                break;
        }

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

        this.sound.play('sfx-move');

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
            this.sound.play('sfx-victory');
			this.candle1_state = true;
			this.candle2_state = true;
			this.candle3_state = true;
			this.candle4_state = true;
			this.candle5_state = true;
			this.drawCandles();

            this.tweens.add({
                targets: this.spacer,
                alpha: 1,
                duration: this.slideSpeed * 2,
                ease: 'linear',
                onComplete: () => {
                    //this.input.once('pointerdown', this.nextRound, this);
                    this.input.once('pointerdown', this.invokeTime, this);
                }
            });
            
            //this.add.image(256, 256, 'gly-01');
            /* this.pieces.each(piece => {
                piece.setPostPipeline('ShinePostFX');
            }); */
        }
    }

	nextRound (){
        this.candle1_state = false;
        this.candle2_state = false;
        this.candle3_state = false;
        this.candle4_state = false;
        this.candle5_state = false;
        this.drawCandles();

        let size;
        let iterations;
        let nextPhoto;

        if (this.photo === 'gly-01'){
            nextPhoto = 'gly-02';
            iterations = 15;
            size = 4;
        } else if (this.photo === 'gly-02'){
            nextPhoto = 'gly-03';
            iterations = 18;
            size = 4;
        } else if (this.photo === 'gly-03') {
            nextPhoto = 'gly-04';
            iterations = 20;
            size = 4;
        } else if (this.photo === 'gly-04') {
            nextPhoto = 'gly-05';
            iterations = 25;
            size = 4;
        } else if (this.photo === 'gly-05') {
            nextPhoto = 'gridtest';
            iterations = 30;
            size = 4;
        } else {
            nextPhoto = 'gly-01';
            iterations = 22;
            size = 4;
        }

		this.photo = nextPhoto;
		this.iterations = iterations;
		this.startPuzzle(nextPhoto, size, size);
    }

    invokeTime(){
        this.glyph_preview.setAlpha(0);
        this.scene.launch('invoke');
        this.scene.bringToTop('invoke');
        
        setTimeout(() => {
            this.nextRound();
        }, 5050);
    }

	update(){
	}
}