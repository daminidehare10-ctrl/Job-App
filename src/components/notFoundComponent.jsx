import './style.css';
import NotFoundimage from '../assets/NotFoundimage.jpg';
import { Link } from 'react-router-dom';

const NotFound = () => (

    <div className='d-flex flex-column justify-content-center align-items-center'>
        <img src={NotFoundimage} width="400px" />

        <br />

        <h2>The page you are requesting is not available</h2>

        <Link to="/">
            <button className='btn btn-danger'> Go Back </button>
        </Link>

       
    </div>
)

export default NotFound;