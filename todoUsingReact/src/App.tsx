import { useState, useEffect } from "react";
import Task from "./Task";


const App = () => {
  const [task, settask] = useState("");
  const [Description, setDescription] = useState("");
  const [time, settime] = useState("");
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
  
  const addTasks = () => {
    if (task && Description && time) {
      settasks(prevTasks => [...prevTasks, { task, Description, time, status: "Pending" }]);
      settask("");
      setDescription("");
      settime("");
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
  

  return (
    <><div className="h-screen overflow-auto">
      <h1 className="text-5xl font-bold text-center p-15">Todo App</h1>                           
      <div className="flex justify-around items-center flex-col gap-4">
        <div className="p-10 bg-gray-200 border-1 rounded-xl flex justify-around items-center gap-4">
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="text" value={task} placeholder="Enter task" onChange={(e) => settask(e.target.value)} />
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="text" value={Description} placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="time" value={time} placeholder="Enter time" onChange={(e) => settime(e.target.value)} />
        <button className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" onClick={addTasks}>Add task</button>

        </div>
        <div className="flex justify-between p-30 gap-40">
          {tasks.length === 0 ? (
            <h1 className="text-5xl font-bold text-center p-15 text-red-400">No tasks</h1>
          ) : (
            tasks.map((task, index) => (
             <Task task={task} key={index} markAsComplete={markAsComplete} deleteTask={deleteTask} editTask={editTask} index={index} />
            )))}
                    </div>
                  </div></div>
                </>
  );
};

export default App;
