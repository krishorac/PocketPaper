var data = async (type)=>{
  var response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${type}.json`,{
    params:{
      "api-key":"JUB5zBXgwNYd0sjtCZu2qFLNpKbkQ4vb",

    }
  });
 console.log(response.data);
  return response.data;
}

var onHover = async function(type,count){

  var content = await data(`${type}`);
  var info = document.querySelector(`#${type}`);

  if(count===0){
   var div = document.createElement("div");
   info.appendChild(div);
   div.classList.add("innerdiv");
 }else{
  var div = document.querySelector(`#${type} div`);
 }

  // div.innerHTML=`<p>sdkjfhdkj ${count}</p>`;
  div.innerHTML =`<img src="${content.results[count].multimedia[0].url}"/>
                  <p>${content.results[count].abstract}</p>
                  <p><a href="${content.results[count].short_url}">More...</a></p>
                  `;
}

// var arts = document.querySelector("#arts");
//
// if(arts){
// arts.addEventListener("click",async function(){
//  console.log(this.id);
//   var content = await data("arts");
//   document.body.innerHTML =`<p>${content.results[0].abstract}</p>`;
// }
// );
// }
var gridItem = document.querySelectorAll(".grid-item");
var count =0;
for(ele of gridItem){
  onHover(ele.id,count);


}

setInterval(function(){
  count = count+1;

  for(ele of gridItem){

    onHover(ele.id,count);


  }
},60*5000);
