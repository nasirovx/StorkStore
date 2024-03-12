import React from 'react'
import s from './Sale-item.module.css'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReactStars from 'react-stars'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from '../../Axios'
import { addToCart } from '../../Redux/Slices/cartSlice';

const SaletItem = ({ title, images, description, children, price, brand, rating, topprice, discountPercentage, id,  installment, planprice}) => {

    const [isLiked, setIsLiked] = React.useState(false);
    const dispatch = useDispatch()

    const handleLike = async () => {
        setIsLiked(!isLiked);
        if (!isLiked){
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

    const navigate = useNavigate()
    
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
                    <div><div className={topprice ? s.box : s.box2}>{topprice ? <p>-{discountPercentage}%</p> : null}</div></div>
                    <div><div className={installment ? s.box1 : s.box2}>{installment ? <p>{installment}</p> : null}</div></div>
                    <IconButton aria-label="add to favorites" onClick={handleLike} color={isLiked ? 'error' : 'default'} className='icon'>
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
                            {planprice ? <button className={s.btn}><span>{planprice}<ins>c</ins></span></button> : null}
                            {planprice ? 
                                <button className={s.btn2}><span>{price}<ins>c</ins> </span></button> : <span>{price}<ins>c</ins> </span>
                            }
                        </button>
                        <button  onClick={handleAddToCart}  className={s.item_btn2}>{children} <BookmarkAddIcon fontSize="small" /></button>
                    </div>
                    <div className={s.title}>{title}</div>
                </div>
            </div>
        </div>
    )
}

export default SaletItem

