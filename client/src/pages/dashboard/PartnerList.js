import StaffContainer from "../../components/StaffContainer";
import PartnerComponent from "../../components/partner.component";
import { useAppContext } from '../../context/appContext'
import { useEffect } from 'react'
import Loading from '../../components/Loading'


const PartnerList = () => {
  const { 
    getPartnerList,
    partnerList,
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
    getPartnerList() 
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])



  if (isLoading) {
    return <Loading center />
  }



    return (
      <>
        <div className="col-md-12"><h1>List of Partner</h1></div>
          <h5>
            {totalJobs} Partner{partnerList.length > 1 && 's'} found
          </h5>
        <div className="col-md-12">
          {partnerList.map((job) => {
          return <PartnerComponent key={job._id} {...job} />
        })}
        </div>
      </>
    )
  }
   
export default PartnerList;