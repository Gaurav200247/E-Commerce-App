import React from "react";
import "./SideBar.css";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch(0);
  const { isSideBar } = useSelector((state) => state.sidebar);

  return (
    <div className={`sidebar ${isSideBar && "show-sideBar"} z-[500]`}>
      <div className="close-sidebar-btn-container">
        <CloseIcon
          className="cursor-pointer text-5xl"
          onClick={() => dispatch({ type: "CloseSideBar" })}
        />
      </div>

      <Link to="/">
        <h1 className="truncate">E-Shopping App</h1>
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon className="mr-5" /> Dashboard
        </p>
      </Link>

      <span>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon className="mr-5" />}
          defaultExpandIcon={<ImportExportIcon className="mr-5" />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<PostAddIcon className="mr-4" />}
              />
            </Link>
            <Link to="/admin/product">
              <TreeItem
                nodeId="3"
                label="Create"
                icon={<AddIcon className="mr-4" />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </span>

      <Link to="/admin/orders">
        <p>
          <ListAltIcon className="mr-5" /> Orders
        </p>
      </Link>

      <Link to="/admin/users">
        <p>
          <PeopleIcon className="mr-5" /> Users
        </p>
      </Link>

      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon className="mr-5" /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
