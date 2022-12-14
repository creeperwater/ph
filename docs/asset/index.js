var cache = {};
$('main>aside>p').forEach(ele => {
  ele.onclick=function(){
    $('main>aside>p').forEach((ele2)=>{
      ele2.style=null;
    })
    this.style.backgroundColor='#ddd';
    this.style.color='#000';
    var content = cache[this.textContent];
    if(content){
      render(content);
    }else{get(`https://api.github.com/repos/creeperwater/ph/contents/${this.textContent}`).then((res)=>{
      content=JSON.parse(res);
      render(content);
      cache[this.textContent]=content;
    }).catch((rea)=>{
      $('main>article').innerText=`从左侧列表选择一个分类来浏览\n列表加载失败`;
      console.log(rea);
    })}
  }
});

function render(list){
  var list_con = '';
  for(i of list){
    list_con += `<a href="https://github.com/creeperwater/ph/blob/main/${i.path}">${i.name}</a>`
  }
  $('main>article').innerHTML=list_con;  
}

$('header>input').oninput=function(){if(this.value){
  var list = [];
  for(let i in cache){
    for(let j of cache[i]){
      const loc = j.name.indexOf(this.value);
      if(loc>-1){
        j.index=loc;
        list.push(j);
      }
    }
  }
  if(list.length){
    list.sort((a,b)=>a.index-b.index);
    render(list);
  }else{
    $('main>article').innerText= '没搜着'
  }
}}