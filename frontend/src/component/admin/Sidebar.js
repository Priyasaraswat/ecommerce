import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import { HiArrowsExpand } from "react-icons/hi";
import { MdImportExport } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import { HiOutlineViewGridAdd} from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { RxBorderSplit} from "react-icons/rx";




const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" className="logoDashboard" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <MdOutlineDashboard /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<HiArrowsExpand />}
           defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<HiOutlineViewGridAdd />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<BiBookAdd />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <RxBorderSplit/>
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <BsPeopleFill /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <MdRateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;