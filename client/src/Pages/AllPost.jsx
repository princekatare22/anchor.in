import { Navbar } from "../Components/Navbar";
import { LeftPanel } from "../Components/LeftPanel";
import "./AllPost.css";

export const AllPost = () => {
  return (
    <div>
      <Navbar />
      <div className="inner-box">
        <LeftPanel />
        <div className="rightPanel">
          <h3>All Post (count)</h3>
          <div className="post-display">
            <h2>This is Post Title</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestiae iste magni aspernatur. Non fuga laudantium rerum error
              debitis recusandae tempora numquam provident, minima, ad delectus
              natus alias voluptatibus,
            </p>
            <div className="commet-section">
              <h4>(0) Comment</h4>
              <h4>(0) Replies</h4>
            </div>
            <h2 className="comment">Commet</h2>
            <div>
              <h4>(Username) : Lorem ipsum dolor sit amet consectetur</h4>
              <div>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
              </div>
            </div>
            <div>
              <h4>(Username) : Lorem ipsum dolor sit amet consectetur</h4>
              <div>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
                <h5>(Username) : Lorem ipsum dolor sit amet consectetur</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
