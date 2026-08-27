import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Nav = ()=>{

    const navigate = useNavigate()

    const onLogout = () =>{

        Cookies.remove("token");
        navigate("/login");

    }

    return(

        <nav className='p-3 d-flex justify-content-between align-items-center'>
            
            <Link to = "/"><h2><i className="fa-solid fa-briefcase"></i>Job App</h2></Link>

            <ul style={{listStyle:"none"}} className='d-flex'>
                <li className='mr-4'>
                    <Link to = "/">Home</Link>
                </li>
                <li>
                    <Link to = "/Jobs">Jobs</Link>
                </li>
            </ul>
            <button onClick={onLogout} className='btn btn-primary'>Logout</button>
        </nav>
    )
}

export default Nav;