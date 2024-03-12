import React, { useState, useEffect } from 'react';
import s from './Sale.module.css';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/List-item/List-item';
import SaleItem from '../../Components/Sale-item/Sale-item';

const Sale = () => {
  
  const items = useSelector((state) => state.allCart.items);
  const [text, setText] = useState('topprice');
  const [data, setData] = useState(items);

  useEffect(() => {
    const newList = items.filter((elem) => elem.topprice || elem.planprice ? items : null);
    setData(newList);
  }, [text]);

  return (
    <div className='container'>
        <h1>Акции!</h1>
      <div className={s.products}>
        <ListItem
          items={data}
          renderItem={(elem, i) => {
            return <SaleItem key={i} {...elem} children="В корзину" />;
          }}
        />
      </div>
    </div>
  );
};

export default Sale;
