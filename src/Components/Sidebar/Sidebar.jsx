import { useState, Fragment }                                         from "react";
import { useDispatch ,useSelector }                                   from "react-redux";
import { updateUser ,logout, userData}                                from "../../Features/userSlice";
import                                                                './Sidebar.scss';

const Sidebar = () => {
    const userInfo                        = useSelector(userData);
    const dispatch                        = useDispatch();
    const [showProfile, setShowProfile]   = useState(false);
    const [showData, setShowData] =useState(true)
    const [outputAttempt, setOutputAttempt] = useState("");
    const [userDetails, setUserDetails] = useState({
        name: userInfo.user_name,
        surname: userInfo.user_surname,
        email: userInfo.user_email,
        password:userInfo.user_password
    })
    
    const updateUserData = (data) => {
        setUserDetails({...userDetails, [data.target.name]: data.target.value})
    }

    const updateUserInfo = () => {
        setOutputAttempt("Sto controllando i dati...")
        dispatch(updateUser(userInfo,userDetails, setOutputAttempt))
    }


    return(
        <Fragment>
            <div className='user-info-name' onClick={() => {setShowProfile(!showProfile); setShowData(true)}}>{userInfo.user_name} {userInfo.user_surname}</div>
            {showProfile && (
                showData ? (
                <div onClick={() => setShowData(!showData)} className="profile-design">
                   <div className="user-info">{userInfo.user_name}</div>
                   <div className="user-info">{userInfo.user_surname}</div>
                   <div className="user-info">{userInfo.user_email}</div>
                </div>
                ):(
                    <div className="profile-design">
                        <div className="inputs-profile-design">
                            <label htmlFor="name">Nome</label>
                        <input type="text" name='name' title='name' onChange={updateUserData} />

                            <label htmlFor="surname">Cognome</label>
                        <input type="text" name='surname' title='surname' onChange={updateUserData} />
                            <label htmlFor="surname">indirizzo email</label>
                        <input type="text" name='email' title='email' onChange={updateUserData} />

                            <label htmlFor="password">Password</label>
                        <input type="password" name='password' title='password'onChange={updateUserData} />
                        <div className="messageError">{outputAttempt}</div>
                        </div>
                        <div className="profile-button save-button" onClick={() => updateUserInfo()}>Salva</div>
                    </div>
                )
            )}
            <div className="profile-button" onClick={() => dispatch(logout())}>Logout</div>
        </Fragment>
    )
}

export default Sidebar;