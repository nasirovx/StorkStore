import React from 'react';
import s from './Card.module.css';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/List-item/List-item';
import CardtItem from '../../Components/Card-item/Card-item';

const Card = () => {
  const { products } = useSelector((state) => state.products);
  const userData = useSelector((state) => state.auth.data);
  // Добавляем проверку на существование products.items
  const data = products.items || [];
  console.log(data);
  return (
    <div className='container'>
      <div className={s.products}>
        <ListItem
          items={data}
          renderItem={(elem, i) => {
            // Добавляем проверку на существование elem и elem.user
            if (elem && elem.user) {
              return <CardtItem key={i} isEditable={userData?._id === elem.user._id} {...elem} children="В корзину" />;
            } else {
              return null; // Возвращаем null если elem или elem.user не существуют
            }
          }}
        />
      </div>
    </div>
  );
};

export default Card;
