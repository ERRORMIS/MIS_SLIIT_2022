import StaffContainer from "../../components/StaffContainer";
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Loading from '../../components/Loading'


const AcademicStaff = () => {
  const {
    getStaffList,
    staffList,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()

  useEffect(() => {
    getStaffList() 
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])



  if (isLoading) {
    return <Loading center />
  }



    return (
      <>
        <div className="col-md-12"><h1>List of Staff</h1></div>
          <h5>
            {totalJobs} Staff{staffList.length > 1 && 's'} found
          </h5>
        <div className="col-md-12">
          {staffList.map((job) => {
          return <StaffContainer key={job._id} {...job} />
        })}
        </div>
      </>
    )
  }
  
  export default AcademicStaff;