import { Navbar } from "../Components/Navbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./CreateThree.css";

export const CreateThree = () => {
  return (
    <div>
      <Navbar />
      <div className="c3-container">
        <VerifiedIcon className="icon-container" />
        <h2>Account Created</h2>
        <h2>Successfully</h2>
        <button>
          Create Your First Post <ArrowForwardIcon className="arrowIcon" />
        </button>
      </div>
    </div>
  );
};
