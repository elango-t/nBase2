import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth"
import { useState ,useRef} from "react"
import { auth, db } from "./firebaseConfig"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";


const Signup=()=>{
    const [email,setemail]=useState<string>("")
    const [password,setpassword]=useState<string>("")
    const [reentered,setreentered]=useState<string>("")
    const [errors,seterrors]=useState<{email?:string,password?:string,reentered?:string}>({})
    const Navigate=useNavigate()
    const emailref=useRef<HTMLInputElement>(null)
    const passref=useRef<HTMLInputElement>(null)
    const reenteredref=useRef<HTMLInputElement>(null)


    async function handlesignup(){
        let newerrors:{email?:string,password?:string,reentered?:string}={}
        let firstempty:HTMLInputElement |null=null;
        if(!email){
            newerrors.email="Email field missing"
            firstempty=emailref.current
        }
        if(!password){
            newerrors.password="Password missing"
            if(!firstempty) firstempty=passref.current
        }
        if(!reentered){
            newerrors.reentered="Reenter password missing"
            if(!firstempty) firstempty=reenteredref.current;
        }
        else if(password!==reentered){
            newerrors.reentered="passwords didnt match"
            if(!firstempty) firstempty=reenteredref.current;
        }

        seterrors(newerrors)
        if(firstempty){
            firstempty.focus();
            return;
        }

        try{
            const methods = await fetchSignInMethodsForEmail(auth, email);
            if (methods.length > 0) {
              throw new Error("This email is already registered. Please log in.");
            }
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db,"users",userCredential?.user.uid,"user","userdetails"),{
                email:userCredential.user.email,
                role:"customer"
            })  
            console.log("User signed up:", userCredential.user);
            Navigate("/")
            
        }catch(error){
            console.log(error); 
        }
        
    }

    return(<>
        <div className=" absolute flex justify-center items-center h-full  w-full rounded-2xl">
            <div className="flex justify-center items-center  bg-amber-200 p-15 flex-col rounded-2xl w-xl gap-10">
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
                    <div className="flex gap-2 w-full rounded flex-col">
                        <p className="italic"> Re-Enter password</p>
                        <input ref={reenteredref} className=" w-full border-2 p-2 rounded-2xl bg-amber-100" type="text" onChange={(e)=>(setreentered(e.target.value))} placeholder="Re-Enter password" />
                        {errors.reentered && <p className="text-red-500">{errors.reentered}</p>}
                    </div>
             </div>
                <button className=" rounded-2xl bg-amber-800 p-3 text-white" onClick={handlesignup}>Signup</button>
         </div>
        </div>
    </>)
}
export default Signup