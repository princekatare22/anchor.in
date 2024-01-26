import { Navbar } from "../Components/Navbar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./CreateOne.css";

export const CreateOne = () => {
  return (
    <div>
      <Navbar />
      <div className="c1-container">
        <RocketLaunchIcon className="icon-container" />
        <h2>Create Your Account</h2>
        <input id="name" type="text" placeholder="Enter Your Name" />
        <br />
        <input id="email" type="text" placeholder="Enter Your Email" />
        <br />
        <button>
          Continue <ArrowForwardIcon className="arrowIcon" />
        </button>
      </div>
    </div>
  );
};
