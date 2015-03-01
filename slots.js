/**
 * @fileOverview: 老虎机demo
 * @email: tiantian5@leju.com
 * @date: 2015-02-12
 */
$(document).ready(function(){
    var oStart = document.getElementById("start");
    var solts = [];
    
    function Solt( maxSpeed, speedStepper, id ){
        this.height = 400;
        this.period = 6000;
        this.X = 10;
        this.pattern = [[0.1, 0.3, 0.6, 0.8, 0.9, 0.95],   //时间百分比
                        [2, 5, 15, 10, 5, 1]];  //移动距离
        this.second = 0;
        this.speed = 0;
        this.maxSpeed = maxSpeed || 30;
        this.speedStepper = speedStepper || 1;
        this.$Img = $("#" + id);
        this.init();
    }
    
    Solt.prototype = {
        init: function(){
            for(var i in this.pattern[0]){
                this.pattern[0][i] = this.period * this.pattern[0][i];
            }
            this.start();
        },
        start: function(){
            var self = this;
            this.timer = window.setInterval(function(){
                if( self.speed < self.maxSpeed ){
                    self.speed += self.speedStepper;
                }else{
                    oStart.disabled = false;
                }
                self.scroll();
            }, 100);
        },
        stop: function(){
            window.clearInterval(this.timer);
            var limit = 30;
            var self = this;
            
            this.timer = window.setInterval(function(){
                if( self.speed > limit ){
                    self.speed -= self.speedStepper;
                    self.scroll();
                }else{
                    window.clearInterval(self.timer);
                    var random = Math.floor(Math.random()*5) - 1;
                    self.$Img.css({"top" : random + "px"});
                    self.$Img.animate({"top" : "-" + (random * 99) + "px" },
                        500,
                        'ease-out'
                    );
                    self.speed = 0;
                }
                
            }, 100);
        },
        scroll: function(){
            var top = parseFloat(this.$Img.css("top"), 10) - this.speed;
            if( top < -400 ){
                top = top + 400;
            }
            this.$Img.css("top", top);            
        }
    }
    
    
    oStart.addEventListener("click", function(){
        if( this.value == "start" ){
            this.value = "stop";
            this.disabled = true;
            if( solts.length == 0 ){
                var solt1 = new Solt( 30, 1, "img1" );
                var solt2 = new Solt( 45, 2, "img2" );
                var solt3 = new Solt( 70, 3, "img3" );
                solts.push(solt1, solt2, solt3);
            }else{
                for( var i = 0; i < 3; i++ ){
                    solts[i].start();
                }
            }
        }else{
            this.value = "start";
            for( var i = 0; i < 3; i++ ){
                solts[i].stop();
            }
        }
    });
    
    
    
});