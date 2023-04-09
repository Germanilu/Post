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
        }

    }
});

//Login 
export const loginUser = (data) => async(dispatch) => {
    try {
        console.log("LOGIN!")
        const user = await axios.post("https://bbdd-post.onrender.com/api/auth/userLogin", data);
        console.log(user)
        let decode = jwt(user.data.token)
        if(user.status === 200){
            dispatch(login({ ...decode, token: user.data.token}));
        }
    } catch (error) {
        console.log(error)
    }
}
//Logout
export const logOut = () => (dispatch) => {
    dispatch(logout())
}


export const {login,logout}             = userSlice.actions;
export const userData                   = (state) => state.user;
export default                          userSlice.reducer;