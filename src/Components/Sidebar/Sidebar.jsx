import { useState, Fragment }                                         from "react";
import { useDispatch ,useSelector }                                   from "react-redux";
import { updateUser ,logout, userData}                                from "../../Features/userSlice";
import                                                                './Sidebar.scss';

const Sidebar = () => {
    const userInfo                        = useSelector(userData);
    const dispatch                        = useDispatch();
    const [showProfile, setShowProfile]   = useState(false);
    const [showData, setShowData] =useState(true)
    const [userDetails, setUserDetails] = useState({
        name: userInfo.user_name,
        surname: userInfo.user_surname,
        email: userInfo.user_email,
        password:""
    })
    
    const updateUserData = (data) => {
        setUserDetails({...userDetails, [data.target.name]: data.target.value})
    }

    const updateUserInfo = () => {
        dispatch(updateUser(userInfo,userDetails))
    }


    return(
        <Fragment>
            <div className='user-info-name' onClick={() => {setShowProfile(!showProfile); setShowData(true)}}>{userInfo.user_name} {userInfo.user_surname}</div>
            {showProfile && (
                showData ? (
                <div onClick={() => setShowData(!showData)} className="profile-design">
                   <div>{userInfo.user_name}</div>
                   <div>{userInfo.user_surname}</div>
                   <div>{userInfo.user_email}</div>
                </div>
                ):(
                    <div className="profile-design">
                        <div className="inputs-profile-design">
                            <label htmlFor="name">Nome</label>
                        <input type="text" name='name' title='name' onChange={updateUserData} />

                            <label htmlFor="surname">Cognome</label>
                        <input type="text" name='surname' title='surname' onChange={updateUserData} />
                            <label htmlFor="surname">indirizzo email</label>
                        <input type="text" name='surname' title='surname' onChange={updateUserData} />

                            {/* <label htmlFor="email">Email</label>
                        <input type="email" name='email' title='email'onChange={updateUserData} /> */}

                            <label htmlFor="password">Password</label>
                        <input type="password" name='password' title='password'onChange={updateUserData} />

                        </div>
                        <button onClick={() => updateUserInfo()}>Save</button>
                    </div>
                )
            )}
            <div className="headerButton" onClick={() => dispatch(logout())}>Logout</div>
        </Fragment>
    )
}

export default Sidebar;