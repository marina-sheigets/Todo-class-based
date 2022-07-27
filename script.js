class TodoItem{
    
   createTodo(text){
        return {
            id:Date.now(),
            text:text,
            checked:false,
        }
    }
    createTodoLI(elem){
        let li=document.createElement("li");

        //inner content
        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
      
        checkbox.dataset.id=elem.id;
        let label=document.createElement("label");
        label.textContent=elem.text;
        if(elem.checked){
            checkbox.checked="true";
            label.classList.add("completed");
        }else{
            label.classList.remove("completed");
        }
        label.setAttribute("for",elem.id);
        let deleteButton=document.createElement("button");
        deleteButton.dataset.id=elem.id;
        deleteButton.innerHTML="&times;";

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(deleteButton);
        return li;
    }
}

class TodoApp{
    todos=JSON.parse(localStorage.getItem('todos'))|| [];

    renderDOM(){
        const container=document.querySelector("#app");
        //h1
        let h1=document.createElement("h1");
        h1.classList.add("main-h1");
        h1.textContent="ToDo List";
        //form
        let div=document.createElement("div");
        div.classList.add("todo-form");
        //input
        let input=document.createElement("input");
        input.type="text";
        input.placeholder="Enter todo task";
        input.classList.add("todo-input");
        //button
        let button=document.createElement("button");
        button.classList.add("submit");
        button.textContent="Add";
        button.setAttribute("onclick","todoApp.addTodo()")
        //ul
        let ul=document.createElement("ul");
        ul.classList.add("todo-list");
        ul.innerHTML="<li>Buy bread</li>"


        div.appendChild(input);
        div.appendChild(button);

        
        container.classList.add("container");
        container.appendChild(h1);
        container.appendChild(div);
        container.appendChild(ul);

        this.renderTodos();
    }

    renderTodos(){
        const ul=document.querySelector(".todo-list");
        if(this.todos.length===0){
            ul.innerHTML="No any todos..."
        }else{
            ul.innerHTML="";
            let todoItem=new TodoItem;
            this.todos.forEach((elem)=>{
                ul.appendChild(todoItem.createTodoLI(elem));
            })

        }
    }

    showConsole(){
        console.log("work")
        return false;
    }

    addTodo(){
        const todoInput=document.querySelector(".todo-input");
        const value=todoInput.value;
        todoInput.value="";
        if(value.trim().length===0){
            alert("Error! You entered the empty value.")
            return;
        }

        let todoItem=new TodoItem();
        console.log(todoItem)
        let newItem=todoItem.createTodo(value)
        this.todos.push(newItem);
        this.saveinLocalStorage();
        this.renderTodos();
    }

    deleteTodoItem(button){
        let i=+button.getAttribute("data-id")
        this.todos=this.todos.filter(elem=>elem.id!=i);
        this.saveinLocalStorage();
        this.renderTodos();
    }   

    changeStatus(checkbox){
        let idCheck=+checkbox.getAttribute("data-id");
        

        this.todos=this.todos.map((item)=>{
            if(item.id===idCheck)
            {
                return{
                    ...item,
                    checked:!item.checked,
                }
            }
            return item;
        })
        this.saveinLocalStorage();
        this.renderTodos();
    }

    saveinLocalStorage(){
        localStorage.setItem("todos",JSON.stringify(this.todos));
    }
}
    


let todoApp=new TodoApp;

document.addEventListener("DOMContentLoaded",()=>{
    todoApp.renderDOM();

    let ul=document.querySelector(".todo-list");
    ul.addEventListener("click",(e)=>{
       if(e.target.tagName=="BUTTON"){
        todoApp.deleteTodoItem(e.target);
       }
    }) 
    
   
    ul.addEventListener("change",(e)=>{
       if(e.target.tagName=="INPUT"){
        todoApp.changeStatus(e.target);
       }
    })  
})