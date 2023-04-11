import                                      './Login.scss';
import React, { useEffect, useState }       from "react";
import { useDispatch, useSelector}          from "react-redux";
import {loginUser, userData}                from "../../Features/userSlice";
import { useNavigate }                      from "react-router-dom";
import { MdOutlineMailLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Login = () => {

    const [credentials,setCredentials] = useState({
        email       :"",
        password    :""
    });
    const [showHidem, setShowHide] = useState(false);
    const dispatch                     = useDispatch();
    const navigate                     = useNavigate();
    const userInfo                     = useSelector(userData);


    useEffect(() => {
        if(userInfo.token !== ""){
            navigate('/post')
        }
    })

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
   
console.log(credentials)

    return(
        <div className='login-design'>
            <h1>Login</h1>
            <p>Please sign in to continue.</p>
            <div className='login-inputs'>
                <p>email</p>
                <span><MdOutlineMailLock/></span>
                <input type="text" name="email" title="email"  onChange={updateCredentials}/>
            </div>
            <div className='login-inputs'>
                <p>Password</p>
                <span><MdOutlineMailLock/></span>

                {
                    showHidem ? (
                        <input type="text" name="password" title="password" onChange={updateCredentials} />
                        ):(
                        <input type="password" name="password" title="password" onChange={updateCredentials} />
                    )
                }
                
                <span className='show-password' onClick={()=>setShowHide(!showHidem)}>
                
                    {showHidem ? (
                            <AiOutlineEyeInvisible/>
                        ):(
                            <AiOutlineEye/>
                        )
                    }
                
                </span>
            </div>
            <button onClick={() => attemptLogin()}>Login</button>
        </div>
    );
}

export default Login;