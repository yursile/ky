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
	};


	ky.prototype.html = function(str){
		var i = 0;
		var len = this.length;
		for(;i<len;i++){
			target = this[i];
			target.innerHTML = str
		}	
	}

	window.ky = ky;
})();