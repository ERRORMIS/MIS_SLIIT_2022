import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";
import Select from "react-select";

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

const partnerTypeList = [
  { label: "Academic", value: "Academic" },
  { label: "Industrial", value: "Industrial" },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const {
        name,
        email,
        password,
        type,
        department,
        jobRole,
        jobTitle,
        partnertype,
        isPasswordError,
    } = values;

    if (isPasswordError) {
        return;
    }

    // console.log(name);
    // console.log(email);
    // console.log(password);
    // console.log(type);
    // console.log(department);
    // console.log(jobRole);
    // console.log(jobTitle);
    // console.log(partnertype);

    if (type === "Student") {
      if (!email || !password || !name) {
        displayAlert();
        return;
      }

      const currentUser = { name, email, password, type };
      setupUser({
        currentUser,
        alertText: "User Created! Redirecting...",
      });
    } else if (type === "Staff") {
      if (!email || !password || !name) {
        displayAlert();
        return;
      }

      const currentUser = { name, email, password, type, department, jobRole };
      setupUser({
        currentUser,
        alertText: "User Created! Redirecting...",
      });
    } else if (type === "Alumni") {
      if (!email || !password || !name) {
        displayAlert();
        return;
      }

      const currentUser = { name, email, password, type, jobTitle };
      setupUser({
        currentUser,
        alertText: "User Created! Redirecting...",
      });
    } else if (type === "Partner") {
      if (!email || !password || !name) {
        displayAlert();
        return;
      }
      const partnerType = partnertype;
      const currentUser = { name, email, password, type, partnerType };
      setupUser({
        currentUser,
        alertText: "User Created! Redirecting...",
      });
    } else if (type === "Incubator") {
      if (!email || !password || !name) {
        displayAlert();
        return;
      }
      const company = name;
      const currentUser = { company, email, password, type };
      setupUser({
        currentUser,
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  const manageUserType = (e) => {
    console.log(e.value);
    setValues({ ...values, type: e.value });
  };

  const managePartnerType = (e) => {
    console.log(e.value);
    setValues({ ...values, partnertype: e.value });
  };

  const handlePasswordValidation = (evnt) => {
    const passwordInputValue = evnt.target.value.trim();
    const passwordInputFieldName = evnt.target.name;
    //for password
    if (passwordInputFieldName === "password") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;
      const lowercaseRegExp = /(?=.*?[a-z])/;
      const digitsRegExp = /(?=.*?[0-9])/;
      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegExp = /.{8,}/;
      const passwordLength = passwordInputValue.length;
      const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
      const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
      const digitsPassword = digitsRegExp.test(passwordInputValue);
      const specialCharPassword = specialCharRegExp.test(passwordInputValue);
      const minLengthPassword = minLengthRegExp.test(passwordInputValue);
      let errMsg = "";
      if (passwordLength === 0) {
        errMsg = "Password is empty";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else if (!uppercasePassword) {
        errMsg = "At least one Uppercase";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else if (!lowercasePassword) {
        errMsg = "At least one Lowercase";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else if (!digitsPassword) {
        errMsg = "At least one digit";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else if (!specialCharPassword) {
        errMsg = "At least one Special Characters";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else if (!minLengthPassword) {
        errMsg = "At least minimum 6 characters";
        setValues({ ...values, passwordErrMsg: errMsg, isPasswordError: true });
      } else {
        errMsg = "";
        setValues({
          ...values,
          passwordErrMsg: errMsg,
          isPasswordError: false,
        });
      }
      //console.log(errMsg);
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Register</h3>
        {showAlert && <Alert />}

        {/* account type  */}
        <div>
          <div className="form-row">
            <div>
              {" "}
              <label htmlFor={"Select"} className="form-label">
                Account Type
              </label>
            </div>
            <div>
              <Select
                options={accountTypeList}
                onChange={manageUserType}
                placeholder="Student"
              />
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>

        {/* partner type  */}
        {values.type === "Partner" && (
          <div>
            <div className="form-row">
              <div>
                {" "}
                <label htmlFor={"Select"} className="form-label">
                  Type
                </label>
              </div>
              <div>
                <Select
                  options={partnerTypeList}
                  onChange={managePartnerType}
                  placeholder="Academic"
                />
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
        )}

        {/* name input */}
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />

        {/* department input */}
        {values.type === "Staff" && (
          <FormRow
            type="text"
            name="department"
            value={values.department}
            handleChange={handleChange}
          />
        )}

        {/* jobRole input */}
        {values.type === "Staff" && (
          <FormRow
            type="text"
            name="jobRole"
            value={values.jobRole}
            handleChange={handleChange}
          />
        )}

        {/* jobTitle input */}
        {values.type === "Alumni" && (
          <FormRow
            type="text"
            name="jobTitle"
            value={values.jobTitle}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          validateField={handlePasswordValidation}
        />
        {values.isPasswordError && (
          <div className={`alert alert-danger`}>{values.passwordErrMsg}</div>
        )}

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Register
        </button>
        <br></br>
        <br></br>
        <p>
          <br></br>
          {/* {'Already a member?'}
            <button type='button' onClick={toggleMember} className='member-btn'>
                {'Login'}
            </button> */}
          {"Already a member?"}
          <Link
            to="/login"
            className="login-screen__forgotpassword"
            tabIndex={4}
          >
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default RegisterPage;
