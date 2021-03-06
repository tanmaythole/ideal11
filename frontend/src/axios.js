import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL
const axiosInstance =  axios.create({
    baseURL: baseURL,
    headers:{
        Authorization: localStorage.getItem('accessToken')?'Bearer '+localStorage.getItem('accessToken'):null,
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    
    async function(error){
        const originalRequest = error.config;

        if(typeof error.response==='undefined'){
            alert("Something Went Wrong");
            return Promise.reject(error);
        }

        if(error.response.status===401 && originalRequest.url === baseURL + 'token/refresh/'){
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if(error.response.data.code === 'token_not_valid' && error.response.status===401 && error.response.statusText==='Unauthorized'){
            const refreshToken = localStorage.getItem('refreshToken');

            if(refreshToken){
                const exp = JSON.parse(atob(refreshToken.split('.')[1])).exp;
                const now = Math.ceil(Date.now() / 1000);
                if(exp > now){
                    return axiosInstance
                            .post(`auth/token/refresh/`, {refresh:refreshToken})
                            .then((res) => {
                                localStorage.setItem('accessToken', res.data.access);

                                axiosInstance.defaults.headers['Authorization'] =
                                    'Bearer ' + res.data.access;
                                originalRequest.headers['Authorization'] =
                                    'Bearer ' + res.data.access;

                                return axiosInstance(originalRequest);
                            })
                }
                else{
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            }
            else{
                window.location.href = '/login';
            }
        }
        console.log(error.response.data);
        return Promise.reject(error);
    }
)

export default axiosInstance;
