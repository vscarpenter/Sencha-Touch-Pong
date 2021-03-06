Ext.define('Pong.Ball', {
    singleton : true,

    speed   : 1,
    vollies : 0,
    angle   : null,

    xConstant : 2,

    direction : [
        (Math.floor(Math.random() * 10) % 2) ? 1 : -1,
        (Math.floor(Math.random() * 10) % 2) ? 1 : -1
    ],

    angles : {
        low  : [ 2, 0 ],
        mid  : [ 2, 1 ],
        high : [ 2, 2 ]
    },

    getXY : function (xyPos) {
        return [
            xyPos[0] + (this.angle[0] * this.speed * this.direction[0]),
            xyPos[1] + (this.angle[1] * this.speed * this.direction[1])
        ];
    },

    checkSpeed : function () {
        //increase the game speed every 3 vollies
        if (this.vollies > 0 && this.vollies % 3 === 0) {
            this.speed += 1;
        }
    },

    resetSpeed : function () {
        this.speed = 1 + Pong.Game.difficulty;
        this.vollies = 0;
    },

    reset : function () {
        this.resetSpeed();

        //Set a random angle to start the game
        var angles = [ 'low', 'mid', 'high' ];
        var angle = angles[Math.floor(Math.random() * 3)];

        this.angle = this.angles[angle];
    }
});