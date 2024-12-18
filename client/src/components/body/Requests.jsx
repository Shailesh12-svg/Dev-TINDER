import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests } from '../../utils/requestSlice'
import requests from '../../utils/requestSlice'
const Requests = () => {
    const requests =useSelector(store=>store.requests);
    const dispatch =useDispatch();
    try{
    const getRequest = async()=>{

        const res = await axios.get(BASE_URL+"/user/requests/received",{
            withCredentials:true
        })
        console.log(res.data.connectionRequest);
        dispatch(addRequests(res.data.connectionRequest))
    }
    useEffect(()=>{
        getRequest();
    },[])
}catch(err){
    console.log(err.message)
}
if(!requests)return;

  if(requests.length==0){
    return <h1>No Requests Found</h1>
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-2xl">Requests</h1>

    {requests.map((request)=>{
      const{firstName,lastName,photoUrl,age,gender,about,_id} =request.fromUserId;
    
      return(
        <div key={_id}className="flex items-center gap-4 p-4 m-4 bg-[#F5EDE2] shadow-md rounded-lg">
    
          <div>
          <img alt ="photo" className ='w-20 h-20 rounded-full ' src={photoUrl}/>
          </div>
          <div className="flex flex-col">
           <h2 className="text-xl font-semibold text-primary">{firstName+" "+lastName}</h2>
           <p className="text-sm text-gray-600">{about}</p>
           {age&& <p>{age + " "+gender}</p>}
            </div>
            <div className="card-actions justify-end">
      <button className="btn btn-primary">Accept</button>
      <button className="btn btn-secondary">Reject</button>
    </div>
          </div>
      );
    })}


    </div>
  )
}

export default Requests