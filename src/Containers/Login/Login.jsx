import                                      './Login.scss';
import React, { useState }       from "react";
import { useDispatch, useSelector}          from "react-redux";
import {loginUser, userData}                from "../../Features/userSlice";
import { useNavigate }                      from "react-router-dom";


const Login = () => {

    const [credentials,setCredentials] = useState({
        email       :"",
        password    :""
    });
    const dispatch                     = useDispatch();
    const navigate                     = useNavigate();
    const userInfo                     = useSelector(userData);

    /**
     * Update the credentials state when typing credentials on login
     * @param {String} data 
     */
    const updateCredentials = (data) => {
        setCredentials({...credentials,[data.target.name]: data.target.value})
    }


    /**
     * Dispatch data to redux 
     */
    const attemptLogin = () => {
        //Regular expression to validate email
        // if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
        //     return;
        // }
        console.log("entro")
        console.log(credentials)
        dispatch(loginUser({email:credentials.email, password: credentials.password}))
    }


    return(
        <div className='login-design'>
            <input type="text" name="email" title="email" placeholder="Email" onChange={updateCredentials}/>
            <input type="text" name="password" title="password" placeholder="Password" onChange={updateCredentials} />
            <button onClick={() => attemptLogin()}>Login</button>
        </div>
    );
}

export default Login;