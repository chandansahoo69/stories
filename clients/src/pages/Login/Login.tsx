import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { setLoginFailed, setLoginSuccess } from "../../features/authSlice";
import { login } from "../../api";

export default function Login() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setLoading(true);
        try {
            const res = await login({email, password});
            console.log("res----------------------",res.data);
            
            dispatch(setLoginSuccess(res.data))
            history.push("/");
        } catch (error) {
            console.log(error);
            dispatch(setLoginFailed());
        } finally{
            setLoading(false);
        }
        setEmail("")
        setPassword("")
    }
    
  return (
    <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
            <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
            <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input value={email} onChange={(e=>{setEmail(e.target.value)})} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <div className="relative mb-4">
                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                <input value={password} onChange={(e=>{setPassword(e.target.value)})} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <button disabled={loading} className={`text-white disabled:opacity-50 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${loading ? 'cursor-wait' : ''}`} onClick={handleSubmit}>{loading ? 'Wait a Minute...' : "Sign In"}</button>
                <p className="text-xs text-gray-500 mt-3">Don't have an Account? {" "}
                    <span>
                        <NavLink to="/register" className="text-indigo-500 hover:text-indigo-900">Sign Up</NavLink>
                    </span>
                    {"  "}here.
                </p>
            </div>
        </div>
    </section>
  );
}
