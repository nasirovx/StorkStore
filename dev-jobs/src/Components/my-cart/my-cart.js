import React from 'react';
import { IconButton } from '@mui/material';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ReactStars from 'react-stars';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Slices/cartSlice';
import { fetchRemovePost } from '../../Redux/Slices/ProductSlice';
import styles from './my-cart.module.css';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfo } from '../UserInfo/index';

const MyCart = ({
  id,
  user,
  title,
  image,
  price,
  rating,
  isEditable
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = () => {
    dispatch(addToCart({id, title, price, image, quantity: 1 }));
  };

  const onClickRemove = () => {
    if (window.confirm("Вы действительно хотите удалить?")) {
      dispatch(fetchRemovePost(id));
    }
  };

  const handlePay = () => {
    navigate(`/info/${id}/${title}`);
  };

  return (
    <div className={styles.card_content}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.card_item}>
        <div className={styles.icon_block}>
          <div className={styles.icon_user}>
            <UserInfo {...user} />
          </div>
        </div>
        <div className={styles.root_1}>
          <img src={image} alt={title} />
        </div>
        <div className={styles.root_2}>
          <ReactStars count={5} size={24} color2={'#ffd700'} value={rating} />
          <div className={styles.item_btns}>
            <button onClick={handlePay} className={styles.item_btn}>
              <span>{price}<ins>c</ins> </span>
            </button>
            <button className={styles.item_btn2} onClick={handleAddToCart}>
              В корзину<BookmarkAddIcon style={{ color: 'white' }} fontSize="small" />
            </button>
          </div>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
