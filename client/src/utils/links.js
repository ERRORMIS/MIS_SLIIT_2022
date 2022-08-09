import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
//import Faculty from '../pages/dashboard/Faculty'
import { useAppContext } from '../context/appContext'

// const { toggleSidebar, logoutUser, user } = useAppContext();


const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'all projects', path: 'all-jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'add project', path: 'add-job', icon: <FaWpforms /> },
  { id: 4, text: 'profile', path: 'profile', icon: <ImProfile /> },
  { id: 5, text: 'faculty', path: 'faculty', icon: <FaWpforms /> },
  { id: 6, text: 'academic staff', path: 'academic-staff', icon: <FaWpforms /> },
]

export default links
