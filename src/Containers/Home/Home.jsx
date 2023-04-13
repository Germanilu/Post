import Login                                        from '../Login/Login';
import Register                                     from '../Register/Register';   
import React                                        from "react";  
import                                              './Home.scss';


const Home = () => {

    return(
        <div className="home-design">
            <Login/>
            <Register/>
        </div>
    )
}

export default Home;
