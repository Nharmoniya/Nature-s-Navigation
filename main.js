$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是啥？");
  let urlName = window.prompt("请问你要添加的网址名称");
  console.log(url);
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }
  console.log(url);
  const $siteList = $(".siteList");
  const $lastLi = $siteList.find("li.last");
  const $li = $(`<li>
  <a href="${url}">
            <div class="site">
              <div class="logo">${url[0]}</div>
              <div class="link">${urlName}</div>
            </div>
          </a>
  </li>`).insertBefore($lastLi);
});
