import React, { Component } from "react";
import Wrapper from "../assets/wrappers/BigSidebar";
import { bootstrap } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./StaffContainer.css";
import { Link, useNavigate } from 'react-router-dom'

// export default class StaffContainer extends Component {
const StudentComponent = ({name,lastName,email, contactNo,faculty,gender,company,img,nic,studentID }) => {

    const navigate = useNavigate();
    const toComponentB=(name, lastName, email,nic,contactNo,faculty,gender, new_img,studentID)=>{
        navigate('/profile-list',{state:{  
            name:name,
            lastName, lastName,
            email: email,
            nic: nic,
            contactNo: contactNo,
            faculty: faculty,
            gender: gender,
            img: new_img,
            studentID: studentID,
        }});
    }
 
    let new_img = "profile_img.jpg";

    if(img !== ''){
        new_img = img
    }
     
    return (
        <Wrapper>
            <div class="card col-md-8">
                    <div class="row">
                        <div class="col-md-2">
                            <img class="profile-img" src={`uploads/${new_img}`} alt="Sunflower" />
                        </div>
                        <div class="col-md-7">
                            
                            <div className="row">
                            <h5><b>{name} {lastName}</b></h5>
                            <p>{email}</p>
                            {/* <p>{contactNo}</p> */}
                        </div>
                        </div>
                        <div class="col-md-2">
                        <button
                          className='btn btn-primary'
                          onClick={(e) => {
                            toComponentB(name, lastName, email,nic,contactNo,faculty,gender, new_img,studentID)
                          }}
                        >
                          View
                        </button>
                        </div>
                    </div>
            </div>
            {/* <div class="card col-md-8">
                
                <div>
                    <div>
                        
                    </div>
                        <div className="row">
                            <p>Email: {email}</p>
                            <p>NIC: {nic}</p>
                            <p>Contact NO: {contactNo}</p>
                            <p>Partner Type: {partnerType}</p>
                            <p>Location: {location}</p>
                        </div>
                    </div>
                    </div>
                <div>
            </div> */}
        </Wrapper>
    );
}

export default StudentComponent
