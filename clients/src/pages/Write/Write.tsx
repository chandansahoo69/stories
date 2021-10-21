import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createPost, upload } from "../../api";
import { RootState } from "../../app/store";

interface PostState {
    title:string,
    desc: string,
    categories:string[],
    username: string,
    photo: string
}

export default function Write() {
    const history = useHistory();
    const [title, setTitle] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [desc, setDesc] = useState<string>("");
    const [img, setImage] = useState<File>();
    const User:any = useSelector((state: RootState) => state.authSclice.user);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        //create a newpost to send the backend
        const newPost:PostState = {
            title: title,
            desc: desc,
            categories: tags,
            username: User.username,
            photo: ""
        }

        if(img){
            const data = new FormData();
            const filename = Date.now() + img.name
            data.append("name", filename);
            data.append("file", img);
            newPost.photo = filename;
            try {
                //store the image in backend folder
                await upload(data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await createPost(newPost);
            console.log(res);            
            history.push("/post/"+res.data._id);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="container px-40 py-14">
        {img && (
            <img 
                className="h-60 rounded w-full object-cover object-center mb-6" 
                src={URL.createObjectURL(img)}
                alt="content"
            />
        )}
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div>
            <div className="flex flex-row py-4 items-center">
                <label htmlFor="fileInput">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                </label>
                <input 
                    id="fileInput" 
                    type="file" 
                    style={{ display: "none" }} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        if (!e.target.files) return
                        setImage(e.target.files[0])
                    }} 
                />
                <span className="flex flex-row px-2">Choose an image</span>
            </div>
            <input
                value={title} 
                onChange={(e=>{setTitle(e.target.value)})}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Title"
                type="text"
                autoFocus={true}
            />
            <input
                value={tags} 
                onChange={(e=>setTags(e.target.value.split(",")))}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="tags"
                type="text"
            />
        </div>
        <div className="container py-24 mx-auto flex sm:flex-nowrap flex-wrap lg:w-full md:w-full bg-white    flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-indigo-500 text-lg mb-1 font-medium title-font text-left">Write Your Stories Here...</h2>
            <div className="relative mb-4">
                <textarea value={desc} onChange={(e=>{setDesc(e.target.value)})} id="message" name="message" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-32" type="submit">Publish</button>
            <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
        </div>
        
      </form>
    </div>
  );
}
