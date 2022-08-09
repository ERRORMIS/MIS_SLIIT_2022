import Wrapper from '../assets/wrappers/JobInfo'

const JobInfo = ({ icon, text, label }) => {
  return (
    <Wrapper>
      
      <p><span className='icon'>{icon}</span></p>
      <p><b>{label }:-</b> </p>
      <p><span className='text'>{text}</span></p>
    </Wrapper>
  )
}

export default JobInfo
