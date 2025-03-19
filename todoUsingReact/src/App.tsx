import { useState, useEffect } from "react";
import Input from "./Input";
import Task from "./Task";


const App = () => {
  const [tasks, settasks] = useState<{ task: string; Description: string; time: string; status: string }[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      settasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    if(tasks.length != 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);  


  useEffect(() => {
    tasks.forEach((taskobj) => {
      if (taskobj.status === "Pending") {
        let time = taskobj.time.toString().split(":");
        let timeInSeconds = parseInt(time[0]) * 60 * 60 + parseInt(time[1]) * 60;
        let dateobj = new Date();
        let currentTimeInSeconds = dateobj.getHours() * 60 * 60 + dateobj.getMinutes() * 60;
        let timeDifference = timeInSeconds - currentTimeInSeconds;
        if (timeDifference > 0) {
          setTimeout(() => {
            alert(`The task "${taskobj.task}"  at ${taskobj.time}`);
          }, timeDifference * 1000);
        }
      }
    });
  }, [tasks]);

  
  const addTasks = (task:string,Description:string,time:string) => {
    if (task && Description && time) {
      settasks(prevTasks => [...prevTasks, { task, Description, time, status: "Pending" }]);
      
    } else {
      alert("Please enter all the fields");
    }
  };

  const markAsComplete = (index: number) => {
    settasks(prevTasks =>
      prevTasks.map((t, i) =>
        i === index ? { ...t, status: t.status === "Pending" ? "Completed" : "Completed" } : t
      )
    );
  };

  const deleteTask = (index: number) => {
    settasks(prevTasks => prevTasks.filter((_, i) => i !== index));
  };

  const editTask = (index: number) => {
    const newTask = prompt("Enter new task");
    const newDescription = prompt("Enter new Description");
    const newTime = prompt("Enter new time");
  
    if (newTask && newDescription && newTime) {
      settasks(prevTasks =>
        prevTasks.map((t, i) =>
          i === index
            ? { ...t, task: newTask, Description: newDescription, time: newTime }
            : t
        )
      );
    }
  };
  const [count, setcount] = useState(0);
  const handleincrement = () => {
    setTimeout(()=>{
      setcount((count)=>count + 1);
    },2000)
  }

  return (
    <>
      <div className="h-screen overflow-auto">
        <h1 className="text-5xl font-bold text-center p-15">Todo App</h1>                           
        <div className="flex items-center flex-col gap-4">
          <Input addTasks={addTasks} />
            <div className="flex justify-center flex-wrap p-30 gap-40">
              {tasks.length === 0 ? (
                <h1 className="text-5xl font-bold text-center p-15 text-red-400">No tasks</h1>) : (
                tasks.map((task, index) => (
                <Task task={task} key={index} markAsComplete={markAsComplete} deleteTask={deleteTask} editTask={editTask} index={index} />
                  )))}
            </div>
        </div>
        <div className="flex justify-center gap-10 p-10">
        <button className="border-2 bg-amber-300 p-2" onClick={(()=>handleincrement())}>increment</button>
        <h1>{count}</h1>
        </div>
      </div>
    </>
  );
};

export default App;
