import StaffContainer from "../../components/StaffContainer";
import AlumniComponent from "../../components/alumni.component";
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Loading from '../../components/Loading'


const AlumniList = () => {
  const {
    getAlumniList,
    alumniList,
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
    getAlumniList() 
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])



  if (isLoading) {
    return <Loading center />
  }



    return (
      <>
        <div className="col-md-12"><h1>List of Alumni</h1></div>
          <h5>
            {totalJobs} Alumni{alumniList.length > 1 && 's'} found
          </h5>
        <div className="col-md-12">
          {alumniList.map((job) => {
          return <AlumniComponent key={job._id} {...job} />
        })}
        </div>
      </>
    )
  }
  
export default AlumniList;