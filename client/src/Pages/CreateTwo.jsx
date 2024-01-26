import { Navbar } from "../Components/Navbar";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./CreateTwo.css";

export const CreateTwo = () => {
  return (
    <div>
      <Navbar />
      <div className="c2-container">
        <RocketLaunchIcon className="icon-container" />
        <h2>Create Your Account</h2>
        <h6>Please verify your email id to continue</h6>
        <h6>We have send an OTP to dummyemail10@gmail.com</h6>
        <input type="text" placeholder="Enter OTP" />
        <br />
        <button>
          Continue <ArrowForwardIcon className="arrowIcon" />
        </button>
      </div>
    </div>
  );
};
