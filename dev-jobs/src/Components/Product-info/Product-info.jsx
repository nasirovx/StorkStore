import React from 'react'
import s from './Product-info.module.css'
import {useParams, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import products from '../../data/data.json'
import StarIcon from '@mui/icons-material/Star';
import { addToCart } from '../../Redux/Slices/cartSlice';

const ProductInfo = () => {
  const { id,title } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {post} = useSelector((state) => state.products)
  const product = products.products.find(product => product.id === parseInt(id)) || post.items.find(product => product.title === title);
  if (!product) {
    return <div>Product not found</div>;
  }
  console.log("Info>>>", product);

  const handleAddToCart = () => {
    navigate(`/cart`)
    dispatch(addToCart({ id: product.id ? product.id : product._id, title: product.title, price: product.price, images: product.images, image: product.image, quantity: 1 })); // Отправка данных о продукте в корзину
  };

  return (
    <div className='container'>
      <div className={s.section}>
        <div className={s.content}>
          <div className={s.content_img}>
          <img src={product.images && product.images[0] || product.image} alt="" />
          </div>
          <div className={s.content_info}>
            <h2>{product.title}</h2>
            <p className={s.rating}><div className={s.icon_rating}><StarIcon/> {product.rating}</div>{product.discountPercentage ?  <p>Акция! -{product.discountPercentage}%</p> : null}</p>
            <p>{product.description}</p>
            <div className={s.info_images}>
              <div className={s.image}><img src={product.images && product.images[1] || product.image} alt="" /></div>
              <div className={s.image}><img src={product.images && product.images[2] || product.image} alt="" /></div>
              <div className={s.image}><img src={product.images && product.images[3] || product.image} alt="" /></div>
            </div>
            <div className={s.content_btns}>
              <button className={s.item_btn}>{product.topprice ? 
                  <span className={s.original_price}><del>{product.price}</del><ins>c</ins></span> : <span>{product.price}<ins>c</ins> </span>}
                  <span className={s.price}>{product.topprice}{product.topprice ? <ins>c</ins> : null}</span>
              </button>
                <button onClick={handleAddToCart} className={s.content_btn}>В корзину</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
