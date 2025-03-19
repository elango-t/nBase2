import {useState} from 'react';

const Input=(props:any)=>{
    const [task,setTask]=useState("");
    const [Description,setDescription]=useState("");
    const [time,setTime]=useState("");
    return(
        <>
        <div className="p-10 bg-gray-200 border-1 rounded-xl flex justify-around items-center gap-4">
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="text" value={task} placeholder="Enter task" onChange={(e) => setTask(e.target.value)} />
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="text" value={Description} placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} />
        <input className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" type="time" value={time} placeholder="Enter time" onChange={(e) => setTime(e.target.value)} />
        <button className="p-2 border-2 rounded-2xl text-center hover:bg-gray-400 text-lg font-bold text-gray-700" onClick={()=>props.addTasks(task,Description,time)}>Add task</button>

        </div>
        </>
    )

}
export default Input;