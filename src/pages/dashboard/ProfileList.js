import StaffContainer from "../../components/StaffContainer";
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Loading from '../../components/Loading'
import {useLocation} from 'react-router-dom';


function ProfileList (props) {

    const location = useLocation();

    return (

            <div className="col-md-12"><h1>Profile Details</h1>
            <div class="card col-md-6">
                <div>
                    <div>
                        <img class="profile-img" src={`uploads/${location.state.img}`} alt="Sunflower" />
                        <h5>{location.state.name} {location.state.lastName}</h5>
                    </div>
                        <div className="row">
                            <p>Email: {location.state.email}</p>
                            <p>NIC: {location.state.nic}</p>
                            <p>Contact NO: {location.state.contactNo}</p>
                            <p>Address: {location.state.address}</p>
                            { location.state.department && <p>Department: {location.state.department}</p>}
                            { location.state.jobRole && <p>JobRole: {location.state.jobRole}</p>}
                            { location.state.jobTitle && <p>JobTitle: {location.state.jobTitle}</p>}
                            { location.state.company && <p>Company: {location.state.company}</p>}
                            { location.state.graduatedYear && <p>Graduated Year: {location.state.graduatedYear}</p>}
                            { location.state.partnerType && <p>Partner Type: {location.state.partnerType}</p>}
                            { location.state.location && <p>Location: {location.state.location}</p>}
                            { location.state.studentID && <p>StudentID: {location.state.studentID}</p>} 
                            { location.state.gender && <p>Gender: {location.state.gender}</p>} 
                            { location.state.faculty && <p>Faculty: {location.state.faculty}</p>} 
                            
                        </div>
                    </div>
                    </div>
                <div>
                </div>
            </div>
            
    )
}

export default ProfileList;