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
    
    console.log(userDetails)
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
                        <input type="text" name='name' title='name' placeholder='Escribe tu nombre' onChange={updateUserData} />
                        <input type="text" name='surname' title='surname' placeholder='Escribe tu apellido' onChange={updateUserData} />
                        <input type="email" name='email' title='email' placeholder='Escribe tu email' onChange={updateUserData} />
                        <input type="password" name='password' title='password' placeholder='Escribe tu email' onChange={updateUserData} />
                        <button onClick={() => updateUserInfo()}>Save</button>
                    </div>
                )
            )}
            <div className="headerButton" onClick={() => dispatch(logout())}>Logout</div>
        </Fragment>
    )
}

export default Sidebar;