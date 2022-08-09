import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { useAppContext } from '../context/appContext'
import { useNavigate ,Link} from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, loginUser } = useAppContext() 

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {

    e.preventDefault()
    const { email, password } = values
    if (!email || !password) {
      displayAlert()
      return
    }
    const currentUser = { email, password }

      loginUser({
        currentUser,
        alertText: 'Login Successful! Redirecting...',
      })

  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* email input */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
        <br></br>
        <Link to="/forgotpassword" className="login-screen__forgotpassword" tabIndex ={4}>
              Forgot Password?
        </Link> 
        <br></br>
        <p>
        {/* {values.isMember ?'Forgot password' : 'forgot password'} */}
        {/* <button type='button' className='member-btn'>
            {values.isMember ? 'Forgot Password' : '/forgotpassword'}
          </button> */}

          <br></br>
          {/* {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button> */}
          Not a member yet?
          <Link to="/register" className="login-screen__forgotpassword" tabIndex ={4}>
              Register
          </Link> 
        </p>
      </form>
    </Wrapper>
  )
}
export default Register
