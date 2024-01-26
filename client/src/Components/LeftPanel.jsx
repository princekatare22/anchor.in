import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./LeftPanel.css";

export const LeftPanel = () => {
  return (
    <div className="leftSide">
      <div className="box">All Post</div>
      <div className="box">All Commented Post</div>
      <div className="box">All Replied Post</div>

      <button>
        <AddCircleOutlineIcon className="add-icon" />
        <span>Create Post</span>
      </button>
    </div>
  );
};
