// const backendDomain = "http://localhost:8080"
// const backendDomain = "https://pic-lingo-server.vercel.app"
const backendDomain = "https://piclingo.onrender.com"

const SummaryApi = {
    signUp:{
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    login:{
        url: `${backendDomain}/api/login`,
        method: "POST" 
    },
    userDetails:{
        url: `${backendDomain}/api/user-details`,
        method: "GET" 
    },
    userLogout:{
        url: `${backendDomain}/api/user-logout`,
        method: "GET" 
    },
    saveCaptions:{
        url: `${backendDomain}/api/save-caption`,
        method: "POST"
    }
}

export default SummaryApi
