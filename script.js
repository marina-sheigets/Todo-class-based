let todos=[];
const addButton=document.querySelector(".submit"),
      ul=document.querySelector(".todo-list");     

addButton.addEventListener("click",(e)=>{
    e.preventDefault();
   let task=document.querySelector(".todo-input");
   let newTask=task.value;
   if(newTask.trim().length===0){
    alert("Task should not be empty");
    return;
   }
   let todoObj={
    todo:newTask,
    checked:false
   }
   todos.push(todoObj);
   console.log(todos)
   task.value=""
   render();
});


document.addEventListener("change",(e)=>{
  if(e.target.className=="check"){
    let span=e.target.nextSibling;
   span.classList.add("completed")
  }
})

function render(){
   if(todos.length==0){
    ul.innerHTML="There are no any tasks..."
   }
   else{
        ul.innerHTML=""; 
        let content="";
        todos.forEach((item,index)=>{
             content=`
                <li>
                    <input ${item.checked? 'class="completed"' :''}" id="item-${index}" type="checkbox" ${item.checked? "checked='true'" :''}">
                    <label for='item-${index}'>${item.todo}</label>
                    <button class="${index}">&times;</button>
                </li>
            `   
            ul.innerHTML+=content;
        })  
   }
}

ul.addEventListener("change",(e)=>{
    let idCheck=e.target.getAttribute("id");
    let label=ul.querySelector(`[for='${idCheck}']`)
    
    let value=label.textContent;

    todos.forEach((item)=>{
        if(item.todo===value)
        {
            item.checked=!item.checked;
        }
    })

})


ul.addEventListener("click",(e)=>{
    if(e.target.tagName=="BUTTON"){
      let index=+e.target.classList.value;
      todos=todos.filter((_,i)=>i!=index)
     render();
            
    }
})
