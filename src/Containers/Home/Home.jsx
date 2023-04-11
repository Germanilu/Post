import Login                                        from '../Login/Login';
import Register                                     from '../Register/Register';        
import                                              './Home.scss';


const Home = () => {
    return(
        <div className="home-design">
            <Login></Login>
            <Register></Register>
        </div>
    )
}

export default Home;
