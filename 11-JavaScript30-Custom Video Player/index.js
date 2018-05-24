var player=document.getElementsByClassName('player')[0];
var video=document.getElementsByTagName('video')[0];
var progress=document.getElementsByClassName('progress')[0];
var progressBar=document.getElementsByClassName('progress__filled')[0];
var toggle=document.getElementsByClassName('toggle')[0];
var skipButtons=document.getElementsByClassName('player__button');
var ranges=document.getElementsByClassName('player__slider');


//暂停和播放
function togglePlay(){
	var method = video.paused ? 'play':'pause';
	video[method]();
}


//更新播放按钮图标
function updateButton(){
	var icon = this.paused ? '►' : '❚ ❚';
	// console.log(icon)
	toggle.textContent=icon;
}


// 跳进播放
function skip(){
	video.currentTime +=parseFloat(this.dataset.skip);//data-skip属性
}


//调节音量或播放速度
function handleRangeUpdate(){
	video[this.name]=this.value;
}


//进度条
function handleProgress(){
	// console.log(progressBar);
	var percent = (video.currentTime / video.duration)*100;
	progressBar.style.flexBasis = percent+'%';
}

//调节播放时间点
function scrub(e){
	var scrubTime= (e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime = scrubTime;
}


video.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
for(var i=1;i<skipButtons.length;i++){
	skipButtons[i].addEventListener('click',skip);
}


for(var i=0;i<ranges.length;i++){
	ranges[i].addEventListener('change', handleProgress);
	ranges[i].addEventListener('mouseover', handleRangeUpdate);
}


var mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mouseover', function(e){mousedown && scrub(e)});
progress.addEventListener('mousedown',function(){return mousedown=true});
progress.addEventListener('mouseup', function(){return mousedown=false});
