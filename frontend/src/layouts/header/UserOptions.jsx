import React,{useState} from "react";
import "./header.css";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { Backdrop } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { logOut } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const {cartItems} = useSelector(state=>state.cart)
  const [backdrop, setBackdrop] = useState(false)
  const actions = [
    { icon: <FileCopyIcon />, name: "orders", func: orders },
    { icon: <SaveIcon style={{color:cartItems.length>0?"red":"white"}}/>,  name: `${cartItems.length}`, func: cart },
    { icon: <PrintIcon />, name: "logout", func: logout },
  ];

  function orders() {
    console.log("LOL")
  }
  function logout() {
    dispatch(logOut())
  }
  function cart() {
    navigate("/cart")
  }
  function dashboard() {

  }

  if (user.role === "admin") {
    actions.unshift({ icon: <ShareIcon />, name: "Share", func: dashboard })
  }
  return (
    <div className="tooltip">
      <Backdrop open={backdrop} />
      <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
        <SpeedDial
          onOpen={()=>setBackdrop(true)}
          onClose={()=>setBackdrop(false)}
          onClick={()=>navigate('/account')}
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          // icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          icon={<img className="speedDialIcon" src={user.avatar?.url ? user.avatar.url : "/Profile.png"} />}
          direction="right"
          FabProps={{
            sx: {
              bgcolor: "secondary.dark",
              "&:hover": {
                bgcolor: "info.dark",
              },
            },
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.func}
              // tooltipOpen={window.innerWidth<=600?true:false}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
};

export default UserOptions;
