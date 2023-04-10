import { BrowserRouter, Routes, Route }       from "react-router-dom";
import Home                                   from "./Containers/Home/Home.jsx"
import Post                                   from "./Containers/Post/Post.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post' element={<Post/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
