import React from 'react';
import s from './Product-item.module.css';
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReactStars from 'react-stars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../Axios';

const ProductItem = ({ id, title, images, description, children, price, brand, rating, topprice, discountPercentage, installment, planprice }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = React.useState(false);
  const navigate = useNavigate();

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      const productData = {
        id,
        title,
        brand,
        price,
        topprice,
        planprice,
        discountPercentage,
        installment,
        description,
        rating,
        images
      };
      try {
        const response = await axios.post("/products", productData);
        console.log(response);
      } catch (error) {
        console.error("Ошибка при создании поста:", error);
      }
    }
  };

  const handlePay = () => {
    navigate(`/info/${id}/${title}`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, images, quantity: 1 })); // Отправка данных о продукте в корзину
  };

  return (
    <div className={s.card_content}>
      <div className={s.card_item}>
        <div className={s.icon_like}>
          <div><div className={topprice ? s.item_box : s.item_box2}>{topprice ? <p>-{discountPercentage}%</p> : null}</div></div>
          <div><div className={installment ? s.item_box1 : s.item_box2}>{installment ? <p>{installment}</p> : null}</div></div>
          <IconButton aria-label="add to favorites" onClick={handleLike}>
            {isLiked ? <FavoriteIcon style={{ color: '#FF0000' }} /> : <FavoriteBorderIcon />}
          </IconButton>
        </div>
        <div className={s.root_1}>
          <img src={images[0]} alt={title} />
        </div>
        <div className={s.root_2}>
          <ReactStars count={rating} size={24} color2={"#ffd700"} value={rating}/>
          <div className={s.item_btns}>
            <button onClick={handlePay} className={planprice ? s.item_btn : s.item_xbtn}>
              {planprice ? <button className={s.button}><span>{planprice}<ins>c</ins></span></button> : null}
              {planprice ? 
                <button className={s.button2}><span>{price}<ins>c</ins> </span></button> : <span>{price}<ins>c</ins> </span>
              }
            </button>
            <button className={s.item_btn2} onClick={handleAddToCart}>{children} <BookmarkAddIcon style={{ color: 'white' }} fontSize="small" /></button>
          </div>
          <div className={s.title}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
