import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { ToastContainer, toast} from 'react-toastify'
import Home from './pages/Home'
import About from './pages/About'
import Upload from './pages/Upload'
import Results from './pages/Results'
import SignUp from './pages/SignUp'
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import SummaryApi from './helpers/SummaryApi'
// import jwt from 'jsonwebtoken'

function App() {
  // const notify = () => {
  //   toast.success("This is a success message!", {
  //     position: "top-center",
  //     autoClose: 2500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "dark",
  //   });
  // };

  const [userDetails, setUserDetails] = useState(null)

  const fetchUserDetails = async()=>{
    
    try {
      if(localStorage.getItem("authToken")){
        console.log("localStrogae", localStorage.getItem("authToken"))

        const dataResponse = await fetch(SummaryApi.userDetails.url, {
          method: SummaryApi.userDetails.method,
          // credentials: 'include'
        })
    
        const dataApi = await dataResponse.json()
        if(dataApi.success){
          setUserDetails(dataApi.data)
        }
        console.log("dataApi", dataApi)
        console.log("dataResponse", dataResponse)
        console.log("userDetails", userDetails)
        toast.success("")
      }
    } 
    catch (err) {
      console.log("Error occured in fetchUserDetails", err)
    }
  }
  
  useEffect(()=>{
    fetchUserDetails()
    console.log("userDetails", userDetails)
  }, )
  // Log userDetails AFTER it updates
  // useEffect(() => {
  //   console.log("Updated userDetails:", userDetails);
  // }, [userDetails]);


  // const fetchUserDetails = async() =>{
  //   const token = localStorage.getItem("authToken")
  //   // const token = localStorage.getItem("authToken")

  //   if(token){
  //     console.log("token", token)
  //     // const decoded = jwt.verify(token, "BE-STRONG")
  //     // console.log("User Id: ", decoded.userId)
  //     const url = `${SummaryApi.userDetails.url}?token=${token}`; // Pass token in URL
  //     const dataResponse = await fetch(url, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type" : "application/json",
  //         Authorization : `Bearer ${token}`,
  //       },
  //       // body:JSON.stringify({token: token})
  //     })
  //     if(!dataResponse.ok) throw new Error("Failed to fetch user details")

  //     const dataApi = await dataResponse.json()
  //     if(dataApi.success) {
  //       setUser(dataApi.data)
  //     }else{
  //       toast.error("Something wrong in fetchUserDetails at App.jsx")
  //     }
  //     console.log("dataApi.data", dataApi)
  //   }
  // }


  // if(user) 
    // console.log("useEffect user: ", user)
    // else console.log("User not exist")

  return (
    <Router>
        <ToastContainer position='top-center' />
        {/* <div className=''> */}
          <Header />
          <div className='min-h-screen pt-16 overflow-x-hidden relative flex flex-col'>
              {/* <button onClick={notify}>Show Toast</button> */}
            <div className='flex-grow'>
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/upload' element={<Upload/>} />
                <Route path='/about' element={<About/>} />
                <Route path='/results' element={<Results/>} />
              </Routes>
            </div>
          </div>
          <Footer className='mt-auto'/> 
        {/* </div> */}
    </Router>
  )
}

export default App
