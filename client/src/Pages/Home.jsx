import { Navbar } from "../Components/Navbar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="top-button">
          <RocketLaunchIcon className="icon-container" />
          <h4>For Indian Users Only</h4>
        </div>
        <div className="text-box">
          <h1>Start posting anonymously</h1>
          <h1>where no one will judge.</h1>
          <h3>Welcome to Starngers discussion forum</h3>
          <button>
            Create Your Account <ArrowForwardIcon className="arrowIcon" />
          </button>
          <h4>
            Already have an account?{" "}
            <a href="#">
              <u>Login</u>
            </a>
          </h4>
        </div>
      </div>
    </div>
  );
};
