
// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const quote = document.getElementById("quote");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//Variables
let LIST,id,quotes,num=0;

quotes = ["Because of your smile, you make life more beautiful",
          "There is only one happiness in this life, to love and be loved",
          "Do it with passion or not at all",
          "Dream without fear. Love without limits",
          "Badi bolchas tah",
          "Get Shit Done"]

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if(data){
    LIST=JSON.parse(data);
    id= LIST.length; //set the id to the lastone in the list
    loadList(LIST); //load the list to the user interface
}else{
    // if data is empty
    LIST = [];
    id = 0;
    num=0;
   
}
//load items to the user's interface
function loadList(array){
    array.forEach((item)=>{

          addToDo(item.name,item.id, item.done,item.trash);
    });
}
//clear the local storage
clear.addEventListener("click",()=>{
  localStorage.clear();
  location.reload();
})


//Show todays date

const options = {weekday: "long", month:"short",day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",options);

quote.innerHTML = quotes[num].toLocaleString(); 


function addToDo(toDo,id,done,trash){
  if(trash){return;}

  const DONE = done? CHECK: UNCHECK;
  const LINE = done? LINE_THROUGH: "";

  const item= `<li class="item">
                <i class="fa ${DONE} co" job="complete" id = "${id}"></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id = "${id}"></i>
                </li>
              `;

    const position = "beforeend";

    list.insertAdjacentHTML(position,item);
}

//add an item to list user the enetery key
document.addEventListener("keyup",function(event){
  if(event.keyCode == 13){
    const toDo = input.value;
    
    //if the input isn't empty
    if(toDo){
      addToDo(toDo,id,false,false);
    

        //pushing the data to list
        LIST.push({
          name: toDo,
          id:id,
          done:false,
          trash:false
        })
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;

        //quotes presents to the container and it will change every time 
        quote.innerHTML = quotes[++num].toLocaleString();  
        
        if(num==5){
          num=0;
        }
        
      }
      input.value="";
      }
    });


    //complete to do 
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false:true;
}
      

//remove to do 
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash=true;
}

//target the items created dynamically

list.addEventListener("click",(event)=>{
  const element = event.target; //return the clicked element inside the list
  const elementJob = element.attributes.job.value; //complete or delete

  if(elementJob == "complete"){
        completeToDo(element);
  }else if(elementJob == "delete"){
        removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

