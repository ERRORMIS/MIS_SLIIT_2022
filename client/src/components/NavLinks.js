import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { useAppContext } from '../context/appContext'

const NavLinks = ({ toggleSidebar }) => {

   const { user } = useAppContext();
  return (
    <div className='nav-links'>

          <NavLink
              to="/"
              key={1}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><IoBarChartSharp /></span>
              {"stats"}
          </NavLink>

          <NavLink
              to="/all-jobs"
              key={2}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><MdQueryStats /></span>
              {"all projects"}
          </NavLink>

          <NavLink
              to="/add-job"
              key={3}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"add project"}
          </NavLink>

          <NavLink
              to="/profile"
              key={4}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><ImProfile /></span>
              {"profile"}
          </NavLink>

          <NavLink
              to="/faculty"
              key={5}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"faculty"}
          </NavLink>
          
          <NavLink
              to="/academic-staff"
              key={6}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"staff"}
          </NavLink>

          <NavLink
              to="/partner-list"
              key={7}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"partners"}
          </NavLink>

          <NavLink
              to="/alumni-list"
              key={8}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"alumni"}
          </NavLink>

          <NavLink
              to="/search"
              key={8}
              onClick={toggleSidebar}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              <span className='icon'><FaWpforms /></span>
              {"Search"}
          </NavLink>

          {user.type === 'Incubator' && (
            <NavLink
                to="/academic-staff"
                key={9}
                onClick={toggleSidebar}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                <span className='icon'><FaWpforms /></span>
                {"finance details"}
            </NavLink>
          )}



        {/* )
      })} */}
    </div>
  )
}

export default NavLinks
