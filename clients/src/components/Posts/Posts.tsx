import Post from "../Post/Post";

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

const Posts:React.FC<PostState> = ({posts}) => {
  return (
    <div className="flex flex-wrap -m-4">
        {posts.map((post)=>(
            <Post post={post} />
        ))}
    </div>
  );
}
export default Posts;