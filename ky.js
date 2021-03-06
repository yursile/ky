	(function(){

	function ky(selector){
		return new ky.prototype.init(selector);
	};

	ky.prototype.init = function(selector){
		var target = document.querySelectorAll(selector);
		return ky.prototype.merge(this,target);
	};

	ky.prototype.init.prototype = ky.prototype;

	ky.prototype.merge = function(first,second){
		var len = +second.length,
		j = 0,
		i = first.length||0;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	}

	ky.prototype.click = function(fn){
		
		var i = 0;
		var len = this.length;
		for(;i<len;i++){
			target = this[i];
			target.addEventListener("touchstart",function(event){
				event.stopPropagation();
				event.preventDefault();
				console.log(event.timeStamp);
				console.log(new Date().getTime());
				var first,last; 
				first = new Date().getTime();
				target.addEventListener("touchend",function(){
					last = new Date().getTime();

					if(last - first<300){
						fn(event);
					}
					target.removeEventListener("touchend",arguments.callee,false);
				},false);
				
			},false);
		}	
	};

	ky.prototype.dbClick = function(target,fn){

		var i = 0;
		var len = this.length;
		for(;i<len;i++){
			target = this[i];
			target.addEventListener("touchstart",function(event){
				var first,last; 
				event.stopPropagation();
				event.preventDefault();

				target.addEventListener("touchend",function(){
					first = new Date().getTime();

					target.addEventListener("touchstart",function(event){
						event.stopPropagation();
						event.preventDefault();
						end = new Date().getTime();

						if(end - first<500){

							target.addEventListener("touchend",function(event){
								fn(event);
								target.removeEventListener("touchend",arguments.callee,false);
							},false);

							fn(event);
						}
						target.removeEventListener("touchstart",arguments.callee,false);
					},false);
				},false);

			},false);
		}		
	};


	ky.prototype.html = function(str){
		var i = 0;
		var len = this.length;
		if(!str.trim()){
			
			target = this[0];
			return target.innerHTML;
				
		}else{
			for(;i<len;i++){
				target = this[i];
				target.innerHTML = str
			}	
		}
			
	}

	ky.Callbacks = function(){
		this.fns = [];
	};

	ky.Callbacks.prototype = {
		constructor:ky.Callbacks,

		add:function(fn){
			this.fns.push(fn);
		},
		fire:function(arg){
			var i = 0;
			var len = this.fns.length;
			for(;i<len;i++){
				this.fns[i](arg);
			}
		}
	};

	ky.prototype.swiper = function(direction,fn){
		var i = 0;
		var len = this.length;
		for(;i<len;i++){
			target = this[i];
			target.addEventListener("touchstart",function(event){
				event.stopPropagation();
				event.preventDefault();
				var currentDirection = [];
				var touch = event.targetTouches[0];
				var ox = touch.clientX;
				var oy = touch.clientY;
				console.log("x:"+ox+"  y:"+oy);

				target.addEventListener("touchend",function(event){
					event.stopPropagation();
					event.preventDefault();

					var touch2 = event.changedTouches[0];
					var dx = touch2.clientX;
					var dy = touch2.clientY;
					console.log("x:"+dx+"  y:"+dy);
					if(dx-ox>3){
						currentDirection.push("right");
					}else if(dx-ox>3){
						currentDirection.push("left");
					}
					if(dy-oy>3){
						currentDirection.push("down");
					}else if(dy-oy<3){
						currentDirection.push("up");
					}


					for(var i = 0;i<currentDirection.length;i++){
						if(currentDirection[i] == direction){
							fn();
						}
					}


					//last

					target.removeEventListener("touchend",arguments.callee,false);
				});

			},false);
		}		
	}
	
	function jsonp(option){
		var script = document.createElement("script");
		option.callback=option.callback||rdfn();
		script.src = option.url+"?"+obj2arg(option.data)+"&callback="+option.callback;
		window[option.callback] = function(data){
			option.success(data);
			window[option.callback] = null;
			document.body.removeChild(script);
		}
		setTimeout(function(){
			document.body.appendChild(script)
		},0);
	}

	function obj2arg(option){
		var args = "";
		for(var i in option){
			args += i+"="+option[i]+"&";
		}
		return args.slice(0,this.length-1);
	}

	function rdfn(){
		return "jsonp"+Math.ceil(Math.random()*100000);
	}
	ky.jsonp = jsonp;

	window.ky = ky;
})();
