import main from '../assets/images/logo.png'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <br></br>
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            SLIIT <span>Management</span> Information System
          </h1>
          <p>
         <b> 𝐓𝐡𝐞 𝐅𝐮𝐭𝐮𝐫𝐞 𝐀𝐰𝐚𝐢𝐭𝐬 𝐘𝐨𝐮!</b><br></br>
Step into your future with a wide range of globally renowned degree programs from our faculties, where you can engage with thriving academic communities. We offer an array of continuous teaching and supervision from exceptional lecturers, along with cutting-edge resources and state-of-art facilities to support your studies.
          </p>
          <Link to='/login' className='btn btn-hero'>
            Login/Register
          </Link>
          
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
