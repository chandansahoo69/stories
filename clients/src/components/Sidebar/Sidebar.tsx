import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
interface Provider {
    type: string[];
  }
export default function Sidebar() {
    const User:any = useSelector((state: RootState) => state.authSclice.user);
    
    //get a random color
    const categoryColor = ["yellow", "blue", "green", "pink", "purple", "red"];

    let products: any[] = [];
    let set = new Set();
    const Posts:any = useSelector((state: RootState) => state.postSclice.post);
    useEffect(() => {
        Posts.map((Post:any)=>(
            Post.categories.map((e: any)=>(
                <>{set.add(e)}</>
            ))
        ))
        // console.log(set.size);
        
        set.forEach(function(value) {
            {products.push(value)}             
        });
        
        // console.log("products-",products);
    }, [])
    
  return (
    <div className="xl:w-full md:w-auto p-4 -mt-8 rounded-md bg-purple-100 bg-opacity-25">
      <div className="sidebarItem">
        <div className="xl:w-full md:w-full px-2 divide-y divide-purple-200">
            <h1 className="sm:text-2xl text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">ABOUT ME</h1>
            <div className="xl:w-full md:w-full">
                <div className="p-2 rounded-lg">
                    {User && <img className="h-40 rounded w-full object-cover object-center mb-6" src={`http://localhost:5000/images/${User.profilePic}`} alt="content"/>}
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">SUBTITLE</h3>
                    {User && <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{User.username}</h2>}
                    {User && <p className="leading-relaxed text-base">{ User.bio}</p>}
                </div>
            </div>
        </div>
      </div>
      <div className="xl:w-full md:w-full px-2 py-4 divide-y divide-purple-200">
        <h1 className="sm:text-2xl text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">CATEGORIES</h1>
        <div className="flex flex-wrap lg:w-full sm:mx-auto sm:mb-2 py-2">
            {
                Posts.map((Post:any)=>(
                    Post.categories.map((e: any)=>(
                        <>
                            <div className="p-2 sm:w-auto w-auto">
                                <NavLink to={`?cat=${e}`}>
                                    <div className={`bg-${categoryColor[Math.floor(Math.random()*categoryColor.length)]}-700 bg-opacity-50 rounded flex p-2 h-auto items-center`}>
                                        <span className="title-font font-medium">{e}</span>
                                    </div>
                                </NavLink>
                            </div>  
                        </>
                    ))
                ))
            }
        </div>
      </div>
      <div className="xl:w-full md:w-full px-2 divide-y divide-purple-200">
      <h1 className="sm:text-2xl text-xl text-indigo-500 tracking-widest font-medium title-font mb-1">FOLLOW US</h1>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
