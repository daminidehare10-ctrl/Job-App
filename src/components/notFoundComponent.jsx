import './style.css';
import NotFoundimage from '../assets/NotFoundimage.jpg';

const NotFound = () => (

    <div className='d-flex flex-column justify-content-center align-items-center'>
        <img src={NotFoundimage} width="400px" />

        <br />

        <h2>The page ypur are requesting is not available</h2>

       
    </div>
)

export default NotFound;