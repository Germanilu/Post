import React, { useState }              from 'react';
import axios                            from 'axios';
import './Register.scss';
const Register = () => {

    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
    })

    const updateUserData = (data) => {
        setUserData({...userData, [data.target.name]: data.target.value})
    }


       //Verification for the password
       const [passwordVerification, setPasswordVerification] = useState()
       //Register attempt message 
       const [outputAttempt, setOutputAttempt] = useState();


     //Attempt to register the user
     const registerUser = async() => {
        
        /*VALIDATIONS*/
        //Check empty inputs and return error if any
        let inputs = [
            'name',
            'surname',
            'email',
            'password',
        ];
        for (let value of inputs) {
            if (userData[value] === '') {
                setOutputAttempt("Tienes que rellenar todos los datos");
                return;
            }
        }

        /*REGULAR EXPRESSION*/
        //Email
        if (!userData.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
            setOutputAttempt("Inserta un email valido");
            return;
        }
        //Password with special character
        if (!userData.password.match(/^(?=.*[*@!#%&()^~{}]).*$/)) {
            setOutputAttempt("La password tiene que tener un caracter especial");
            return;
        }
        //Check double password verification
        if(userData.password !== passwordVerification){
            setOutputAttempt("Las contraseñas no coinciden");
            return;
        }
        

        try {
            
            const attempt = await axios.post("https://bbdd-post.onrender.com/api/auth/userSignIn",userData)
            if(attempt.status === 200){
                setOutputAttempt("Registrado Correctamente")
                console.log(attempt)
                // setTimeout(() => {
                //     window.location.reload()
                // }, 2000);
            }
            
        } catch (error) {
            setOutputAttempt(error.response.data.message)
        }
    }

    return(
        <div className="register-design">
         <input type="text" name='name' title='name' placeholder='Escribe tu nombre' onChange={updateUserData} />
         <input type="text" name='surname' title='surname' placeholder='Escribe tu apellido' onChange={updateUserData} />
         <input type="email" name='email' title='email' placeholder='Escribe tu email' onChange={updateUserData} />
         <input type="password" name='password' title='password' placeholder='Escribe tu password' onChange={updateUserData} />
         <input type="text" placeholder='Repite la constraseña' onChange={e => setPasswordVerification(e.target.value)} />
         <div className="messageError">{outputAttempt}</div>
         <button className="registerButton" onClick={() => registerUser()}><span>Registrarse</span></button>
        </div>
    )
}

export default Register;