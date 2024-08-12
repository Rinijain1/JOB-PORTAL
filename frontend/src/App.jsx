import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // If you're using a token-based system, retrieve the token from localStorage or another method
        const token = localStorage.getItem("authToken");

        // Make the API call to fetch the user data
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header, if applicable
            },
            withCredentials: true, // Ensure that cookies are sent with the request
          }
        );

        // Set the user data in the global context
        setUser(response.data.user);
        setIsAuthorized(true); // Mark the user as authorized

      } catch (error) {
        // Handle errors, such as 401 Unauthorized
        setIsAuthorized(false);
        console.error("Error fetching user:", error);
      }
    };

    fetchUser(); // Call the function to fetch user data when the component mounts
  }, [isAuthorized, setUser, setIsAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* Navigation bar component */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> {/* Footer component */}
        <Toaster /> {/* Toaster for notifications */}
      </BrowserRouter>
    </>
  );
};

export default App;
