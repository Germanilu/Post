import                                      './Login.scss';
import React, { useEffect, useState }       from "react";
import { useDispatch, useSelector}          from "react-redux";
import {loginUser, userData}                from "../../Features/userSlice";
import { useNavigate }                      from "react-router-dom";
import { MdOutlineMailLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineLock } from "react-icons/ai";


import {BsArrowRight} from "react-icons/bs";



const Login = () => {

    const [credentials,setCredentials] = useState({
        email       :"",
        password    :""
    });
    const [showHidem, setShowHide] = useState(false);
    const [outputAttempt, setOutputAttempt] = useState();
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
        // Regular expression to validate email
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email)) {
            setOutputAttempt(" Introduci un'email valida ");
            return;
        }
        console.log("entro")
        console.log(credentials)
        setOutputAttempt("Sto controllando i dati...")
        dispatch(loginUser({email:credentials.email, password: credentials.password}, setOutputAttempt))
    }
   
console.log(credentials)

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