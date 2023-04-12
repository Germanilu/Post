import {createSlice}            from "@reduxjs/toolkit"
import axios                    from "axios";
import jwt                      from 'jwt-decode';


//Creating new Slice with a name and an initial state
export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: ""
    },
    reducers: {
        login: (state,action) => {
           return {
            ...state,
            ...action.payload
           }
        },
        logout: (state) => {
           return{
            token: ""
           }
        },
        update: (state, action) => {
            return {
              ...state,
              ...action.payload,
            };
          }

    }
});

//Login 
export const loginUser = (data, setOutputAttempt) => async(dispatch) => {
    try {
        console.log("LOGIN!")
        const user = await axios.post("https://bbdd-post.onrender.com/api/auth/userLogin", data);
        console.log(user)
        let decode = jwt(user.data.token)
        if(user.status === 200){
            dispatch(login({ ...decode, token: user.data.token}));
        }
    } catch (error) {
      setOutputAttempt(error.response.data.message)
    }
}
//Logout
export const logOut = () => (dispatch) => {
    dispatch(logout())
}

//Update
export const updateUser = (userInfo, userDetails, setOutputAttempt) => async (dispatch) => {
    try {
        console.log("ENTRO AQUI")
      let body = {
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        password: userDetails.password
      };
      console.log(body)
  
      let config = {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
  
      const attempt = await axios.put(
        `https://bbdd-post.onrender.com/api/editProfile`,
        body,
        config
      );
      if (attempt.status === 200) {
        dispatch(update({ userDetails }));
        setOutputAttempt("Dati aggiornati correttamente, Verrà effettuato il Logout")
        setTimeout(() => {
          dispatch(logout())
        }, 3000);
      }
    } catch (error) {
      console.log(error)
      setOutputAttempt(error.response.data.message)
    }
  };


export const {login,logout,update}             = userSlice.actions;
export const userData                   = (state) => state.user;
export default                          userSlice.reducer;