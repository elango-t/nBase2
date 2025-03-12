const task=document.querySelector("#task")
const date=document.querySelector("#date")
const time=document.querySelector("#time")
const addbutton=document.querySelector("#add")
const savebutton=document.querySelector("#save")
const list=document.querySelector("#List")

iterate()
addbutton.addEventListener("click",function(){
    let taskvalue=task.value
    let datevalue=date.value
    let timevalue=time.value
    if(!taskvalue || !timevalue || !datevalue){
        alert("please fill all the fields")
        return ;
    }
    const taskobj={
        id:Date.now(),
        task:taskvalue,
        date:datevalue,
        time:timevalue,
        status:"pending"
    }
    
    let tasks=JSON.parse(localStorage.getItem("tasks"))|| []
    tasks.push(taskobj)
    localStorage.setItem("tasks",JSON.stringify(tasks))
    iterate()
})

function addtobrowser(taskobj){
    const row=document.createElement('tr')
    row.setAttribute("taskid",taskobj.id)
    
    row.innerHTML=`
    <td>${taskobj.task}</td>
    <td>${taskobj.date}</td>
    <td>${taskobj.time}</td>
    <td>${taskobj.status}</td>
    <td > <button class="edit">Edit</button></td>
    <td ><button class="delete">Delete</button></td>
    <td> <button class="complete"></button> </td>`
    list.append(row)
    
    row.querySelector(".edit").addEventListener("click",()=>editTask(taskobj.id));
    row.querySelector(".delete").addEventListener("click",()=>deleteTask(taskobj.id));
    row.querySelector(".complete").addEventListener("click",function (){
        completeTask(taskobj.id,this); 
    })
    row.querySelector(".complete").style.backgroundColor=taskobj.status=="pending"?"red":"green"
    row.querySelector(".complete").innerHTML=`${taskobj.status}`
    let time=taskobj.time.toString().split(":")
    console.log(time[0])
    let timeinseconds=parseInt(time[0])*60*60+parseInt(time[1])*60;
    let dateobj=new Date()
    let hours=dateobj.getHours()
    let minutes=dateobj.getMinutes()
    let currentTime=hours*60*60+minutes*60;
    console.log(currentTime,timeinseconds)
    if((timeinseconds-currentTime)>0 && taskobj.status=="pending"){
        setTimeout(function(){
            alert(`The task is scheduledn on ${time}`)
        },(timeinseconds-currentTime)*1000);
    }
    
}

function editTask(taskid){
    const tasks=JSON.parse(localStorage.getItem("tasks"));
    const  task=tasks.find(t=>t.id==taskid)
    if(task){
        task.task=prompt("Enter task name")
        task.date=prompt("Enter new date")
        task.time=prompt("Enter new time")
    }
    if(!task.task || !task.time || !task.date) return ;
    localStorage.setItem("tasks",JSON.stringify(tasks))
    iterate()
}

function deleteTask(taskid){
    let tasks =JSON.parse(localStorage.getItem("tasks"));
    tasks=tasks.filter(t=>t.id!=taskid)
    localStorage.setItem("tasks",JSON.stringify(tasks))
    iterate()
}

function completeTask(taskid,butt){  
    let tasks=JSON.parse(localStorage.getItem("tasks"))
    let task=tasks.find(t=>t.id==taskid)
    if(task.status=="pending"){
        butt.style.backgroundColor="green"
        task.status="completed"
    }else{
        butt.style.backgroundColor="red"
        task.status="pending"
    }
        localStorage.setItem("tasks",JSON.stringify(tasks))
        iterate()
}

function iterate(){
    list.innerHTML=""
    let tasks=JSON.parse(localStorage.getItem("tasks"))
    tasks.forEach(element => {
        addtobrowser(element)
    });
}