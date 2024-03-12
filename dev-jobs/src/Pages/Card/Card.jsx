import React from 'react';
import s from './Card.module.css';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/List-item/List-item';
import CardtItem from '../../Components/Card-item/Card-item';

const Card = () => {
  const {products} = useSelector((state) => state.products)
  const userData = useSelector((state) => state.auth.data);
  const data = products.items
  return (
    <div className='container'>
      <div className={s.products}>
        <ListItem
          items={data}
          renderItem={(elem, i) => {
              return <CardtItem key={i} isEditable={userData?._id === elem.user._id} {...elem} children="В корзину" />;
          }}
        />
      </div>
    </div>
  );
};

export default Card;
