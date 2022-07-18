import React, { Fragment, useEffect } from "react";
import "./myOrders.css";
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
// import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
// import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from '@mui/icons-material/Launch';
import MetaData from '../../layouts/MetaData';
import Loader from '../../layouts/Loader/Loader';

const MyOrders = () => {
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders