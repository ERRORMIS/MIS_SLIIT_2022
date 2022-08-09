import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Landing, Error, ProtectedRoute, RegisterPage } from "./pages";
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats, 
  AddJob,
} from "./pages/dashboard";
import AcademicStaff from "./pages/dashboard/AcademicStaff";
import AlumniList from "./pages/dashboard/AlumniList";
import PartnerList from "./pages/dashboard/PartnerList";
import ProfileList from "./pages/dashboard/ProfileList";
import Faculty from "./pages/dashboard/Faculty";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import ResetPasswordScreen from "./pages/ResetPasswordScreen";
import Search from "./pages/dashboard/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        > 
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="academic-staff" element={<AcademicStaff />} />
          <Route path="alumni-list" element={<AlumniList />} />
          <Route path="partner-list" element={<PartnerList />} />
          <Route path="profile-list" element={<ProfileList />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/login" element={< Register />} />
        <Route path="/register" element={< RegisterPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route path="/resetpassword" element={<ResetPasswordScreen />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
