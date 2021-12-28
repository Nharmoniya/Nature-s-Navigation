const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
//注意从getItem中拿出x时要加单引号，因为x此时是数组
const x = localStorage.getItem('x')//把变成字符串名为x的hashmap从localStorage中拿出来
const xObject = JSON.parse(x)//将hashmap重新变为对象
//将hashmap等于xObject ||(或者) 等于存入的数组
const hashMap = xObject || [
  {
    
    url: "https://developer.mozilla.org/zh-CN/",
    link: "MDN"
  },
  { 
    url: "https://caniuse.com/",
    link: "Caniuse"
  },
];

const render= ()=>{
  $siteList.find('li:not(.last)').remove()//把之前的li都找到除了最后一个，然后删除
  hashMap.forEach((node,index) => {
    const $li = $(`<li>
      <div class="site">
        <div class="logo">${node.link[0]}</div>
        <div class="link">${node.link}</div>
        <div class="close">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-add"></use>
        </svg>
      </div>
      </div>
  </li>`).insertBefore($lastLi);
  $li.on('click',()=>{
    window.open(node.url)
  })
  $li.on('click','.close',(e)=>{
    e.stopPropagation();//为了阻止点击X跳转，阻止冒泡
    hashMap.splice(index, 1)
    render();
  })
  })
}
//调用render
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  let urlName = window.prompt("请问你要添加的网址名称");
  console.log(url);
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    url:url,
    link:urlName,
    logoType:'text',
  })
  //调用render
   render();
});

//监听用户关闭浏览器的API
window.onbeforeunload = ()=>{
  const string = JSON.stringify(hashMap)//把对象变成字符串
  localStorage.setItem('x',string)//把变成字符串的hashmap存入localStorage中名为x
}

//监听键盘
$(document).on('keypress', (e) => {
  const key =e.key
  console.log(key)
  for(let i=0;i<hashMap.length;i++){
    if(hashMap[i].link[0].toLowerCase() === key){
      window.open(hashMap[i].url)
    }
  }
})