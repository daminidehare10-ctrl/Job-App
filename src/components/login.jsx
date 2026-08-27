import './style.css';
import loginimage from '../assets/loginimage.jpg'
import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {

    const navigate = useNavigate();

    useEffect(()=>{

        const token = Cookies.get("token");

        if(token !== undefined){
            navigate("/");
        }
        
    },[]);

    const [allValues, setValues] = useState({
        username : "",
        password : "",
        errorMsg : ""
    });

    


    const onLoginUser  = async(e) =>{

        e.preventDefault();

        const api = "https://apis.ccbp.in/login";

        const userDetails = {

            username : allValues.username,
            password : allValues.password

        }

        const options = {
            method:'POST',
            body: JSON.stringify(userDetails),
        }

        try {
            const response = await fetch ( api, options);
            const data = await response.json();

            //jwt_token ----> on success response
            //error_msg-----> on failure response

            console.log( data );

            if( response.ok ){
                setValues({...allValues,errorMsg : ""});
                Cookies.set("token", data.jwt_token);
                navigate("/");

            }
            else{
                setValues({...allValues,errorMsg : `*${data.error_msg}`});
            }

        } catch (error) {
            console.log( error );
        }
    }


  return (

    <div className='login-cont'>

        <img src={loginimage} width="45%"/>

        <form onSubmit={onLoginUser} style={{width : "35%"}} className='p-3 shadow rounded'>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={e => setValues({...allValues,username : e.target.value})}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your username with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"
                onChange={e => setValues({...allValues,password : e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <br /><br />
            <b className='text-danger'>{allValues.errorMsg}</b>
        </form>
    </div>
  )
}

export default Login;