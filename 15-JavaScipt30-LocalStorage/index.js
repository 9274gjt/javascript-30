const addItems =  document.querySelector('.add-items');
const itemsList= document.querySelector('.plates');
//将JSON字符串转换成JSON对象(JSON.parse)，因为localStorage以字符串存储
var items = JSON.parse(localStorage.getItem('items'))||[];


//重新构造addItem方法
function addItem(e){
	e.preventDefault();
	//获取输入内容
	const text = this.querySelector('[name=item]').value;
	// console.log(text);
	const item = {
		text:text,
		done:false
	}
	items.push(item);//塞进数组
	this.reset();
	populateList(items,itemsList);
	//JSON.stringify将ＪＳＯＮ对象转成字符串
	localStorage.setItem('items',JSON.stringify(items));

}


//添加ＨＴＭＬ元素
function populateList(plates = [],plateslist){
  //map方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
  //join方法把数组中的所有元素转换为一个字符串：
  plateslist.innerHTML = plates.map(
    function(plate,i){
      var checked=plate.done ? 'checked':'';
      var string= '<li><input type="checkbox" data-index='+i+' '+'id="item'+i+'"'+' '+checked+'>'+'<label for="item'+i+'">'+plate.text+'</label></li>';
      // console.log(string);
      return string;
    }).join('');
}


function toggleDone(e){
	if(!e.target.matches('input'))return;
	const el=e.target;
	const index=el.dataset.index;
	items[index].done=!items[index].done;
	populateList(items,itemsList);
	localStorage.setItem('items',JSON.stringify(items));
}
  addItems.addEventListener('submit', addItem);
  itemsList.addEventListener('click', toggleDone);
  populateList(items, itemsList);

    
  // 延伸部分
  const checkAllBtn = document.querySelector('.check-all');
  const unCheckAllBtn = document.querySelector('.uncheck-all');
  const deleteAllBtn = document.querySelector('.delete-all');
  
  checkAllBtn.addEventListener('click', () => {
  	items.forEach(item => {
  		item.done = true;	  
  	});
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
  });  
	
  unCheckAllBtn.addEventListener('click', () => {
  	items.forEach(item => {
  		item.done = false;
  	});
  	populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
  });  
	
  deleteAllBtn.addEventListener('click', () => {
  	items = [];
  	populateList(items, itemsList);
   	localStorage.setItem('items', JSON.stringify(items));
  });