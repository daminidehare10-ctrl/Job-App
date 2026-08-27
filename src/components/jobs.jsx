import { useEffect } from 'react';
import { useState } from 'react';
import DisplayAllJobs from './displayAlljobs';
import FilterSection from './filterSection';
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
        console.log("DATA=",data);
        console.log("JOBS ARRAY=",data.jobsArr);


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