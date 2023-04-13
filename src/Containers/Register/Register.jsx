import React, { useState }              from 'react';
import axios                            from 'axios';
import { MdOutlineMailLock }            from "react-icons/md";
import { AiOutlineLock }                from "react-icons/ai";
import { GrContactInfo}                 from "react-icons/gr";
import {BsArrowRight}                   from "react-icons/bs";
import                                  './Register.scss';

const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    })

    //Verification for the password
    const [passwordVerification, setPasswordVerification] = useState()
    //Register attempt message 
    const [outputAttempt, setOutputAttempt] = useState();



     /**
     * Update the updateUserData Hook with the current data
     * @param {Object} data 
     */
    const updateUserData = (data) => {
        setUserData({...userData, [data.target.name]: data.target.value})
    }




     /**
      * Function that register the user into the DB
      * @returns 
      */
     const registerUser = async() => {
        
        /**
         * Validations & Regular Expression
         */
        let inputs = [
            'name',
            'surname',
            'email',
            'password',
        ];
        for (let value of inputs) {
            if (userData[value] === '') {
                setOutputAttempt("Devi inserire tutti i dati");
                return;
            }
        }

        if (!userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setOutputAttempt("Inserire un'email valido");
            return;
        }

        if (!userData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {
            setOutputAttempt("La password deve contenere un carattere speciale");
            return;
        }

        if(userData.password !== passwordVerification){
            setOutputAttempt("Le password non coincidono");
            return;
        }
        
        /**
         * Attempt to register User
         */
        try {
            const attempt = await axios.post("https://bbdd-post.onrender.com/api/auth/userSignIn",userData)
            if(attempt.status === 200){
                setOutputAttempt("Registrato Correttamente, Effettua il login")
            }
            
        } catch (error) {
            setOutputAttempt(error.response.data.message)
        }
    }

    return(
        <div className="register-design">
            <div className='square'></div>
            <h1>Registrati</h1>
            <div className='register-inputs'>
                <p>Nome</p>
                <span><GrContactInfo/></span>
                <input type="text" name='name' title='name'  onChange={updateUserData} />
            </div>
            <div className='register-inputs'>
                <p>Cognome</p>
                <span><GrContactInfo/></span>
                <input type="text" name='surname' title='surname'  onChange={updateUserData} />
            </div>
            <div className='register-inputs'>
                <p>Email</p>
                <span><MdOutlineMailLock/></span>
                <input type="email" name='email' title='email' onChange={updateUserData} />
            </div>
            <div className='register-inputs'>
                <p>Password</p>
                <span><AiOutlineLock/></span>
                <input type="password" name='password' title='password'  onChange={updateUserData} />
            </div>
            <div className='register-inputs'>
                <p>Ripeti Password</p>
                <span><AiOutlineLock/></span>
                <input type="password" onChange={e => setPasswordVerification(e.target.value)} />
            </div>
         <div className="messageError">{outputAttempt}</div>

         <div className='button-container'>
            <div className="register-button" onClick={() => registerUser()}>
                <span>Registrati</span>
                <BsArrowRight/>
            </div>
         </div>         
        </div>
    )
}

export default Register;