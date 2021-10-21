import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { setUpdateProfile} from "../../features/authSlice";
import { TabGroup } from '@statikly/funk'
import { getUserPosts, updateUserProfile, upload } from "../../api";

interface PostState {
    userId: string,
    username:string,
    email:string,
    password: string,
    bio: string,
    profilePic: string
}

export default function Settings() {
    const dispatch = useDispatch();
    const [updateProfileMode, setUpdateProfileMode] = useState<boolean>(true);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [profilePic, setProfilePic] = useState<File>();
    const [success, setSuccess] = useState<boolean>(false);

    //get user from redux store
    const User:any = useSelector((state: RootState) => state.authSclice.user);

    useEffect(() => {
        setUsername(User.username);
        setProfilePic(User.profilePic)
        setEmail(User.email);
        setBio(User.bio);
     }, [])

    const handleDeleteAccount = async ()=>{
        try {
            // await axios.delete(`/user/${User._id}`, {userId: User._id},{
            //     headers:{authorization:`Bearer ${accessToken}`}
            // })
            // console.log("success");
            // dispatch(Logout());
            console.log("working");
            
        } catch (error) {
            console.log("Deleting user===",error);
        }
    }

    const handleSubmit = async () =>{
        //create a newpost to send the backend
        const updatedUser:PostState = {
            userId: User._id,
            username,
            email,
            password,
            bio,
            profilePic: User.profilePic
        }
        console.log("update profile---->", updatedUser);
        
        if(profilePic){
            const data = new FormData();
            const filename = Date.now() + profilePic.name
            data.append("name", filename);
            data.append("file", profilePic);
            updatedUser.profilePic = filename;
            try {
                //store the image in backend folder
                await upload(data);
            } catch (error) {
                console.log(error);
            }
        }

        try {
            //update user profile            
            const res = await updateUserProfile(updatedUser);

            console.log("after update------>",res.data);
            setSuccess(true);
            dispatch(setUpdateProfile(res.data))
            setUpdateProfileMode(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getUserPost = async()=> {
        let username = User.username;
        const res = await getUserPosts({username});
        console.log("testing posts - >", res.data);
    }

  return (
    <div className="container px-10 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="h-screen w-screen flex flex-col">
            <TabGroup numTabs={3} direction={TabGroup.direction.HORIZONTAL}>
                <TabGroup.TabList>
                <TabGroup.Tab
                    index={0}
                    className="h-12 px-12 transition-colors duration-150"
                    activeClassName="bg-black text-white"
                    inactiveClassName="text-black"
                >
                    Profile
                </TabGroup.Tab>
                <span
                    onClick={getUserPost}
                >
                    <TabGroup.Tab
                        index={1}
                        className="h-12 px-12 transition-colors duration-150"
                        activeClassName="bg-black text-white"
                        inactiveClassName="text-black"
                    >
                        Posts
                    </TabGroup.Tab>
                </span>
                <TabGroup.Tab
                    index={2}
                    className="h-12 px-12 transition-colors duration-150"
                    activeClassName="bg-black text-white"
                    inactiveClassName="text-black"
                >
                    Posts
                </TabGroup.Tab>
                </TabGroup.TabList>
                <TabGroup.TabPanel
                    index={0}
                    className="p-16 transition-all transform h-64"
                    activeClassName="opacity-100 duration-500 translate-x-0"
                    inactiveClassName="absolute opacity-0 -translate-x-2"
                >
                    <div className="lg:w-full md:w-full bg-purple-100 bg-opacity-25 rounded-md overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <div className="lg:w-full md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                            <div className="flex flex-row justify-between border-b-2 border-purple-400 py-2">
                                <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Profile</h2>
                                {!updateProfileMode ? 
                                    <></>
                                : (
                                    <>
                                    <span className="text-gray-400 mr-3 cursor-pointer inline-flex items-center ml-auto leading-none text-sm pr-3 py-1 svg-icon svg-icon-primary svg-icon-2x" onClick={()=>setUpdateProfileMode(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#000000" fill-rule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                                <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                            </g>
                                        </svg>
                                    </span>
                                    {/* <span className="text-gray-400 inline-flex cursor-pointer items-center leading-none text-sm svg-icon svg-icon-primary svg-icon-2x" onClick={handleDeleteAccount}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <rect x="0" y="0" width="24" height="24"/>
                                                    <path d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" fill="#000000" fill-rule="nonzero"/>
                                                    <path d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>
                                                </g>
                                            </svg>
                                        </span> */}
                                    </>
                                )}
                            </div>
                            <div className="flex flex-row  items-center">
                                <div className="mr-5 hover:text-gray-900">
                                {profilePic ? (
                                        <img 
                                            className="h-60 rounded w-full object-cover object-center mb-6" 
                                            src={`http://localhost:5000/images/${User.profilePic}`}
                                            alt="content"
                                        />
                                    ):(
                                        <img
                                            className="w-24 h-24 text-white p-2 rounded-full"
                                            src={User ? `${User.profilePic}` : 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
                                            alt="profile"
                                        />
                                    )}
                                </div>
                                {updateProfileMode ? 
                                    <></>
                                : (
                                    <>
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
                                                setProfilePic(e.target.files[0])
                                            }} 
                                        />
                                    </>
                                )}
                            </div>
                            <div className="relative mb-4">
                                {updateProfileMode ? 
                                    <h2 className="sm:text-3xl text-2xl title-font font-medium text-gray-900 my-2">{username}</h2>
                                : (
                                    <>
                                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                        <input type="name" id="name" name="name" placeholder="Safak" value={username} onChange={(e)=>setUsername(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    </>
                                )}
                            </div>
                            <div className="relative mb-4">
                            {updateProfileMode ? 
                                    <h5 className="sm:text-base text-base title-font font-normal text-gray-700 my-2">{email}</h5>
                                : (
                                    <>
                                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="safak@gmail.com" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                    </>
                                )}
                            </div>
                            <div className="relative mb-4">
                            {updateProfileMode ? 
                                <h5 className="sm:text-base text-base title-font font-normal text-gray-700 my-2">***********</h5>
                            : (
                                <>
                                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                    <input type="password" id="password" name="password" placeholder="*******" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                </>
                            )}
                            </div>
                            <div className="relative mb-4">
                            {updateProfileMode ? 
                                <h5 className="sm:text-base text-base title-font font-normal text-gray-700 my-2">{User.bio}</h5>
                            : (
                                <>
                                    <label htmlFor="bio" className="leading-7 text-sm text-gray-600">Bio</label>
                                    <textarea id="bio" name="bio" value={bio} onChange={(e)=>setBio(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </>
                            )}
                            </div>
                            {updateProfileMode ? 
                                <></>
                            : (
                                <button className="text-white bg-indigo-500 border-0 py-2 px-6 w-auto focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={handleSubmit}>Update</button>
                            )}
                            {success && 
                                <p className="text-xs text-green-700 mt-3">Profile has been updated...</p>
                            }
                        </div>
                    </div>
                </TabGroup.TabPanel>
                <TabGroup.TabPanel
                    index={1}
                    className="p-16 transition-all transform h-auto flex flex-col"
                    activeClassName="opacity-100 duration-500 translate-x-0"
                    inactiveClassName="absolute opacity-0 -translate-x-2"
                >
                    posts
                </TabGroup.TabPanel>
                <TabGroup.TabPanel
                index={2}
                className="p-16 transition-all transform h-64"
                activeClassName="opacity-100 duration-500 translate-x-0"
                inactiveClassName="absolute opacity-0 -translate-x-2"
                >
                Content 3
                </TabGroup.TabPanel>
            </TabGroup>
            </div>
    </div>
  );
}
