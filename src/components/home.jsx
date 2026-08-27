import { Link } from 'react-router-dom';
import Nav from './nav';
import './style.css';

const Home = () => {

  


  return (

    <div className='home-cont'>
      <Nav/>
      <br /><br />

      <div className='ml-3'>
        <h5>Click The Button and Find Your Suitable Jobs</h5>
        <br />
        <Link to="/jobs">
          <button className='btn btn-primary'>Find Jobs</button>
        </Link>
      </div>

    </div>
  )
}

export default Home;