import React, {useEffect} from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Smart from '../Smart'
import Cloth from '../Cloth/Cloth';
import Sale from '../Sale/Sale';
import Kids from '../Kids/Kids';
import Meal from '../Meal/Meal';
import { SearchCart } from '../../Redux/Slices/cartSlice';
import Login from '../Login/Login';
import Card from '../Card/Card';
import AboutUs from '../AboutUs/AboutUs';
import ChangePost from '../../Components/change-post/change-post';
import Post from '../../Components/post/post';
import Registration from '../Registration/Registration';
import ProductInfo from '../../Components/Product-info/Product-info';
import { useDispatch } from 'react-redux'
import products from '../../data/data.json'
import { fetchAuthMe } from '../../Redux/Slices/auth';
import { fetchProducts, fetchPosts } from '../../Redux/Slices/ProductSlice';
import CartPage from '../../Components/cartPage/cartPage';

const Main = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe())
    dispatch(fetchProducts())
    dispatch(fetchPosts())
  },[])

  return (
    <div style={{paddingBottom: "100px"}}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/smart' element={<Smart />} />
        <Route path='/cloth' element={<Cloth />} />
        <Route path='/sale' element={<Sale />} />
        <Route path='/kids' element={<Kids />} />
        <Route path='/meal' element={<Meal />} />
        <Route path='/card' element={<Card />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/posts' element={<Post />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/search' element={<SearchCart />} />
        <Route path='/posts/:id/edit' element={<ChangePost />} />
        <Route path="/info/:id/:title" element={<ProductInfo products={products} />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Registration/>}/>
      </Routes>
    </div>
  )
}

export default Main
