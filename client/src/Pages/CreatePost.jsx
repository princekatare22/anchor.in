import { Navbar } from "../Components/Navbar";
import { LeftPanel } from "../Components/LeftPanel";
import "./CreatePost.css";

export const CreatePost = () => {
  return (
    <div>
      <Navbar />
      <div className="inner-box">
        <LeftPanel />
        <div className="rightPanel">
          <h3>Create Post</h3>
          <input type="text" placeholder="Post Title..." />
          <br />
          <input
            className="post"
            type="text"
            placeholder="Describe your post..."
          />
          <br />
          <button> Post Summit</button>
        </div>
      </div>
    </div>
  );
};
