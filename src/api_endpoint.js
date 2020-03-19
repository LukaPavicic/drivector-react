let backendHost;
//let ngrok_host = "https://stark-woodland-16765.herokuapp.com";
let ngrok_host = "http://localhost:3000";
const hostname = window && window.location && window.location.hostname;

if(hostname === "drivector.com") {
    backendHost = "https://stark-woodland-16765.herokuapp.com";
} else if(hostname === "localhost:3000") {
    backendHost = ngrok_host;
} else {
    backendHost = ngrok_host;
}

export const ROOT_API = backendHost;