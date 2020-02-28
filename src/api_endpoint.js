let backendHost;
let ngrok_host = "https://9cd1ad3c.ngrok.io";
const hostname = window && window.location && window.location.hostname;

if(hostname === "drivector.com") {
    backendHost = "http:";
} else if(hostname === "localhost:3000") {
    backendHost = ngrok_host;
} else {
    backendHost = ngrok_host;
}

export const ROOT_API = backendHost;