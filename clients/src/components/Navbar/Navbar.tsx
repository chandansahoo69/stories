import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../api';
import { RootState } from '../../app/store';
import { Logout } from '../../features/authSlice';

const Navbar = () => {
    const User:any = useSelector((state: RootState) => state.authSclice.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        //logout axois call
        logout();
        dispatch(Logout());
    }
    
    return (
        <>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <NavLink to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl">Stories</span>
                    </NavLink>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <NavLink to="/" className="mr-5 hover:text-gray-900">Home</NavLink>
                        {/* <NavLink to="/about" className="mr-5 hover:text-gray-900">About</NavLink> */}
                        <NavLink to="/contact" className="mr-5 hover:text-gray-900">Contact</NavLink>
                        <NavLink to="/write" className="mr-5 hover:text-gray-900">Write</NavLink>
                        <NavLink to="/settings" className="mr-5 hover:text-gray-900">Settings</NavLink>
                        {User && <button className="mr-5 bg-purple-700 text-white border-0 py-2 px-4 focus:outline-none hover:bg-purple-500 rounded text-sm" onClick={handleLogout}>Logout</button>}
                        {User ? (
                        <>
                            <NavLink to="/settings" className="mr-5 hover:text-gray-900">
                                <img
                                    className="w-14 h-14 text-white p-2 rounded-full"
                                    src={`http://localhost:5000/images/${User.profilePic}`}
                                    alt="profile"
                                />
                            </NavLink>
                        </>
                        ) : (
                        <>
                            <NavLink to="/login" className="mr-5 hover:text-gray-900">Login</NavLink>
                            <NavLink to="/register" className="mr-5 hover:text-gray-900">Register</NavLink>
                        </>
                        )}
                    </nav>
                    {/* <div className="flex mx-2">
                        <div className="flex border-2 rounded-lg">
                            <button className="flex items-center justify-center px-4 border-r">
                                <svg className="w-6 h-6 text-purple-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z">
                                    </path>
                                </svg>
                            </button>
                            <input type="text" className="px-4 py-2 w-40 border-0 outline-none" placeholder="Search..."/>
                        </div>
                    </div> */}
                </div>
            </header>
        </>
    )
}

export default Navbar
