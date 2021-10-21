import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { getAllPosts } from "../../api";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import { setPostsData } from "../../features/postSlice";

interface PostState {
    posts:{
        categories: string[]
        createdAt: Date
        desc: String
        title: String
        photo: String
        updatedAt: Date
        username: String
        _id: String
    }[]
}

const Homepage = () => {
    const [posts, setPosts] = useState<PostState["posts"]>([]);
    const {search} = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        
        const fetchPosts = async () =>{
            //get all posts 
            const res = await getAllPosts(search);
            setPosts(res.data)
            dispatch(setPostsData(res.data))
        }
        fetchPosts();
    }, [search])
  return (
    <>
      <Header />
      <section className="text-gray-600 body-font relative">
        <div className="container px-10 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
            <div className="lg:w-3/4 md:w-1/2 bg-purple-100 bg-opacity-25 rounded-md overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                <Posts posts={posts} />
            </div>
            <div className="lg:w-1/4 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                <Sidebar />
            </div>
        </div>
      </section>
    </>
  );
}
export default Homepage;