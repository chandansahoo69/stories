import { NavLink } from "react-router-dom";

interface postState {
    post:{
        categories: string[]
        createdAt: Date
        desc: String
        title: String
        photo: String
        updatedAt: Date
        username: String
        _id: String
    }
}

const Post: React.FC<postState> = ({ post }) => {
    
  return (
      <>
        <div className="p-4 md:w-1/2">
        <NavLink to={`/post/${post._id}`}>
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {post.photo && 
                <img className="lg:h-48 md:h-36 w-full object-cover object-center" src={`http://localhost:5000/images/${post.photo}`} alt="blog" /> 
            }
            <div className="p-6">
                {post.categories && post.categories.map((category)=>(
                    <span className="inline-block py-1 px-2 mr-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                        <NavLink to={`?cat=${category}`}>
                            {category}
                        </NavLink>
                    </span>
                ))}
                
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{post.title}</h1>
                <span className="title-font text-sm font-normal text-yellow-400 mb-3">{new Date(post.createdAt).toDateString()}</span>
                <p className="leading-relaxed mb-3">{post.desc}</p>
                <div className="flex items-center flex-wrap ">
                <button className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"> see more
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                    </svg>
                </button>
                <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    </svg>1.2K
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <svg className="w-4 h-4 mr-1" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>6
                </span>
                </div>
            </div>
            </div>
            </NavLink>
        </div>
    </>
  );
};

export default Post;
