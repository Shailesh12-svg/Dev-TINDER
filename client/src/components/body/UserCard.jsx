import React from 'react'

const UserCard = ({user}) => {
    const{firstName,lastName,photoUrl,gender,age,about} =user
  return (
  
    <div className="card bg-base-400 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="User photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {gender&&age(<p>{gender +" "+age}</p>)}
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )

}

export default UserCard