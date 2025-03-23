const backendDomain = "http://localhost:8080"

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
    
}

export default SummaryApi