import { useEffect } from 'react';
import { useState } from 'react';
import DisplayAllJobs from './displayAlljobs';
import FilterSection from './filterSection';
import jobnotfound from '../assets/jobnotfound.jpg';
import { FaSearch } from "react-icons/fa";
import Cookies from 'js-cookie';
import Nav from './nav';
import { Link } from 'react-router-dom';
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
      console.log( empType );
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
  },[allValues.userIn, allValues.empType,allValues.minPackage]);

  const jobsArr = allValues.jobsArr;

  if (!loading && jobsArr.length === 0) {
    return(

      <div className = "not-found-img">
        <img src={jobnotfound} width="400px" />
        <h4>This Job Is Not Available</h4>
        <Link to = "/jobs">
          <button className='btn btn-danger' onClick={() =>{
            setValues({...allValues,jobsArr : [],userIn : "",minPackage : [],empType : []})}}>Found Similer Jobs</button>
        </Link>
      </div>
    );
  }

  const onFiltersJobs = (e) => {


    if( e.key === "Enter" ){

      setValues({...allValues,userIn : e.target.value});

    }

  }

  const getEmpType = (isChecked,value) =>{

    if( isChecked ){

      setValues({...allValues, empType : [...allValues.empType,value]});

    }
    else{

      setValues({...allValues,empType : allValues.empType.filter( each => each != value )});
    }

    console.log( isChecked, value );


  }  

  const getMinPackage = (value)=>{
    setValues({...allValues,minPackage : value});
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
            <FilterSection getEmpType = {getEmpType} getMinPackage = {getMinPackage}/>
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