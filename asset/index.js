
$('main>aside>p').forEach(ele => {
  ele.onclick=function(){
    get(`https://api.github.com/repos/creeperwater/ph/contents/${this.textContent}`).then((res)=>{
      const list = JSON.parse(res);
      let list_con = '';
      for(i of list){
        list_con += `<a href="${i.path}">${i.name}</a>`
      }
      $('main>article').innerHTML=list_con;
    }).catch(()=>{
      $('main>article').innerText=`从左侧列表选择一个分类来浏览\n列表加载失败`;
    })
  }
});