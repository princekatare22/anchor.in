import { Navbar } from "../Components/Navbar";
import { LeftPanel } from "../Components/LeftPanel";
import "./ShowPosts.css";

export const ShowPosts = () => {
  return (
    <div>
      <Navbar />
      <div className="inner-box">
        <LeftPanel />
        <div className="rightPanel">
          <h3>All Post (count)</h3>
          <div className="post-display">
            <div className="post-section">
              <h2>This is Post Title</h2>
              <div className="commet-section">
                <h4>12 Comments</h4>
                <h4>10 Reply</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
