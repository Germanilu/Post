import {createSlice}            from "@reduxjs/toolkit"
import axios                    from "axios";
import jwt                      from 'jwt-decode';


/**
 * Slices
 */
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


/**
 * Login Function
 * @param {Object} data 
 * @param {String} setOutputAttempt 
 * @returns Dispatch login || error
 */
export const loginUser = (data, setOutputAttempt) => async(dispatch) => {
    try {
        const user = await axios.post("https://bbdd-post.onrender.com/api/auth/userLogin", data);
        let decode = jwt(user.data.token)
        if(user.status === 200){
            dispatch(login({ ...decode, token: user.data.token}));
        }
    } catch (error) {
      setOutputAttempt(error.response.data.message)
    }
}

/**
 * Logout Function
 * @returns Dispatch Logout
 */
export const logOut = () => (dispatch) => {
    dispatch(logout())
}

/**
 * Update user profile
 * @param {Object} userInfo 
 * @param {Object} userDetails 
 * @param {String} setOutputAttempt 
 * @returns Dispatch update || error
 */
export const updateUser = (userInfo, userDetails, setOutputAttempt) => async (dispatch) => {
    try {
      let body = {
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        password: userDetails.password
      };
  
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
      setOutputAttempt(error.response.data.message)
    }
  };


export const {login,logout,update}              = userSlice.actions;
export const userData                           = (state) => state.user;
export default                                  userSlice.reducer;