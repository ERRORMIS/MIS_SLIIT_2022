import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_STAFFLIST_BEGIN,
  GET_STAFFLIST_SUCCESS,
  GET_ALUMNI_BEGIN,
  GET_ALUMNI_SUCCESS,
  GET_PARTNER_BEGIN,
  GET_PARTNER_SUCCESS,
  GET_STUDENT_BEGIN,
  GET_STUDENT_SUCCESS,
  GET_FILTERED_USER_BASE_ON_PROJECT_REQUIREMENT,
  STOP_LOADING,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  title: "",
  owner: "",
  description: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "",
  statusOptions: ["ongoing", "declined", "pending"],
  projectRequirement: [
    { value: "computing", label: "Computing" },
    { value: "it", label: "IT" },
    { value: "networking", label: "Networking" },
  ],
  status: "pending",
  jobs: [],
  staffList: [],
  alumniList: [],
  partnerList: [],
  studentList: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  projectRequirementSearch: "all",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  getUserDetails: [],
  startDate: "",
  endDate: "",
  requirement: [],
  filteredUserBasedOnProjectRequirement: {},
  teamMembers: {
    studentList: [],
    alumniList: [],
    staffList: [],
  },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["token"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/user/register`, currentUser);

      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const loginUser = async ({ currentUser, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/testLogin`, currentUser);

      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText },
      });

      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      console.log(currentUser)
      const { data } = await authFetch.post("/user/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    // console.log("handle change method " + value);
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const {
        title,
        owner,
        description,
        jobType,
        status,
        startDate,
        endDate,
        requirement,
        teamMembers,
      } = state;
      await authFetch.post("/jobs", {
        title,
        owner,
        description,
        jobType,
        status,
        startDate,
        endDate,
        requirement,
        teamMembers,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const {
      page,
      search,
      searchStatus,
      searchType,
      sort,
      projectRequirementSearch,
    } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}&requirement=${projectRequirementSearch}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getStaffList = async () => {
    let url = `/user/getAllStaff`;
    dispatch({ type: GET_STAFFLIST_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { staffList, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_STAFFLIST_SUCCESS,
        payload: {
          staffList,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getAlumniList = async () => {
    let url = `/user/getAllAlumni`;
    dispatch({ type: GET_ALUMNI_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { alumniList, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_ALUMNI_SUCCESS,
        payload: {
          alumniList,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getPartnerList = async () => {
    let url = `/user/getAllPartner`;
    dispatch({ type: GET_PARTNER_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { partnerList, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_PARTNER_SUCCESS,
        payload: {
          partnerList,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const getStudentList = async () => {
    let url = `/user/getAllStudent`;
    dispatch({ type: GET_STUDENT_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { studentList, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_STUDENT_SUCCESS,
        payload: {
          studentList,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const {
        title,
        owner,
        description,
        jobType,
        status,
        startDate,
        endDate,
        requirement,
        teamMembers,
      } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        owner,
        title,
        description,
        jobType,
        status,
        startDate,
        endDate,
        requirement,
        teamMembers,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
      const body = {
        requirements: [],
      };
      getUsersBaseOnProjectRequirements(body);
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const sendComment = async (projectId, body) => {
    const { data } = await authFetch.patch(
      `/jobs/${projectId}/post-comment`,
      body
    );
    getJobs();
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getUserDataByID = async (email, type) => {
    console.log("run get user by id method " + email + " " + type);
    try {
      const { data } = await authFetch.post("/user/getUserByID", {
        email,
        type,
      });

      const { getData } = data;
      // console.log(getData);
      return getData;
      // this.getUserDetails = getData;
    } catch (error) {
      console.log(error);
      // if (error.response.status === 401) return
      // dispatch({
      //   type: CREATE_JOB_ERROR,
      //   payload: { msg: error.response.data.msg },
      // })
    }
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const uploadProfile = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { selectedImage, id, type } = currentUser;
      const formData = new FormData();
      formData.append("photo", selectedImage);
      formData.append("id", id);
      formData.append("type", type);

      const { data } = await authFetch.post("/user/updateProfileImg", formData);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }

    clearAlert();
  };

  const getUsersBaseOnProjectRequirements = async (body) => {
    try {
      const { data } = await authFetch.post(
        "/jobs/filterUsersByProjectRequirement",
        body
      );
      dispatch({
        type: SETUP_USER_BEGIN,
      });
      dispatch({
        type: GET_FILTERED_USER_BASE_ON_PROJECT_REQUIREMENT,
        payload: data,
      });
      setTimeout(() => {
        dispatch({
          type: STOP_LOADING,
        });

      }, 800)
    } catch (error) {}
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        getStaffList,
        getAlumniList,
        getPartnerList,
        getStudentList,
        setEditJob,
        deleteJob,
        editJob,
        sendComment,
        showStats,
        clearFilters,
        changePage,
        loginUser,
        getUserDataByID,
        uploadProfile,
        getUsersBaseOnProjectRequirements,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
