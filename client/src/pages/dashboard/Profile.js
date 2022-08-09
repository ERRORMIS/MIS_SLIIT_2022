import { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const [selectedImage, setSelectedImage, values, setValues] = useState(null);

  const { user, showAlert, displayAlert, updateUser, isLoading, uploadProfile } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [gender, setGender] = useState(user?.gender);
  const [nic, setNic] = useState(user?.nic);
  const [id] = useState(user?.id);
  const [type] = useState(user?.type);

  const [department, setDepartment] = useState(user?.department);
  const [jobRole, setJobRole] = useState(user?.jobRole);
  const [contactNo, setContactNo] = useState(user?.contactNo);
  const [address, setAddress] = useState(user?.address);

  const [company, setCompany] = useState(user?.company);
  const [jobTitle, setJobTitle] = useState(user?.jobTitle);
  const [graduatedYear, setGraduatedYear] = useState(user?.graduatedYear);
  const [location, setLocation] = useState(user?.location);

  const [studentID, setStudentId] = useState(user?.studentID);
  const [faculty, setFaculty] = useState(user?.faculty);

  const [partnerType] = useState(user?.partnerType);

  const [imgFile, setImgFile] = useState(user?.img);

  let NIC_Text = "NIC";
  let NAME_Text = "Name";

  if (type === "Partner") {
    NIC_Text = "Contact NO";
    if (partnerType === "Academic") {
      NAME_Text = "University Name";
    } else {
      NAME_Text = "Company Name";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !nic) {
      displayAlert();
      return;
    }

    if (type === "Student") {
      updateUser({
        name,
        email,
        lastName,
        nic,
        type,
        id,
        gender,
        studentID,
        faculty,
        contactNo,
      });
    } else if (type === "Staff") {
      updateUser({
        name,
        email,
        lastName,
        nic,
        type,
        id,
        contactNo,
        address,
        department,
        jobRole,
      });
    } else if (type === "Alumni") {
      updateUser({
        name,
        email,
        lastName,
        nic,
        type,
        id,
        contactNo,
        address,
        company,
        jobTitle,
        graduatedYear,
      });
    } else if (type === "Partner") {
      updateUser({ name, email, lastName, nic, type, id, location });
    }
  };

  const uploadProfileImage = async () => {

    await uploadProfile({
      selectedImage,
      id,
      type
    })

    await setImgFile(null);
    

  


  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {user.type === "Student" && (
            <FormRow
              type="text"
              labelText="StudentID"
              name="StudentID"
              value={studentID}
              handleChange={(e) => setStudentId(e.target.value)}
            />
          )}

          {user.type === "Student" && (
            <FormRow
              type="text"
              labelText="Faculty"
              name="Faculty"
              value={faculty}
              handleChange={(e) => setFaculty(e.target.value)}
            />
          )}

          {user.type === "Student" && (
            <FormRow
              type="text"
              labelText="Contact No"
              name="contact"
              value={contactNo}
              handleChange={(e) => setContactNo(e.target.value)}
            />
          )}

          <FormRow
            type="text"
            labelText={NAME_Text}
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          {user.type !== "Partner" && (
            <FormRow
              type="text"
              labelText="last name"
              name="lastName"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
          )}

          <FormRow
            type="text"
            labelText={NIC_Text}
            name="nic"
            value={nic}
            handleChange={(e) => setNic(e.target.value)}
          />

          {user.type === "Student" && (
            <FormRow
              type="text"
              labelText="Gender"
              name="gender"
              value={gender}
              handleChange={(e) => setGender(e.target.value)}
            />
            // <div>
            //   <div className="form-row">
            //     <div>
            //       {" "}
            //       <label htmlFor={"Select"} className="form-label">
            //         Gender
            //       </label>
            //     </div>
            //     <div>
            //       <Select
            //         options={genderList}
            //         onChange={manageGenderType}
            //         placeholder="Select"
            //       />
            //     </div>
            //     <div className="col-md-4"></div>
            //   </div>
            // </div>
          )}

          {user.type === "Staff" && (
            <FormRow
              type="text"
              labelText="Contact No"
              name="contact"
              value={contactNo}
              handleChange={(e) => setContactNo(e.target.value)}
            />
          )}

          {user.type === "Staff" && (
            <FormRow
              type="text"
              labelText="Address"
              name="address"
              value={address}
              handleChange={(e) => setAddress(e.target.value)}
            />
          )}

          {user.type === "Staff" && (
            <FormRow
              type="text"
              labelText="Department"
              name="department"
              value={department}
              handleChange={(e) => setDepartment(e.target.value)}
            />
          )}

          {user.type === "Staff" && (
            <FormRow
              type="text"
              labelText="Job Role"
              name="jobrole"
              value={jobRole}
              handleChange={(e) => setJobRole(e.target.value)}
            />
          )}

          {user.type === "Alumni" && (
            <FormRow
              type="text"
              labelText="Contact No"
              name="contact"
              value={contactNo}
              handleChange={(e) => setContactNo(e.target.value)}
            />
          )}

          {user.type === "Alumni" && (
            <FormRow
              type="text"
              labelText="Address"
              name="address"
              value={address}
              handleChange={(e) => setAddress(e.target.value)}
            />
          )}

          {user.type === "Alumni" && (
            <FormRow
              type="text"
              labelText="Company"
              name="company"
              value={company}
              handleChange={(e) => setCompany(e.target.value)}
            />
          )}

          {user.type === "Alumni" && (
            <FormRow
              type="text"
              labelText="Job Title"
              name="jobTitle"
              value={jobTitle}
              handleChange={(e) => setJobTitle(e.target.value)}
            />
          )}

          {user.type === "Alumni" && (
            <FormRow
              type="text"
              labelText="Graduated Year"
              name="year"
              value={graduatedYear}
              handleChange={(e) => setGraduatedYear(e.target.value)}
            />
          )}

          {user.type === "Partner" && (
            <FormRow
              type="text"
              labelText="Location"
              name="location"
              value={location}
              handleChange={(e) => setLocation(e.target.value)}
            />
          )}

          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
      <br></br>
      <div>
        <br />
        <br />
        <div>
          <h3>Upload Profile Picture</h3>

          {imgFile && (
            <img
              src={`uploads/${imgFile}`}
              alt="img"
              width={100}
              height={150}
            />
          )}

          {selectedImage && (
            <div>
              <img
                alt="not fount"
                src={URL.createObjectURL(selectedImage)}
                width={100}
                height={150}
              />
              <br />
              <button
                className="btn btn-danger"
                onClick={() => setSelectedImage(null)}
              >
                Remove
              </button>
              <button className="btn btn-success" onClick={uploadProfileImage}>
                Upload
              </button>
            </div>
          )}
          <br />

          <br />
          <input
            className="btn btn-info"
            type="file"
            name="myImage"
            onChange={(event) => {
              //console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
