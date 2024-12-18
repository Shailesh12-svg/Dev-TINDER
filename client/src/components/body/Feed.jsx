import axios from "axios"
import { BASE_URL } from "../../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();
  const feed =useSelector((store)=>store.feed)
  const getFeed = async()=>{
  if(feed)return;
    try{

      const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true,})
      dispatch(addFeed(res.data))
      
    }catch(err){
      return res.status(400).json({message:"Oops something went wrong.."})
    }
  }

  useEffect(()=>{
    getFeed();
  },[])



  return (
    feed&&(
    <div className="flex justify-center  my-10">
      <UserCard user={feed[0]}/>
    </div>
    )
  )
}

export default Feed;