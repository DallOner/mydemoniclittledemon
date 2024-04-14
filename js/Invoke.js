class Invoke extends Phaser.Scene {
	constructor(){
		super('invoke');
	}

    init(){
        this.demons = [];
        this.demonChosen = Phaser.Math.RND.integerInRange(1, 5);
        
    }

    create(){
        console.log('The Chosen Demon is: ' + this.demonChosen);

        const room = this.add.image(0, 0, 'bg-gameplay');
        room.setOrigin(0);

        const portrait1 = this.add.image(320, 20, 'portrait-1');
        portrait1.setOrigin(0);

        const portrait2 = this.add.image(780, 0, 'portrait-2');
        portrait2.setOrigin(0);

        const cat = this.add.image(166, 512, 'cat');
        cat.setOrigin(0);

        const cross = this.add.image(532, 0, 'cross');
        cross.setOrigin(0);

        const curtain = this.add.image(1016, 0, 'curtain');
        curtain.setOrigin(0);

        const lamp = this.add.image(860, 88, 'lamp');
        lamp.setOrigin(0);

        const table = this.add.image(224, 320, 'table');
        table.setOrigin(0);

        //const rm_shadow = this.add.image(0, 0, 'bg-shadow');
        //rm_shadow.setOrigin(0);

        //Shows the animation...
        setTimeout(() => {
            this.scene.bringToTop('game');
        }, 5000);
    }
}