import { useAppContext } from '../context/appContext'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import PageBtnContainer from './PageBtnContainer'

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    projectRequirementSearch,
  } = useAppContext();
  
  useEffect(() => {
    getJobs();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort, projectRequirementSearch]);

  if (isLoading) {
    return <Loading center />;
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No projects to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3>
        <b>My Jobs</b>
      </h3>

      <h5>
        ({jobs.myJobs.length} project{jobs.length > 1 && "s"} found)
      </h5>

      <div className="jobs">
        {jobs.myJobs.map((job) => {
          return <Job key={job._id} {...job} isMy={true} />;
        })}
      </div>

      <h3 className='mt-5'>
        <b>Others' Jobs</b>
      </h3>
      <h5>
        ({jobs.otherJobs.length} project{jobs.length > 1 && "s"} found)
      </h5>

      <div className="jobs">
        {jobs.otherJobs.map((job) => {
          return <Job key={job._id} {...job} isMy={false} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer
