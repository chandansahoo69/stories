import { NavLink } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { deleteSinglePost, getSinglePost, likePost, updateSinglePost } from "../../api";
import { setUpdatePostsData } from "../../features/postSlice";

interface postInitialState {
    categories: string[]
    createdAt: Date
    desc: string
    title: string
    photo:string,
    updatedAt: Date
    username: string
    _id: string
}
const SinglePost = () => {
    const dispatch = useDispatch();
    const User:any = useSelector((state: RootState) => state.authSclice.user);
    const Post:any = useSelector((state: RootState) => state.postSclice.post);
    const history = useHistory();
    const location = useLocation();
    const [post, setPost] = useState<postInitialState>({
        categories: [],
        createdAt: new Date,
        desc: "",
        title: "",
        photo: "",
        updatedAt: new Date,
        username: "",
        _id: "",
    })
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [tags, setTags] = useState<string[]>([]);

    const [updateMode, setUpdateMode] = useState<boolean>(false);

    //if the post id changes it will fetch the post data
    const path = location.pathname.split("/")[2];

    const handleDelete = async () =>{
        try {
            let postId = post._id;
            let username = User.username;
            //delete the post
            deleteSinglePost({postId, username});
            history.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () =>{
        try {
            let postId = post._id;
            let username = User.username;
            let categories = tags;
            //update the post
            const res = await updateSinglePost({postId,username,title,desc,categories});
            console.log(res.data);
            let data = res.data;
            dispatch(setUpdatePostsData({Post, data}));
            setUpdateMode(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const getPost = async () =>{
            //get the single post values
            const res = await getSinglePost(path);
            console.log(res.data);
            setPost(res.data)
            setTitle(res.data.title);
            setDesc(res.data.desc);
            setTags(res.data.categories)
        }
        getPost();
    }, [path])

    const handleLikePost = async() => {
        const res = await likePost(post._id);
        console.log("updated post with like", res.data);
        let data = res.data;
        dispatch(setUpdatePostsData({Post, data}));
    }
    
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="w-full">
                  <div className="p-12 md:w-full w-full flex flex-col items-start">
                    <img className="h-60 rounded w-full object-cover object-center mb-6" src={`http://localhost:5000/images/${post.photo}`} alt="content"/>
                    <div className="flex flex-row flex-wrap">
                        {updateMode ? 
                        <>
                            <input
                                value={tags} 
                                onChange={(e=>setTags(e.target.value.split(",")))}
                                className="w-full bg-white rounded border border-gray-300 my-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                type="text"
                                autoFocus={true}
                            />
                        </>
                         : (
                             post.categories && tags.map((category)=>(
                            <span className="inline-block py-1 px-2 mr-2 rounded bg-indigo-50 text-indigo-500 text-xs font-medium tracking-widest">
                                <NavLink to={`/?cat=${category}`}>
                                    {category}
                                </NavLink>
                            </span>
                        )))
                        }
                    </div>
                    {
                    updateMode ? 
                        <input
                            value={title} 
                            onChange={(e=>{setTitle(e.target.value)})}
                            className="w-full bg-white rounded border border-gray-300 my-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            type="text"
                            autoFocus={true}
                        />
                    : (
                        <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 mt-4 mb-4">{title}</h2>
                    )}
                    {updateMode ? 
                        <textarea value={desc} onChange={(e=>{setDesc(e.target.value)})} id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 my-4 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                    : (
                        <p className="leading-relaxed mb-8">{desc}</p>
                    )}
                    {updateMode ? 
                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 my-4 focus:outline-none hover:bg-indigo-600 rounded text-lg w-auto" type="submit" onClick={handleUpdate}>Update Post</button>
                     : 
                        <></>
                    }
                    <span className="title-font text-sm font-normal text-yellow-400 mb-3">{new Date(post.createdAt).toDateString()}</span>
                    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-100 mt-auto w-full">
                        <NavLink to={`/?user=${post.username}`} className="inline-flex items-center">
                        <span className="title-font font-bold text-gray-800">Author{" "}:</span>
                            <span className="flex-grow flex flex-col pl-2">
                                <span className="title-font font-medium text-indigo-500">{post.username}</span>
                            </span>
                        </NavLink>
                    {post.username === User?.username && (
                        <>
                            <span className="text-gray-400 mr-3 cursor-pointer inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200 svg-icon svg-icon-primary svg-icon-2x" onClick={()=>setUpdateMode(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"/>
                                        <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                        <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                    </g>
                                </svg>
                            </span>
                            <span className="text-gray-400 inline-flex cursor-pointer items-center leading-none text-sm svg-icon svg-icon-primary svg-icon-2x" onClick={handleDelete}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <rect x="0" y="0" width="24" height="24"/>
                                        <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                                        <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                                    </g>
                                </svg>
                            </span>
                        </>
                    )}
                    </div>
                    <button onClick={handleLikePost} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
export default SinglePost