var data = async (type) => {
  var response = await axios.get(`https://api.nytimes.com/svc/topstories/v2/${type}.json`, {
    params: {
      "api-key": "JUB5zBXgwNYd0sjtCZu2qFLNpKbkQ4vb",

    }
  });
  console.log(response.data);
  return response.data;
}




var onHover = async function(type, count) {

  var content = await data(`${type}`);
  var info = document.querySelector(`#${type}`);

  if (count === 0) {
    var div = document.createElement("div");
    info.appendChild(div);
    div.classList.add("innerdiv");

  } else {
    var div = document.querySelector(`#${type} div`);
  }


  div.innerHTML = `<img src="${content.results[count].multimedia[0].url}"/>
                  <p>${content.results[count].abstract}</p>
                  <p><a href="${content.results[count].short_url}">More...</a></p>
                  `;
}


var gridItem = document.querySelectorAll(".grid-item");
var count = 0;
for (ele of gridItem) {
  console.log(ele);
  onHover(ele.id, count);


}

setInterval(function() {
  count = count + 1;

  for (ele of gridItem) {

    onHover(ele.id, count);


  }
}, 60 * 5000);

//searching


var input = document.querySelector("input");
var dropdown = document.querySelector(".dropdown");
var root = document.querySelector(".dropdown123");

var searchData = async(query)=>{
    var response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`,{
      params:{
        q:`${query}`,
        fq:"headline",
        "api-key": "JUB5zBXgwNYd0sjtCZu2qFLNpKbkQ4vb"
      }
    });
    return response.data;
}



let timerId;
 const onInput = (event)=>{
   if(timerId){
     clearTimeout(timerId);
   }
   timerId = setTimeout( async function(){
     var results = await searchData(event.target.value);
     console.log(results);
    var result = results.response.docs;
    dropdown.classList.remove("not-active");
    dropdown.innerHTML = '';
    for(let i=0;i<10;i++){
     var option =document.createElement("a");
     option.href=`${result[i].web_url}`;
     // var imageSrc = result[i].multimedia[20].url ;

     option.innerHTML=`

       <p>${result[i].headline.main}</p>
     `;
     option.classList.add("dropdown-content");
      var dropdownItem =document.createElement("div");
     dropdownItem.classList.add("dropdown-item");
     dropdown.appendChild(dropdownItem);
     dropdownItem.appendChild(option);
   }//end of for loop
 },1000);
 }

 document.addEventListener("click",function(event){
   console.log(event.target);
    if(!root.contains(event.target)){
      console.log("not contained");
      dropdown.classList.add("not-active");
    }
 });




 input.addEventListener("input",onInput);
