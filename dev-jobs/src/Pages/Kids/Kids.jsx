import React, { useState, useEffect } from 'react';
import s from './Kids.module.css';
import { useSelector } from 'react-redux';
import ListItem from '../../Components/List-item/List-item';
import ProductItem from '../../Components/Product-item/Product-item';

const Kids = () => {
  const items = useSelector((state) => state.allCart.items);
  const [text, setText] = useState('kids');
  const [text2, setText2] = useState("kids1");
  const [text3, setText3] = useState("kids2");
  const [data, setData] = useState(items);
  const [data2, setData2] = useState(items);
  const [data3, setData3] = useState(items);

  useEffect(() => {
    const newList = items.filter((elem) => elem.category === text);
    setData(newList);
  }, [text]);

  useEffect(() => {
    const newList1 = items.filter((elem) => elem.category === text2);
    setData2(newList1);
  }, [text2]);

  useEffect(() => {
    const newList3 = items.filter((elem) => elem.category === text3);
    setData3(newList3);
  }, [text3]);

  return (
    <div className='container'>
      <div className={s.products}>
        <ListItem
          items={data3}
          renderItem={(elem, i) => {
              return <ProductItem key={i} {...elem} children="В корзину" />;
          }}
        />
        <div className={s.block}>
          <p>РЕКЛАМА</p>
        </div>
        <ListItem
          items={data}
          renderItem={(elem, i) => {
            return <ProductItem key={i} {...elem} children="В корзину" />;
          }}
        />
        <ListItem
          items={data2}
          renderItem={(elem, i) => {
              return <ProductItem key={i} {...elem} children="В корзину" />;
          }}
        />
        <div className={s.block}>
          <p>РЕКЛАМА</p>
        </div>
      </div>
    </div>
  );
};

export default Kids;
