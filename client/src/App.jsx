import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { ToastContainer, toast } from 'react-toastify';
import Home from './pages/Home';
import About from './pages/About';
import Upload from './pages/Upload';
import Results from './pages/Results';
import SignUp from './pages/SignUp';
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import SummaryApi from './helpers/SummaryApi';

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.warn("No token or userId found in localStorage");
        return;
      }

      console.log("Fetching user details for userId:", userId);

      const dataResponse = await fetch(`${SummaryApi.userDetails.url}?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token for secure API calls
        },
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        setUserDetails(dataApi.data);
      } else {
        toast.error("Failed to fetch user details");
      }

      console.log("API Response:", dataApi);
    } catch (err) {
      console.error("Error occurred in fetchUserDetails", err);
      toast.error("Error fetching user details");
    }
  };

  console.log("userDetails vinay:", userDetails);
  // Fetch user details on mount
  useEffect(() => {
    fetchUserDetails();
  }, []); // Empty array to ensure it runs only once

  // Log user details whenever it updates
  useEffect(() => {
    console.log("Updated userDetails:", userDetails);
  }, [userDetails]);

  return (
    <Router>
      <ToastContainer position="top-center" />
      <Header />
      <div className="min-h-screen pt-16 overflow-x-hidden relative flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
      <Footer className="mt-auto" />
    </Router>
  );
}

export default App;
