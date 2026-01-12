// import React from "react";
// import LandingPage from "./pages/LandingPage/LandingPage";

// function App() {
//   return <LandingPage />;
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginModal from "./components/LoginModal";

import UsersPage from "./components/UsersPage";
import AuthGuard from "../auth/AuthGuard";
import BlogList from "./components/BlogList";
import AdminDashboard from "./components/AdminDashboard";
import Transfers from "./components/Transfers";
import SignupModal from "./components/SignupModal";


const getUser = () => JSON.parse(localStorage.getItem("user"));

function App() {
  const user = getUser();

  return (
    <Router>
      <SignupModal/>
    \
      <LoginModal />
      <Routes>
        
        <Route path="/landingpage" element={<LandingPage />}/>

      
        <Route path="/loginpage" element={<LoginModal />} />
        <Route path="/signuppage" element={<SignupModal/>} />

      
        <Route
          path="/users"
          element={
            <AuthGuard>
              <UsersPage />
            </AuthGuard>
          }
        />

      
        <Route
          path="/blog"
          element={
            <AuthGuard>
              <BlogList />
            </AuthGuard>
          }
        />

        <Route
    path="/transfers"
    element={
      <AuthGuard>
        <Transfers/>
      </AuthGuard>
    }
  />

        
        <Route
          path="/admin"
          element={
            <AuthGuard>
              {user?.role === "admin" ?  (
                <AdminDashboard />) : (
                <Navigate to="/landingpage" />
              )}
            </AuthGuard>
          }
        />


        <Route path="*" element={<Navigate to="/landingpage" />} />
      </Routes>
    </Router>
  );
}

export default App;
