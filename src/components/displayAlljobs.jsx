import { FaStar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { FaBriefcase } from "react-icons/fa";
import './style.css';



const DisplayAllJobs = ({jobsItem}) =>{

    return(
    
        <li style={{listStyle:"none"}} className='p-3 shadow mb-3 rounded border border-secondary'>

            <div className='d-flex'>

                <img src={jobsItem.company_logo_url} width="70px" />

                <div className='ml-3'>
                    <h4>{jobsItem.title}</h4>
                    <span className="pt-2"><b>{jobsItem.rating}</b></span>
                    <span className="ml-2"><FaStar className="text-warning"/></span>
                </div>
            </div>

            <div className="mt-3 d-flex justify-content-between">
                <div>
                    <IoLocationSharp className="mr-2"/>
                    <span className="mr-3">{jobsItem.location}</span>
                    <FaBriefcase className="mr-2"/>
                    <span>{jobsItem.employment_type}</span>

                </div>

                <h5>{jobsItem.package_per_annum}</h5>
            </div>

            <hr />

          

            <h4> Description </h4>

            <p>{jobsItem.job_description}</p>

        
            
        </li>
    )
}

export default DisplayAllJobs;