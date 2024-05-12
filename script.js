let todoList=[]
let todoname=document.getElementById("name");
let checkedCount=0;
let btn=document.getElementById("addToDo");
let lists=document.getElementById("lists")
btn.addEventListener("click",()=>{
    todoList.push({name:todoname.value,checked:false});
    updateLists();
    updateCheckField();
    todoname.value='';
    
})
function updateLists(){
    lists.innerHTML='';
    for(let todo of todoList){
       //iterating the loop for todoList  and adding the each todo 
       addingElement(todo);
    }
    buttonDisplayCheck();
}
//for removing todo
function removeTodo(todoName){
    let removeIndex=-1;
    let i=0;
    for(let todo of todoList){
       // console.log(todo)
        if(todo["name"]==todoName){
            removeIndex=i; 
           // console.log(removeIndex,todoList[i])
            if(todo.checked){
                checkedCount--;
            }           
        }
        i++;
        
    }
    todoList.splice(removeIndex,1)
   // console.log(checkedCount,todoList.length)
    updateCheckField();
    updateLists();
}
let complete_task=document.getElementById("checkAll");
complete_task.addEventListener("click",()=>{
    for(let todo of todoList){
        todo.checked=true;
    }
    checkedCount=todoList.length;
    updateCheckField();
    updateLists();
})
let clear_list=document.getElementById("updateList");
clear_list.addEventListener("click",()=>{
    let new_todoList=[]
    for(let todo of todoList){
        if(todo.checked){
            continue;
        }
        new_todoList.push(todo);
    }
    todoList=new_todoList;
    checkedCount=0;
    updateCheckField();
    updateLists();
})
let checkedField=document.getElementById("chekedField");
function updateCheckField(){
    checkedField.textContent=todoList.length-checkedCount +" tasks left";
}
updateCheckField();
let all=document.getElementById("all");
all.addEventListener("click",function(){
    updateLists();
})
let completed=document.getElementById("completed")
completed.addEventListener("click",function(){
    lists.innerHTML=''
    for(let todo of todoList){
        if(todo.checked){
            addingElement(todo);
        }
    }
})
let notCompleted=document.getElementById("NotCompleted")
notCompleted.addEventListener("click",function(){
    lists.innerHTML=''
    for(let todo of todoList){
        if(!todo.checked){
            addingElement(todo);
        }
    }
})
function addingElement(todo){
    let li_ele=document.createElement("li")
        li_ele.type='none'
        let radio_btn=document.createElement("input")
        radio_btn.type='checkbox';
        radio_btn.checked=todo.checked;
        li_ele.appendChild(radio_btn);
       let p_ele=document.createElement("p")
       p_ele.textContent=todo.name;
       if(todo.checked){
        p_ele.classList.add("checked");  
       }
       radio_btn.addEventListener("change",()=>{
        console.log(radio_btn.checked)
        if(radio_btn.checked){
            checkedCount++;
            updateCheckField();
            todo.checked=true;
           p_ele.classList.add("checked");
           //console.log(p_ele.classList)
        }
        else{
            todo.checked=false;
            checkedCount--;
            updateCheckField();
            p_ele.classList.remove("checked")
        }
       })
       li_ele.appendChild(p_ele);
       btn_ele=document.createElement("button");
       btn_ele.textContent='X'
       btn_ele.classList.add("sideButton")
       btn_ele.style.display='none'
    //    btn_ele.addEventListener("click",function(){
    //     if(radio_btn.checked){
    //          checkedCount--;
    //     }
    //     removeTodo(todo)
    //    })
       li_ele.appendChild(btn_ele)
       
       lists.appendChild(li_ele)
      
}

function buttonDisplayCheck(){
    let btn_elements=document.getElementsByClassName("sideButton")
    //console.log("btn_ele"+btn_elements.length)
    for(let btn of btn_elements){
        //console.log(btn.parentElement)
        btn.parentElement.addEventListener("mouseenter",function(){
            btn.style.display='inline';
        })
        btn.parentElement.addEventListener("mouseleave",function(){
            btn.style.display='none';
        })
        btn.addEventListener("click",()=>{
            console.log(btn.parentElement.childNodes[1].innerHTML);
            removeTodo(btn.parentElement.childNodes[1].innerHTML);
            
        })
    }
}


