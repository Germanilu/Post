import React, { useState, useEffect }                       from 'react';
import axios                                                from 'axios';
import { useSelector }                                      from "react-redux";
import {userData}                                           from "../../Features/userSlice";
import { useNavigate }                                      from 'react-router-dom';
import Sidebar                                              from '../../Components/Sidebar/Sidebar';
import './Post.scss';

const Post = () => {


     /**
     * Hooks & variables
     */
    const [post,setPost]                        = useState(null)
    const userInfo                              = useSelector(userData);
    const navigate                              = useNavigate();
    const [userDetails, setUserDetails]         = useState()
    const [outputAttempt, setOutputAttempt]     = useState();
    const [postData, setPostData]               = useState({
        title: '',
        description: '',
    });
    const [editUserData,setEditUserData]        = useState({
        open: false,
        id:""
    });


    useEffect(()=>{
        getPosts();
    },[])
    
    useEffect(()=>{
        if(userInfo.token === ""){
            navigate('/')
        }
    })


    /**
     * Update the updateUserData Hook with the current data
     * @param {Object} data 
     */
    const updateUserData = (data) => {
        setUserDetails({...userDetails, [data.target.name]: data.target.value})
    }
    
    /**
     * Function to edit user data by admin/mod
     * @param {object} post 
     */
    const editUser = (post) => {
        if(userInfo.user_role.toString() === "6431c06cccf174713344640b" || userInfo.user_role.toString() === "6431c06cccf174713344640a" ){
            setEditUserData({
                open: !editUserData.open,
                id:post._id
            })
        }
    }

    /**
     * Function that update other users informations
     */
    const updateUserInfo = async() => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            };

            let body = {
                name: userDetails.name,
                surname: userDetails.surname,
                email: userDetails.email,
                role: userDetails.role,
              };

            const attempt = await axios.put(`https://bbdd-post.onrender.com/api/editProfile/${editUserData.id}`,body,config)
            if(attempt.status === 200){
                setOutputAttempt("Utente aggiornato correttamente")
            }
            
        } catch (error) {
            setOutputAttempt(error.response.data.message)
        }
    }

    /**
     * Function to retrieve post on DB
     */
    const getPosts = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            const attempt = await axios.get("https://bbdd-post.onrender.com/api/getPosts", config)
            if(attempt.status === 200){
                if(attempt.data.data.length > 0){
                    setPost(attempt.data.data)
                }
            }
            
        } catch (error) {
            setOutputAttempt(error.response.data.message)
        }
    }


    /**
     * Update the updatePostData Hook with the current data
     * @param {Object} data 
     */
    const updatePostData = (data) => {
        setPostData({...postData, [data.target.name]: data.target.value})
    }

    /**
     * Function to create new post 
     */
    const createPost = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            const attempt = await axios.post("https://bbdd-post.onrender.com/api/newPost",postData, config)
            if(attempt.status === 200){
                getPosts()
            }
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
        <div className="post-design">
            <div className='sidebar-info-account'>
                <Sidebar></Sidebar>
            </div>
            <div className='main-post-view'>
            <div className='post-container'>
                <h1>Bacheca</h1>
                
                {post ? (
                    post.map((post) => {
                        return(
                            <div key={post._id} className='post'>
                                <div className="post-title">{post.title}</div>
                                <div className='post-info' onClick={() => editUser(post)}>
                                    <div>{post.userName}</div>
                                    <div>{post.userSurname}</div>
                                </div>
                                {editUserData.open ? (
                                    <div className={editUserData.id === post._id? "showbox": "hidebox"}>
                                        <div className='edit-user-input'>
                                            
                                            <>
                                                <label htmlFor="name">Nome</label>
                                                <input type="text" name='name' title='name' onChange={updateUserData} />
                                                <label htmlFor="surname">Cognome</label>
                                                <input type="text" name='surname' title='surname' onChange={updateUserData} />
                                            </>

                                            <>
                                                <label htmlFor="email">Email</label>
                                                <input type="text" name='email' title='email' onChange={updateUserData} />
                                                <label htmlFor="role">Role</label>                                           
                                                <select name="role" title='role' id="role" onChange={updateUserData}>
                                                    <option value="">Seleziona un'opzione</option>
                                                    <option value="user">Usuario</option>
                                                    <option value="moderator">Moderatore</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            </>

                                        </div>
                                        {outputAttempt}
                                        <button onClick={() => updateUserInfo()}>save</button>
                                    </div>
                                ):(
                                    ""
                                )}

                                <div className="post-description">{post.description}</div>
                            </div>
                        )
                    }
                )):(
                    <div>Sembra che non ci sia nessun Post...</div>
                    )
                }
            </div>

            <div className='create-post-container'>
                <div className='input-create-post'>
                    <label htmlFor="title">title</label>
                    <input className='create-post-title' type="text" name='title' title='title' onChange={updatePostData} />
                    <label htmlFor="description">description</label>
                    <textarea className='create-post-textarea' type="text" name='description' title='description' onChange={updatePostData}/>
                </div>
                <div className='create-post-button' onClick={() => createPost()}>Post</div>
            </div>
        </div>
        <div className='circle-box'>
            <div class="circle circle1"></div>
            <div class="circle circle2"></div>
            <div class="circle circle3"></div>
        </div>
        </div>
        </>
    )
};

export default Post;