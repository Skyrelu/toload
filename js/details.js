function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function backToTop() {
	var obtn = document.getElementById('backtotop');
	//获取页面可视区的高度
	var clientHeight = document.documentElement.clientHeight;
	var bodyHeight = document.body.clientHeight;
	var timer = null;
	var isTop = true; //是否要回到顶部

	obtn.onclick = function() {
		//设置定时器
		timer = setInterval(function() {
			//获取滚动条距离顶部的高度
			var osTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条滚动的高度
			//!!!!document.documentElement和document.body的区别！！！！

			//由快到慢回到顶部
			var ispeed = Math.floor(-osTop / 6);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;

			//匀速回到顶部
			//						document.documentElement.scrollTop = document.body.scrollTop -= 50;
			isTop = true; //要回到顶部
			if (osTop == 0) {
				clearInterval(timer);
			}
		}, 30);
	}

	window.onscroll = function() {
		//获取滚动条距离顶部的高度
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		if (osTop >= clientHeight) { //如果滚动条滚动的高度大于页面可视高度
			obtn.style.display = 'block'; //显示按钮
		} 
		else {
			obtn.style.display = 'none'; //隐藏按钮
		}
		if (!isTop) { //如果中途想取消回到顶部，就停下来
			clearInterval(timer);
		}
		isTop = false; //不回到顶部
	}
}
addLoadEvent(backToTop);