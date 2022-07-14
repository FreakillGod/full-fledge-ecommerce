import React,{useEffect} from 'react'
import Header from '../../layouts/header/Header'
import Main from '../../layouts/main/Main'
import Deals from '../../layouts/deals/Deals'
import Footer from '../../layouts/footer/Footer'
import MetaData from '../../layouts/MetaData'
import { getProduct } from '../../redux/actions/productAction'
import { useSelector,useDispatch } from 'react-redux/es/exports'


const Home = () => {

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getProduct())
  },[])
  return (
    <>
    <MetaData title="Home Page" />
    <Header/>
    <Main/>
    <Deals/>
    <Footer/>
    </>
  )
}

export default Home