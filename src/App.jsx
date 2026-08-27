import Jobs from "./components/jobs";
import Login from "./components/login";
import Home from "./components/home";
import NotFound from "./components/notFoundComponent";
import ProtextedRoute from "./components/protectedRoute";
import {Route,Routes} from "react-router-dom";
const App = () => {

  return (

    <Routes>
      
      <Route path = "/" element = {<ProtextedRoute Component = {Home}/>}></Route>

      <Route path = "/login" element = {<Login/>}></Route>

      <Route path = "/jobs" element = {<ProtextedRoute Component = {Jobs}/>}></Route>

      <Route path = "/*" element = {<NotFound/>}></Route>
    </Routes>
  )
}

export default App;