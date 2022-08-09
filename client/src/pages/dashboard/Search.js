import Wrapper from '../../assets/wrappers/SearchContainer'
import Select from "react-select";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../../components";
import { useAppContext } from '../../context/appContext';
import StaffContainer from "../../components/StaffContainer";
import AlumniComponent from "../../components/alumni.component";
import PartnerComponent from "../../components/partner.component";
import StudentComponent from "../../components/student.component";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
  type: "Student",
  department: "",
  jobRole: "",
  jobTitle: "",
  partnertype: "Academic",
  isPasswordError: false,
  passwordErrMsg: "",
};
 
const accountTypeList = [
  { label: "Student", value: "Student" },
  { label: "Staff", value: "Staff" },
  { label: "Alumni", value: "Alumni" },
  { label: "Partner", value: "Partner" },
  { label: "Incubator", value: "Incubator" },
];

const Search = () => {

  const [values, setValues] = useState(initialState);

  const {
    getStaffList,
    staffList,
    getAlumniList,
    alumniList,
    getPartnerList,
    partnerList,
    getStudentList,
    studentList,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values.type);
    if(values.type === 'Staff'){
      getStaffList();
    }
    if(values.type === 'Alumni'){
      getAlumniList();
    }
    if(values.type === 'Partner'){
      getPartnerList();
    }
    if(values.type === 'Student'){
      getStudentList();
    }

   
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const manageUserType = (e) => {
    console.log(e.value);
    setValues({ ...values, type: e.value });
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <div className="form-row">
              <div>
                {" "}
                <label htmlFor={"Select"} className="form-label">
                  User Type
                </label>
              </div>
              <div>
                <Select
                  options={accountTypeList}
                  onChange={manageUserType}
                  placeholder="Student"
                />
              </div>
              <div className="col-md-4">
              </div>
            </div>
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type="text"
              name="email"
              value={values.name}
              handleChange={handleChange}
            />

            <button
            className='btn btn-block btn-success'
            onClick={handleSubmit}
          >
            Search
          </button>
        </div>
      </form>

      {values.type === 'Staff' &&
          <div>
            <div className="col-md-12">
              {staffList.map((job) => {
                  return <StaffContainer key={job._id} {...job} />
              })}
            </div>
          </div>        
      }

      {values.type === 'Alumni' &&
          <div>
            <div className="col-md-12">
                {alumniList.map((job) => {
                 return <AlumniComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }

      {values.type === 'Partner' &&
          <div>
            <div className="col-md-12">
            {partnerList.map((job) => {
          return <PartnerComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }   

      {values.type === 'Student' &&
          <div>
            <div className="col-md-12">
            {partnerList.map((job) => {
              console.log(job);
          return <StudentComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }   



      
    </Wrapper>

  )
}

export default Search
