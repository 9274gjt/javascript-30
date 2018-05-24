// function debounce(func,wait=20,immediate = true){
// 	var timeout;
// 	return function(){
// 		var context = this,args = arguments;
// 		var later = function(){
// 			timeout = null;
// 			//func即checkSlide函数
// 			// console.log(func);
// 			if (!immediate) func.apply(context,args);
// 		}
// 		var callNow=immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout=setTimeout(later, wait);
// 		//将func的方法应用到context上，
// 		if(callNow)func.apply(context,args);
// 	};
// }

var slideImages = document.getElementsByClassName('slide-in');

function checkSlide(e)
{
		for(var i=0;i<slideImages.length;i++)
		{
				img=slideImages[i];
				//滚动到哪个点开始滑入
				var slideInAt=(window.scrollY + window.innerHeight) - img.height / 2;

				//图片的底部
				var imageBottom = img.offsetTop+img.height;

				//已滑过图片的一半
				var isHalfShow = slideInAt>img.offsetTop;
				//未完全滑过图片
				var isNotScrollPast = window.scrollY< imageBottom;

				if(isHalfShow && isNotScrollPast){
					img.classList.add('active');
				}else{
					img.classList.remove('active');
				}
		}
}

// window.addEventListener('scroll', debounce(checkSlide));
// 
window.addEventListener('scroll', checkSlide);