import React, { useEffect, useState } from 'react';

const UsersForm = ({ addUser, userSelected, deselectUser, updateUser, usersList }) => {

    /* Declare var useState */
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthDay, setBirthDay] = useState('')

    /* Search */
    const [usersArr, setUsersArr] = useState(null)
    const [userSearch, setUserSearch] = useState("")


    /* Clean Form */
    const cleanForm = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setBirthDay('')

    }

    /* Function Submit  */
    const submit = (e) => {

        e.preventDefault();

        /* Reception form */
        const infoForm = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            birthday: birthDay

        }

        /* Control Create / Update */
        if (userSelected === null) {
            /* Craete */
            addUser(infoForm)
            cleanForm()
        } else {
            /* Update User */
            console.log(userSelected)
            infoForm.id = userSelected.id
            updateUser(infoForm)
            cleanForm()
        }
    }

    /* User Edit data - whehnrender */
    useEffect(() => {

        if (userSelected !== null) {
            setFirstName(userSelected.first_name)
            setLastName(userSelected.last_name)
            setEmail(userSelected.email)
            setBirthDay(userSelected.birthday)
            setPassword(userSelected.password)
        } else {
            cleanForm()
        }

        /* Search Info  */

        setUsersArr(usersList)
    }, [userSelected])

    const searchList = (usersList) => {
        console.log(usersList)

        /* Control  vacio */

        const textSearch = userSearch.toUpperCase()
        if (textSearch === "") {
            return
        }

        /* Control Only Letter */
        const regex = /^[a-zA-Z ]+$/;
        if (regex.test(userSearch)) {

            let arrId = []
            // const textSearch = userSearch.toUpperCase()
            if (textSearch !== "") {
                arrId = usersList.filter((searchInp) => {
                    // arrId = json_users.filter((searchInp) => {
                    console.log(searchInp.first_name + "  " + userSearch)
                    let infoText = `${searchInp.first_name} ${searchInp.last_name}`
                    infoText = infoText.toUpperCase()
                    const val = infoText.search(`${textSearch}`)
                    console.log(val)
                    return val > (-1)
                })
            }
            console.log(arrId)
            return (
                <>
                    {
                        arrId.map((filterInfo) => {
                            console.log(filterInfo.first_name)
                            return <a href={`#${filterInfo.first_name}-${filterInfo.last_name}`} >
                                <div> {filterInfo.first_name} {filterInfo.last_name}</div>
                            </a>
                        })

                    }
                </>
            )
        } else {
            alert("Only Letter !!")
        }
    }

    console.log(userSelected)
    return (

        <div className='form'>
            <form onSubmit={submit} id="id-form" >

                <p className='title'>{userSelected === null ? "New User" : "Edit User"}</p>

                <i className="fa-solid fa-magnifying-glass">
                    <input type="text"
                        value={userSearch}
                        onChange={e => setUserSearch(e.target.value)}
                        className='inp-search'
                        placeholder='Search User'
                    />
                </i>
                <div className='searchRes' onClick={() => setUserSearch("")}>
                    <div className={`result ${userSearch !== "" && "css-shadowd"}`} >
                        {searchList(usersList)}
                    </div>
                </div>
                <div className='row flex'>
                    <div className='user-form'>
                        <div className='icon-form'>
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <label className='lb-none' htmlFor="name" placeholder="Fist Name">Name</label>
                        <input className='input-form ' type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Fist Name" />
                        <label className='lb-none' htmlFor="lastName">Last Name</label>
                        <input className='input-form' type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
                    </div>
                </div >
                <div className='row flex'>
                    <div className='user-form'>
                        <div className='icon-form'>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <label className='lb-none' htmlFor="eamil">Email</label>
                        <input className='input-form' type="eamil" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                </div>
                <div className='row flex'>
                    <div className='user-form'>
                        <div className='icon-form'>
                            <i className="fa-solid fa-key"></i>
                        </div>
                        <label className='lb-none' htmlFor="password">Password</label>
                        <input className='input-form' type="Password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                </div>
                <div className='row flex'>
                    <div className='user-form'>
                        <div className='icon-form'><i className="fa-solid fa-calendar-days"></i></div>
                        <label className='lb-none' htmlFor="birthday">Birthday</label>
                        <input className='input-form'
                            type="date" id="birthday"
                            value={birthDay}
                            onChange={e => setBirthDay(e.target.value)}
                        />
                    </div>
                </div>
                <button className='btn-form edit-blue'  ><i className="fa-solid fa-file-lines"></i>  {userSelected === null ? 'Create' : 'Upload'}</button>
                {
                    userSelected !== null && (
                        <button className='btn-form clean-green' onClick={() => deselectUser()} >
                            <i className="fa-solid fa-arrows-rotate"></i> Clean
                        </button>

                    )
                }
            </form >
        </div >

    );
};

export default UsersForm;