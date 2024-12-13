import { useState } from "react"
import axios from 'axios'
import {useDispatch} from 'react-redux'
import { addUser } from "../../utils/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../utils/constants"


const Login = () => {

  //React hooks state variable

  const[emailId,setEmailId] =useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
//Handle login requests

const handleLogin =async()=>{
  try{
  const res = await axios.post(BASE_URL+"/login",{
    emailId,
    password,
    
  },{
    withCredentials:true
  })
  dispatch(addUser(res.data))
  navigate('/')
  
  }catch(err){
    setError(err?.response?.data||"Something went wrong..")
    console.log("Invalid Credentials",err.message)
  }

}

  return (
    <div className="flex justify-center my-10">
    <div className="card bg-accent-400 w-96 shadow-xl">
  <div className="card-body">
    <h1 className="card-title justify-center">Login Page</h1>
    <div>
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email ID</span>
  </div>
  <input 
  type="text" 
  value={emailId}  
  className="input input-bordered w-full max-w-xs"
  onChange={(e)=>setEmailId(e.target.value)}
  />
</label>
<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input 
  type="text" 
  value={password} 
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setPassword(e.target.value)}
  />
</label>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button 
      className="btn btn-primary"
      onClick={handleLogin}
      >Login</button>
    </div>
  </div>
</div>
</div>
  )
}

export default Login