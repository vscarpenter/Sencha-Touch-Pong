Ext.define('Pong.controller.Ball', {
    extend: 'Ext.app.Controller',

    config: {

    },

    checkCollisions: function(ball) {
        var leftPaddle  = Pong.app.paddleLeft.element.getBox(),
            rightPaddle = Pong.app.paddleRight.element.getBox(),
            ballBox     = ball.getBox(),
            ballHeight  = ball.getHeight(),
            collisionX  = false,
            collisionY  = false,
            surfaceBox;

        if (!Pong.app.surface) {
            Pong.app.surface = Ext.ComponentQuery.query('viewport > panel')[0].element.down('.x-panel-inner');
        }
        surfaceBox = Pong.app.surface.getBox();

        //check collision with borders
        if (ballBox.left < surfaceBox.left) {
            Pong.app.dispatch({
                controller : 'Referee',
                action     : 'incrementScore',
                args       : [ true ]
            });

            return false;
        }
        else if (ballBox.right > surfaceBox.right) {
            Pong.app.dispatch({
                controller : 'Referee',
                action     : 'incrementScore',
                args       : [ false ]
            });

            return false;
        }
        if (ballBox.top < surfaceBox.top || ballBox.bottom > surfaceBox.bottom) {
            collisionY = true;

            Pong.app.dispatch({
                controller : 'Audio',
                action     : 'playCollision'
            });
        }
        //check collision with paddles
        if (Ball.direction[0] < 0) {
            if (ballBox.bottom >= leftPaddle.top && ballBox.top <= leftPaddle.bottom) {
                if (ballBox.left <= leftPaddle.right && ballBox.left >= leftPaddle.right - Ball.speed - Ball.xConstant) { 
                    collisionX = true;
                    Ball.checkSpeed();
                    this.getDeflection(ballBox, leftPaddle);

                    Pong.app.dispatch({
                        controller : 'Audio',
                        action     : 'playPong'
                    });
                }
            }
        }
        else {
            if (ballBox.bottom >= rightPaddle.top && ballBox.top <= rightPaddle.bottom) {
                if (ballBox.right >= rightPaddle.left && ballBox.right <= rightPaddle.left + Ball.speed + Ball.xConstant) { 
                    collisionX = true; 
                    Ball.checkSpeed();
                    this.getDeflection(ballBox, rightPaddle);

                    Pong.app.dispatch({
                        controller : 'Audio',
                        action     : 'playPong'
                    });
                }
            }
        }

        //change ball direction, if necessary
        this.getDirection(collisionX, collisionY);

        return true;
    },

    update: function(ball) {
        var el  = ball.element,
            pos = el.getXY(),
            xy = Ball.getXY(pos);

        el.setXY(xy);
        Pong.controller.Paddle.prototype.updateCPU(xy);

        //check XY coordinates to see if player has scored
        this.checkCollisions(el);
    },

    getDirection: function(collisionX, collisionY) {
        if (collisionX) { 
            Ball.direction[0] *= -1; 
            Ball.vollies++;
        }
        if (collisionY) { Ball.direction[1] *= -1; }
    },

    getDeflection: function(ball, paddle) {
        var ballMiddle = ball.top + (ball.height / 2),
            paddleSection = paddle.height / 5;

        if (ballMiddle <= paddle.top + paddleSection || ballMiddle >= paddle.bottom - paddleSection) {
            Ball.angle = Ball.angles.high;
            return;
        }

        paddleSection *= 2;

        if (ballMiddle <= paddle.top + paddleSection || ballMiddle >= paddle.bottom - paddleSection) {
            Ball.angle = Ball.angles.mid;
            return;
        }

        Ball.angle = Ball.angles.low;
        Ball.resetSpeed(); //only an low angle returns
        return;
    }

});