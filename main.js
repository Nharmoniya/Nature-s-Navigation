const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
//注意从getItem中拿出x时要加单引号，因为x此时是数组
const x = localStorage.getItem('x')//把变成字符串名为x的hashmap从localStorage中拿出来
const xObject = JSON.parse(x)//将hashmap重新变为对象
//将hashmap等于xObject ||(或者) 等于存入的数组
const hashMap = xObject || [
  {
    logo: "https://developer.mozilla.org/favicon-192x192.png",
    url: "https://developer.mozilla.org/zh-CN/",
    link: "MDN"
  },
  { logo: "src/Caniuse.jpg", 
    url: "https://caniuse.com/",
    link: "Caniuse"
  },
];

const render= ()=>{
  $siteList.find('li:not(.last)').remove()//把之前的li都找到除了最后一个，然后删除
  hashMap.forEach(node => {
    const $li = $(`<li>
    <a href="${node.url}">
      <div class="site">
        <div class="logo"><img src=${node.logo}/></div>
        <div class="link">${node.link}</div>
      </div>
    </a>
  </li>
    `).insertBefore($lastLi);
  });
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
    logo:url[0],
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