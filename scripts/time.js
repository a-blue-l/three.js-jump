var canvas;
function clock(){
	canvas = document.createElement('canvas');
	canvas.width = 200;
	canvas.height = 200;
	ctx = canvas.getContext('2d');
	if (ctx) {
		var timerId;
		var frameDate = 60;
		function canvaObject(){
			this.x = 0;
			this.y = 0;
			this.rotation = 0;
			this.radius = 0;
			this.borderWidth = 2;
			this.fill = false;
			this.fillColor = '#fff';
			this.updata = function(){
				var ctx = this.ctx;
				ctx.save();
				ctx.lineWidth = this.borderWidth;
				ctx.strokeStyle = this.borderColor;
				ctx.fillStyle = this.fillColor;
				ctx.translate(this.x, this.y);
				if(this.rotation)ctx.rotate(this.rotation * Math.PI/180);
				if(this.draw)this.draw(ctx);
				if(this.fill)ctx.fill();
				ctx.stroke();
				ctx.restore();
			}
		}
		function line(){}
		line.prototype = new canvaObject();
		line.prototype.start = [0, 0];
		line.prototype.end = [5, 5];
		line.prototype.draw = function(ctx){
			ctx.beginPath();
			ctx.moveTo.apply(ctx, this.start);
			ctx.lineTo.apply(ctx, this.end);
			ctx.closePath();
		}
		function Circle(){};
		Circle.prototype = new canvaObject();
		Circle.prototype.draw = function(ctx){
			ctx.beginPath();
			ctx.arc(0, 0, this.radius, 0, 2*Math.PI, true);
			ctx.closePath();
		}
		var circle = new Circle();
		circle.ctx = ctx;
		circle.x = 100;
		circle.y = 100;
		circle.fill = true;
		circle.radius = 90;
		circle.borderWidth = 4;
		circle.borderColor = '#000';

		var hour = new line();
		hour.ctx = ctx;
		hour.x = 100;
		hour.y = 100;
		hour.borderWidth = 10;
		hour.borderColor = '#000';
		hour.start = [0,20];
		hour.end = [0,-40];

		var month = new line();
		month.ctx = ctx;
		month.x = 100;
		month.y = 100;
		month.borderWidth = 6;
		month.borderColor = '#000';
		month.start = [0,20];
		month.end = [0,-60];

		var hand = new line();
		hand.ctx = ctx;
		hand.x = 100;
		hand.y = 100;
		hand.borderWidth = 4;
		hand.borderColor = 'red';
		hand.start = [0,25];
		hand.end = [0,-80];

		ctx.clearRect(0,0,200,200);
		//填充背景色
		ctx.fillStyle = 'orange';
		ctx.fillRect(0,0,200,200);

		circle.updata();
		hour.rotation = (new Date()).getHours() * 30;
		hour.updata();
		month.rotation = (new Date()).getMinutes() * 6;
		month.updata();
		hand.rotation = (new Date()).getSeconds() * 6;
		hand.updata();
		
		timerId = setInterval(function(){
			// ctx.clearRect(0,0,200,200);
			// ctx.fillStyle = 'orange';
			// ctx.fillRect(0,0,200,200);
			
			circle.updata();
			hour.rotation = (new Date()).getHours() * 30;
			hour.updata();
			month.rotation = (new Date()).getMinutes() * 6;
			month.updata();
			hand.rotation = (new Date()).getSeconds() * 6;
			hand.updata();

		}, 1000);

	} else {
		alert('您的浏览器不支持canvas,请更新浏览器');
	}
}
clock();