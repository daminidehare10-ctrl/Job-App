import { useEffect } from 'react';
import { useState } from 'react';
import DisplayAllJobs from './displayAlljobs';
import FilterSection from './filterSection';
import { FaSearch } from "react-icons/fa";
import Cookies from 'js-cookie';
import Nav from './nav';
import './style.css';

const Jobs = () => {

  const [allValues,setValues] = useState({

    jobsArr : []
  });


  useEffect(()=>{

    const getAllJobs = async()=>{

      const api = "https://apis.ccbp.in/jobs";
      const token = Cookies.get("token");
      console.log(token);

      const options = {
        method:'GET',
        headers : {
        Authorization : `Bearer ${token}`
        }
      };

      try {
        const response = await fetch(api,options);
        const data = await response.json();


        if (response.ok){
          setValues({...allValues, jobsArr : data.jobs});
        }

      } catch (error) {

        console.log( error );
      }
      

    }

    getAllJobs();
  },[])
  

  return (

    <>
    <Nav/>
    <br /><br />
    
    <div className='jobs-cont'>

      <div className='w-100'>
        
        <input type="text" className="form-control w-50 mx-auto border border-dark" placeholder='emter your job title...' />
        
      </div>

      <br /><br />

      <div className='container'>

        <div className='row'>

          <div className='col-4'>
            <FilterSection/>
          </div>

          <ul className='col-8 '>
            
            {
              allValues.jobsArr.map( each => <DisplayAllJobs key={each.id} jobsItem = {each}/> )
            }

            
          </ul>
        </div>
      </div>

    </div>
    </>
  )
}

export default Jobs;