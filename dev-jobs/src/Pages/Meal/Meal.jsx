import React, { useState, useEffect } from 'react';
import s from './Meal.module.css';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/List-item/List-item';
import ProductItem from '../../Components/Product-item/Product-item';

const Meal = () => {
  const items = useSelector((state) => state.allCart.items);
  const [text, setText] = useState('food');
  const [data, setData] = useState(items)

  useEffect(() => {
    const newList = items.filter((elem) => elem.category === text);
    setData(newList);
  }, [text]);

  return (
    <div className='container'>
      <div className={s.products}>
        <ListItem
          items={data}
          renderItem={(elem, i) => {
            return <ProductItem key={i} {...elem} children={"В корзину"}/>;
          }}
        />
      </div>
    </div>
  );
};

export default Meal;
