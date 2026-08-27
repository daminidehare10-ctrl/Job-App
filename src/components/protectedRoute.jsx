import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtextedRoute = ({Component}) =>{

const navigate = useNavigate();

  useEffect(()=>{
    
    const token = Cookies.get("token");

    if( token === undefined ){
      navigate("/login");
    }
  },[]);

    return (
      <Component/>
    )

}

export default ProtextedRoute;