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

        const rm_shadow = this.add.image(0, 0, 'bg-shadow');
        rm_shadow.setOrigin(0);

        //Shows the animation...
        setTimeout(() => {
            this.scene.bringToTop('game');
        }, 5000);
    }
}