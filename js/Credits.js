class Credits extends Phaser.Scene {
    constructor(){
        super('credits');
    }

    create(){
        console.log('Credits Scene');

        setTimeout(() => {
            this.scene.start('menu');
        }, 15000);
    }
}