import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
// import DOMPurify from 'dompurify';
// import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'

import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react"
import parse from "html-react-parser"

// const { window } = new JSDOM('<!DOCTYPE html>')
// const domPurify = DOMPurify(window)

// console.log(domPurify.sanitize(`
//         hell <script>alert("hi");</script>
//         <div onclick="alert(123);">
//                 o
//         </div>
//         world
//         <img id="createElement">
// `));

const Job = ({
  _id,
  title,
  owner,
  description,
  jobType,
  createdAt,
  status,
  startDate, 
  endDate,
  requirement,
}) => {

  
  const { setEditJob, deleteJob } = useAppContext()

  const createMarkup = (html) => {
    console.log(DOMPurify.sanitize(html));
    return  {
      __html: DOMPurify.sanitize(html)
      
    }
  }

  const res = (html) => {
    var cc = DOMPurify.sanitize(html);
    console.log(cc);
   
      var bb = parse(cc);
      console.log(bb);
      return bb;
  }


  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{owner.charAt(0)}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{owner}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <div className='row'>
            
            <JobInfo icon={<FaLocationArrow />} text={parse(description)} label="Description" />
            <JobInfo icon={<FaCalendarAlt />} text={startDate} label="Start Date"/>
            <JobInfo icon={<FaCalendarAlt />} text={endDate} label="End Date"/>
            <JobInfo icon={<FaBriefcase />} text={requirement} label="Requirement"/>
            <div className={`status ${status}`}>{status}</div>

          </div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
