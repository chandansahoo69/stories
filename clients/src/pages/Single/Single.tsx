import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/SinglePost/SinglePost";

export default function Single() {
  return (
    
    <div className="container px-10 py-14 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-3/4 md:w-1/2 bg-purple-100 bg-opacity-25 rounded-md overflow-hidden sm:mr-10 p-2">
            <SinglePost />
        </div>
        <div className="lg:w-1/4 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-4 md:mt-0">
            <Sidebar />
        </div>
    </div>
  );
}
