import { Fragment }                                         from "react"
import { useDispatch ,useSelector }                                      from "react-redux";
import {logout, userData}                                           from "../../Features/userSlice"
const Sidebar = () => {
    const userInfo                        = useSelector(userData);
    const dispatch                        = useDispatch();
    return(
        <Fragment>
            <div className='user-info-name'>{userInfo.user_name} {userInfo.user_surname}</div>
            <div className="headerButton" onClick={() => dispatch(logout())}>Logout</div>
        </Fragment>
    )
}

export default Sidebar;