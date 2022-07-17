import { useState } from 'react'
import './css/style.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import { useEffect } from 'react'
import axios from "axios";


function App() {

  /* Declare var usteSate */
  const [usersList, setUsersList] = useState([])
  const [userSelected, setUserSelected] = useState(null)

  /* Get List Users -  One render*/
  useEffect(() => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => {
        setUsersList(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  /* Add User */
  const addUser = (infoForm) => {

    console.log(infoForm)
    axios.post(`https://users-crud1.herokuapp.com/users/`, infoForm)
      .then(() => getUsers())
      .catch(error => console.log(error))

  }

  /* Get Users */

  const getUsers = () => {
    axios.get(`https://users-crud1.herokuapp.com/users/`)
      .then((res) => {
        /* List User */
        setUsersList(res.data)
        /* Avatar */
        // changeImg()
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }

  /* User Selected */
  const userSelect = (user) => {
    console.log(user)
    setUserSelected(user)
    /* Scroll Top */
    document.documentElement.scrollTop = 0;
  }

  /* Update */
  const updateUser = (infoForm) => {

    console.log(infoForm)
    axios.put(`https://users-crud1.herokuapp.com/users/${infoForm.id}/`, infoForm)
      .then(() => {
        /* Get Users */
        getUsers()
        /* Clean userSelected to null */
        setUserSelected(null)
      })

  }

  /* Clean Form - Descart edit */
  const deselectUser = () => {
    setUserSelected(null)
  }

  /* User Delete  */
  const userDelete = (id) => {

    var proceed = confirm("Are you sure you want Delete User ")

    if (proceed) {
      /* Delet uset*/
      axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
        .then(() => {
          /* Get Users */
          getUsers()
        })
        .catch(error => console.log(error))
    }
  }


  return (
    <div className='page-content'>

      <div className={`banner `} >
        <h1> Dashboards User</h1>
      </div>
      <div className="content">

        {/* Form  */}
        <UsersForm userSelected={userSelected} deselectUser={deselectUser} addUser={addUser} updateUser={updateUser} usersList={usersList} />
      </div>
      <div className="content">
        <div className='users-content'>
          {/* User List  */}
          <UsersList usersList={usersList} userSelect={userSelect} userDelete={userDelete} />
        </div>
      </div>
      <div className="footer-color ">
        <div>
          <h2>Api Users</h2>
          <h4>Horacio Choque</h4>
          <h5>Hecho en Academlo</h5>
          <br />
        </div>
      </div>
    </div>
  )
}

export default App
