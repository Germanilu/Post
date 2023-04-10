import React, { useState, useEffect, useRef }               from 'react';
import axios                                                from 'axios';
import { useSelector }                                      from "react-redux";
import {userData}                                           from "../../Features/userSlice"
import { useNavigate }                                      from 'react-router-dom';
import Sidebar                                              from '../../Components/Sidebar/Sidebar';
import './Post.scss';

const Post = () => {



    const [post,setPost]                  = useState(null)
    const userInfo                        = useSelector(userData);
    const navigate                        = useNavigate();
    const [postData, setPostData]         = useState({
        title: '',
        description: '',
    })


    useEffect(()=>{
        getPosts();
    },[])

    useEffect(()=>{
        if(userInfo.token === ""){
            navigate('/')
        }
    })


    /**
     * This function will get all the post on DB and render on the page.
     */
    const getPosts = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            const attempt = await axios.get("https://bbdd-post.onrender.com/api/getPosts", config)
            if(attempt.status === 200){
                console.log(attempt)
                if(attempt.data.data.length > 0){
                    setPost(attempt.data.data)
                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }


    /**
     * This function will set state of postData 
     * @param {Object} data 
     */
    const updatePostData = (data) => {
        setPostData({...postData, [data.target.name]: data.target.value})
    }



    /**
     * This function will create a new post 
     */
    const createPost = async() => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            };

            const attempt = await axios.post("https://bbdd-post.onrender.com/api/newPost",postData, config)
            if(attempt.status === 200){
                console.log(attempt)
                getPosts()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="post-design">
            <div className='sidebar-info-account'>
                <Sidebar></Sidebar>
            </div>
            <div className='main-post-view'>
            <div className='post-container'>
                <h1>Bacheca</h1>
            {
                post ? (
                    post.map((post) => {
                        return(
                            <div key={post._id} className='post'>
                                <div className="post-title">{post.title}</div>
                                <div className='post-info'>
                                    <div>{post.userName}</div>
                                    <div>{post.userSurname}</div>
                                </div>
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
                <button className='create-post-button' onClick={() => createPost()}>Post</button>
            </div>
        </div>
        </div>
            
            

    )
};


export default Post;