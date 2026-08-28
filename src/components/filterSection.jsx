import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';
import './style.css';

const employmentArr = [
    {

        id : "FULL TIME",
        title : "Full Time"
        
    },
    {

        id : "PART TIME",
        title : "Part Time"
        
    },
    {

        id : "FREELANLCE",
        title : "Freelance"
        
    },
    {

        id : "INTERNSHIP",
        title : "Internship"
        
    }
]

const sallaryArr = [
    {
        id : 1000000,
        title : "10 LPA  & above"
    },
      {
        id : 2000000,
        title : "20 LPA  & above"
    },
      {
        id : 3000000,
        title : "30 LPA  & above"
    },
      {
        id : 4000000,
        title : "40 LPA  & above"
    },
]

const FilterSection = () =>{

    const [allValues,setValues] = useState({
        userProfile : {}

    });

    useEffect(()=>{

        const getProfile = async()=>{

            const token = Cookies.get("token");

            const api = "https://apis.ccbp.in/profile";
            const options = {
                method :"GET",
                headers :{
                    Authorization : `Bearer ${token}`
                }
            }

            try {

                const response = await fetch ( api, options)
                const data = await response.json();

                if ( response.ok ){

                    setValues({...allValues, userProfile : data.profile_details });
                }

            } catch (error) {

                console.log( error );

            }

        }
        getProfile();
    },[]);

    const displayProfile = () =>{

        const {userProfile} = allValues;

        return(
            <div className='p-3 rounded shadow bg-secondary border border-dark text-white'>

                <img className='mb-1' src={userProfile.profile_image_url} alt="profile-image" width="70px" />
                <h2>{userProfile.name}</h2>
                <p>{userProfile.short_bio}</p>



            </div>
        )
    }

    const displayEmployemnt = () =>{

        return(
            <ul className='mt-2 p-3 rounded shadow bg-secondary text-white'>
                {
                    employmentArr.map(each => (
                        <li key={each.id} style={{listStyle : "none"}}>
                            <input className='mr-3' id = {each.id} type="checkbox"/>
                            <label htmlFor="{each.id}">{each.title}</label>
                        </li>
                    ))
                }
            </ul>
        )
    }


    const displaySallary = () =>{

        return(
            <ul className='mt-2 p-3 rounded shadow bg-secondary text-white'>
                {
                    sallaryArr.map(each => (
                        <li key={each.id} style={{listStyle : "none"}}>
                            <input name='sallary' className='mr-3' id = {each.id} type="radio"/>
                            <label htmlFor="{each.id}">{each.title}</label>
                        </li>
                    ))
                }
            </ul>
        )
    }

    return(
        <>

            {displayProfile()}

            <br /><br />

            <h3> Type of Employment </h3>

            {displayEmployemnt()}
            <br /><br />
            <h3> Sallary Rang </h3>

            {displaySallary()}

        </>
    )
}

export default FilterSection;