let backendHost;
let ngrok_host = "http://localhost:3000";
const hostname = window && window.location && window.location.hostname;

if(hostname === "drivector.com") {
    backendHost = "http:";
} else if(hostname === "localhost:3000") {
    backendHost = ngrok_host;
} else {
    backendHost = ngrok_host;
}

export const ROOT_API = backendHost;