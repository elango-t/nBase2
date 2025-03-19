
interface TaskProps {
    task:{task:String,Description:String,time:String,status:String},
    index:number,
    deleteTask:(index:number)=>void,
    editTask:(index:number)=>void,
    markAsComplete:(index:number)=>void
    }

const Task:React.FC<TaskProps>=(props:any)=> {
        const task=props.task;
        const index=props.index;
        const deleteTask=props.deleteTask;
        const editTask=props.editTask;
        const markAsComplete=props.markAsComplete;

    return (
        <>
        <div className="h-fit  bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-3 w-80 border border-gray-300" key={index}>
        <h3 className="text-lg font-bold text-gray-900">{task.task}</h3>
        <h3 className="text-lg font-bold  text-gray-900">{task.Description}</h3>
        <h3 className="text-lg font-bold text-gray-900">{task.time}</h3>
        <h3 className={`text-lg font-semibold px-3 py-1 rounded-md ${task.status === "Pending" ? "bg-red-200 text-red-700" : "bg-green-200 text-green-700"}`}>
          {task.status}
        </h3>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
            onClick={() => markAsComplete(index)}
          >Complete</button>
          <button 
            className="px-3 py-1 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition" onClick={() => editTask(index)}>Edit</button>
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
            onClick={() => deleteTask(index)}
          >Delete</button>
        </div>
      </div>
        </>
    )
}
export default Task;