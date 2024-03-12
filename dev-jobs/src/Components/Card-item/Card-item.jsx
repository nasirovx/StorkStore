import React from 'react'
import s from './Card-item.module.css'
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReactStars from 'react-stars'
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addToCart } from '../../Redux/Slices/cartSlice';
import { fetchRemoveProducts } from '../../Redux/Slices/ProductSlice';

const ProductItem = ({isEditable, title, images, children, price, rating, topprice, discountPercentage, id, _id,  installment, planprice}) => {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    
    const handlePay = () => {
        navigate(`/info/${id}/${title}`);
    };

    const onClickRemove = () => {
        if(window.confirm("Вы действительно хотите удалить?")){
            dispatch(fetchRemoveProducts(_id))
      }};

      const handleAddToCart = () => {
        dispatch(addToCart({ id, title, price, images, quantity: 1 })); // Отправка данных о продукте в корзину
      };

    return (
        <>
        {isEditable && (
        <div className={s.card_content}>
        <div className={s.card_item}>
            <div className={s.icon_like}>
                <div><div className={topprice ? s.box : s.box2}>{topprice ? <p>-{discountPercentage}%</p> : null}</div></div>
                <div><div className={installment ? s.box1 : s.box2}>{installment ? <p>{installment}</p> : null}</div></div>
                <IconButton aria-label="add to favorites" className='icon'>
                    <ClearIcon onClick={onClickRemove} />
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
                    <button onClick={handleAddToCart}  className={s.item_btn2}>{children} <BookmarkAddIcon fontSize="small" /></button>
                </div>
                <div className={s.title}>{title}</div>
            </div>
        </div>
    </div>)}
        </>
    )
}

export default ProductItem
