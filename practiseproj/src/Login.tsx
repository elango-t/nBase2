import { signInWithEmailAndPassword } from "firebase/auth"
import { useState ,useRef} from "react"
import { auth, db } from "./firebaseConfig"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./authProvider";
import { doc, getDoc } from "firebase/firestore";


const Signin=()=>{
    const [email,setemail]=useState<string>("")
    const [password,setpassword]=useState<string>("")
    const [errors,seterrors]=useState<{email?:string,password?:string}>({})
    const {user}=useAuth()
    const emailref=useRef<HTMLInputElement>(null)
    const passref=useRef<HTMLInputElement>(null)
    const navigate =useNavigate()
  
    async function handleSignin(){
        let newerrors:{email?:string,password?:string}={}
        let firstempty:HTMLInputElement |null=null;
        if(!email){
            newerrors.email="Email field missing"
            firstempty=emailref.current
        }
        if(!password){
            newerrors.password="Password missing"
            if(!firstempty) firstempty=passref.current
        }
   
        seterrors(newerrors)
        if(firstempty){
            firstempty.focus();
            return;
        }

        try{
            await signInWithEmailAndPassword(auth,email,password)
            if(user){
                const role = await getDoc(doc(db, "users", user.uid,"user","userdetails"));
                if(role.data()?.role==="customer"){
                    navigate("/")
                }else{
                    navigate("/admin")
                }

            }  
        }catch(error){
            toast.error(
                <>
                <p>Enter valid credentials</p>
                </>,
                  {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                      backgroundColor: "#1e293b",  
                      color: "#facc15",  
                      fontSize: "16px",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      padding: "10px",
                      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                    },}
            )
            console.log(error); 
        }
        
    }

    return(<>
        <div className=" absolute flex justify-center items-center h-full  w-full rounded-2xl">
            <div className="flex justify-center items-center  bg-amber-200 p-13 flex-col rounded-2xl w-lg gap-8">
                <div className=" flex justify-around items-start gap-10 flex-col w-full"   >
                    <div className="flex gap-2 w-full rounded flex-col">
                        <p className="italic">Email</p>
                        <input ref={emailref} className=" w-full border-2 p-2 rounded-2xl bg-amber-100" type="text" onChange={(e)=>(setemail(e.target.value))} placeholder="Enter Email"></input>
                        {errors.email && <p className="text-red-500 ">{errors.email}</p>}
                    </div>
                    <div className="flex gap-2 w-full rounded flex-col">
                        <p className="italic">Password</p>
                        <input ref={passref} className=" w-full border-2 p-2 rounded-2xl bg-amber-100" type="text" onChange={(e)=>(setpassword(e.target.value))} placeholder="Enter password"/>
                        {errors.password && <p className="text-red-500" >{errors.password}</p>}
                    </div>
             </div>
                <button className=" rounded-2xl bg-amber-800 p-3 text-white" onClick={handleSignin}>Signin</button>
                <p>Dont have an account? <Link to ="/signup">Signup</Link></p>
         </div>
            <ToastContainer/>
        </div>
    </>)
}
export default Signin
