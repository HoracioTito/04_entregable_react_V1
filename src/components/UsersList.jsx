
import React, { useEffect, useState } from 'react';

const UsersList = ({ usersList, userSelect, userDelete}) => {

  /* Images no usado */
  // const [img1, setImg1] = useState("https://picsum.photos/100")

  /* Change phrase , function */
  const changeImg = () => {

    let rndInd = Math.floor(Math.random() * 100)
   // Img1(`https://picsum.photos/100?${rndInd}`)
    return  `https://picsum.photos/100?${rndInd}`

  }

    return (
        <>
            {usersList.map((user) => (
                
                
                <div className='card' key={user.id} id={`${user.first_name}-${user.last_name}`} >
                    <h3> 
                          <span onClick={()=> {document.documentElement.scrollTop = 0;} }>
                            <i className="fa-solid fa-circle-chevron-up"></i>{"  "}Information User
                          </span>
                           
                    </h3>
                    <div className='info-user'>
                        <p>{user.first_name} {user.last_name}</p>
                        <p>{user.email}</p>
                        <p>{user.birthday}</p>
                    </div>
                    <div className='btn-actions'>
                        <div className='div-avatar' ><img className='avatar'src={ changeImg()} /></div>
                        <button onClick={() => userSelect(user)} className='btn edit-blue' >
                            <i className="fa-solid fa-marker"></i>  Edit
                        </button>
                        <button onClick={() => userDelete(user.id)} className='btn delete-red' >
                            <i className="fa-solid fa-trash-can"></i>  Delete
                        </button>
                    </div>
                </div>

            )
            )}
        </>
    );
};

export default UsersList;