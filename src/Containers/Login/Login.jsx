import                                                              './Login.scss';
import React, { useEffect, useState }                               from "react";
import { useDispatch, useSelector}                                  from "react-redux";
import {loginUser, userData}                                        from "../../Features/userSlice";
import { useNavigate }                                              from "react-router-dom";
import { MdOutlineMailLock }                                        from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock }       from "react-icons/ai";
import {BsArrowRight}                                               from "react-icons/bs";





const Login = () => {

    /**
     * Hooks & variables
     */
    const [showHidem, setShowHide]              = useState(false);
    const [outputAttempt, setOutputAttempt]     = useState();
    const dispatch                              = useDispatch();
    const navigate                              = useNavigate();
    const userInfo                              = useSelector(userData);
    const [credentials,setCredentials]          = useState({
        email       :"",
        password    :""
    });


    useEffect(() => {
        if(userInfo.token !== ""){
            navigate('/post')
        }
    });


    /**
     * Update the updateCredentials Hook with the current data
     * @param {Object} data 
     */
    const updateCredentials = (data) => {
        setCredentials({...credentials,[data.target.name]: data.target.value})
    }


    /**
     * Dispatch action to redux to Login the user
     */
    const attemptLogin = () => {
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
            setOutputAttempt(" Introduci un'email valida ");
            return;
        }
        setOutputAttempt("Sto controllando i dati...")
        dispatch(loginUser({email:credentials.email, password: credentials.password}, setOutputAttempt))
    }

    return(
      
        <div className='login-design'>
            <div className='square'></div>
            <h1>Login</h1>
            <p>Accedi per continuare</p>
            <div className='login-inputs'>
                <p>email</p>
                <span><MdOutlineMailLock/></span>
                <input type="text" name="email" title="email"  onChange={updateCredentials}/>
            </div>
            <div className='login-inputs'>
                <p>Password</p>
                <span><AiOutlineLock/></span>
                    {showHidem ? (
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
            <div className="messageError">{outputAttempt}</div>
            <div className='button-container'>
                <div className='login-button' onClick={() => attemptLogin()}>
                    Login
                    <BsArrowRight/>
                </div>
            </div>
            <p className='login-info-text'>Accedi per poter pubblicare un  <span>post</span> </p>
        </div>
    );
}

export default Login;