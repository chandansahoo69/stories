import axios from "axios";

const API = axios.create({
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

// List of all the endpoints
export const login = (data: { email: string; password: string; }) => API.post("auth/login", data);
export const register = (data: { username: string; email: string; password: string; }) => API.post("auth/register", data);
export const createPost = (data: any) => API.post("posts", data);
export const upload = (data: FormData) => API.post("upload", data);
export const getUserPosts = (username: any) => API.post("user/posts", username);
export const logout = () => API.post("logout");
export const getAllPosts = (search: string) => API.get(`/posts${search}`);

export const likePost = (id: string) => API.put(`/post/${id}/likePost`);

export const getSinglePost = (path: string) => API.get(`/posts/${path}`);
export const updateSinglePost = (obj: any) => API.put(`/posts/${obj.postId}`, obj);
export const updateUserProfile = (obj: any) => API.put(`/user/${obj.userId}`, obj);
export const deleteSinglePost = (obj: { postId: string; username: string; }) => API.delete(`/posts/${obj.postId}`,{data:{username :obj.username}});




//Interceptors
API.interceptors.response.use(
    (config) => {
      return config; //we dont have to do anything with config
    },
    async (error) => {
      const originalRequest = error.config;
      //if the status code is 401 means it token expired so refresh the token
      
      if (
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._isRetry
      ) {
        //for the first time if then isRetry = undefined so we can enter but
        //we set it to true so next time it will not enter in it.
        originalRequest._isRetry = true;
        try {
          //call with axios not with API axios instance
          //bcz next time new instance will created and you cannot get the old one's data and methods
          await axios.post("/refresh", {
            withCredentials: true, //for sending the cookies
          });
  
          return API.request(originalRequest);
        } catch (error) {
          console.log("Interceptor error-->",error);
        }
      }
      throw error;
    }
  );


export default API;