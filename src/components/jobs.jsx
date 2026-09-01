import { useEffect } from 'react';
import { useState } from 'react';
import DisplayAllJobs from './displayAlljobs';
import FilterSection from './filterSection';
import { FaSearch } from "react-icons/fa";
import Cookies from 'js-cookie';
import Nav from './nav';
import './style.css';

const Jobs = () => {

  const [loading, SetLoading] = useState(true);

  const getJobs = async () => {
    const response = await fetch("YOUR_API_URL");
    const data = await response.json();

    setValues(data);

  }

  const [allValues,setValues] = useState({

    jobsArr : [],
    userIn : "",
    minPackage : [],
    empType : []
  });


  useEffect(()=>{

    const getAllJobs = async()=>{

      const {userIn,minPackage,empType} = allValues;

      const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${userIn}`;
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
        console.log(data.jobs);


        if (response.ok){
          setValues({...allValues, jobsArr : data.jobs});
        }

      } catch (error) {

        console.log( error );
      } finally{
        SetLoading(false);
      }
      

    }

    getAllJobs();
  },[allValues.userIn]);

  const onFiltersJobs = (e) => {


    if( e.key === "Enter" ){

      setValues({...allValues,userIn : e.target.value});

    }

  }
  

  return (

    <>
    <Nav/>
    <br /><br />
    
    <div className='jobs-cont'>

      <div className='w-100'>
        
        <input onKeyUp = {onFiltersJobs} type="text" className="form-control w-50 mx-auto border border-dark" placeholder='emter your job title...' />
        
      </div>

      <br /><br />

      <div className='container'>

        <div className='row'>

          <div className='col-4'>
            <FilterSection/>
          </div>

          <ul className='col-8 '>
            
            {loading?(<div className='d-flex justify-content-center align-items-center vh-100'>
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>):
              (allValues.jobsArr.map( each => <DisplayAllJobs key={each.id} jobsItem = {each}/> ))
            }

            
          </ul>
        </div>
      </div>

    </div>
    </>
  )
}

export default Jobs;