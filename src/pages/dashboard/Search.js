import Wrapper from '../../assets/wrappers/SearchContainer'
import Select from "react-select";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../../components";
import { useAppContext } from '../../context/appContext';
import StaffContainer from "../../components/StaffContainer";
import AlumniComponent from "../../components/alumni.component";
import PartnerComponent from "../../components/partner.component";
import StudentComponent from "../../components/student.component";
import { userTypesWithSpecialization } from '../../constants/constants';

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
  specialization: []
};
 
const accountTypeList = [
  { label: "Student", value: "Student" },
  { label: "Staff", value: "Staff" },
  { label: "Alumni", value: "Alumni" },
  { label: "Partner", value: "Partner" },
];

const Search = () => {

  const [values, setValues] = useState(initialState);
  const [searchResults, setSearchResults] = useState([]);

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
    projectRequirement
  } = useAppContext()

  useEffect(() => {
    switch (values.type) {
      case 'Student': {
        const filtered = studentList.filter((student) => 
          (!values.name || values.name === "" || student.name.toLowerCase().includes(values.name.toLowerCase()))
          && (!values.email || values.email === "" || student.email.includes(values.email.toLowerCase()))
          && (values.specialization.length === 0 || student.specialization.find((specialization) => values.specialization.find(({ value: val}) => val === specialization.value)))
          )
        setSearchResults(filtered);
        break;
      }

      case 'Alumni': {
        const filtered = alumniList.filter((alumni) => 
          (!values.name || values.name === "" || alumni.name.toLowerCase().includes(values.name.toLowerCase()))
          && (!values.email || values.email === "" || alumni.email.toLowerCase().includes(values.email.toLowerCase()))
          && (values.specialization.length === 0 || alumni.specialization.find((specialization) => values.specialization.find(({ value: val}) => val === specialization.value)))
          )
        setSearchResults(filtered);
        break;
      }

      case 'Staff': {
        const filtered = staffList.filter((staff) => 
          (!values.name || values.name === "" || staff.name.toLowerCase().includes(values.name.toLowerCase()))
          && (!values.email || values.email === "" || staff.email.toLowerCase().includes(values.email.toLowerCase()))
          && (values.specialization.length === 0 || staff.specialization.find((specialization) => values.specialization.find(({ value: val}) => val === specialization.value)))
          )
        setSearchResults(filtered);
        break;
      }

      case 'Partner': {
        const filtered = partnerList.filter((partner) => 
          (!values.name || values.name === "" || partner.name.toLowerCase().includes(values.name.toLowerCase()))
          && (!values.email || values.email === "" || partner.email.toLowerCase().includes(values.email.toLowerCase()))
          )
        setSearchResults(filtered);
        break;
      }
    }
  }, [
    staffList,
    alumniList,
    partnerList,
    studentList,
  ]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    switch(values.type) {
      case 'Student': 
        getStudentList();
        break;

      case 'Alumni': 
        getAlumniList();
        break;

      case 'Partner':
        getPartnerList();
        break;

      case 'Staff':
        getStaffList();
        break;

    }
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOnSpecializationChange = (value) => {
    setValues({
      ...values,
      specialization: value
    })
  }

  const manageUserType = (e) => {
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
            { userTypesWithSpecialization.includes(values.type) &&
              <div className="form-row">
              <label htmlFor="projectRequirement" className="form-label">
                Specialization
              </label>
                <Select
                  isMulti
                  name="Specialization"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={projectRequirement}
                  value={values.specialization}
                  onChange={handleOnSpecializationChange}
    
                />
              </div>
            }
            <FormRow
              type="text"
              name="email"
              value={values.email}
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
              {searchResults.map((job) => {
                  return <StaffContainer key={job._id} {...job} />
              })}
            </div>
          </div>        
      }

      {values.type === 'Alumni' &&
          <div>
            <div className="col-md-12">
                {searchResults.map((job) => {
                 return <AlumniComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }

      {values.type === 'Partner' &&
          <div>
            <div className="col-md-12">
            {searchResults.map((job) => {
          return <PartnerComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }   

      {values.type === 'Student' &&
          <div>
            <div className="col-md-12">
            {searchResults.map((job) => {
          return <StudentComponent key={job._id} {...job} />
              })}
            </div>
          </div>        
      }   



      
    </Wrapper>

  )
}

export default Search
