import React, { useState, useEffect } from 'react';
import s from './Home.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListItem from '../../Components/List-item/List-item';
import MyCart from '../../Components/my-cart/my-cart';
import ProductItem from '../../Components/Product-item/Product-item';

const Home = () => {
  const [text, setText] = useState('outwear');
  const [text2, setText2] = useState("kids");
  const [text3, setText3] = useState("tablets");
  const [text4, setText4] = useState("food");
  const navigate = useNavigate()

  const items = useSelector((state) => state.allCart.items);
  const {post} = useSelector((state) => state.products)
  const userData = useSelector((state) => state.auth.data);

  const [data, setData] = useState(items);
  const [data2, setData2] = useState(items);
  const [data3, setData3] = useState(items);
  const [data4, setData4] = useState(items)

  
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

  useEffect(() => {
    const newList4 = items.filter((elem) => elem.category === text4);
    setData4(newList4);
  }, [text4]);

  
  console.log("products>>>",items);

  const handleClick = () => {
    navigate('/smart')
  }
  const handleClick2 = () => {
    navigate('/cloth')
  }

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
          <div className={s.overlay}>
            <h2 className={s.heading}>Откройте мир инноваций с нашей электроникой!</h2>
            <a href="#"><button  onClick={handleClick} className={s.button}>Посмотреть предложения</button></a>
          </div>
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
      <div className={s.block2}>
        <div className={s.overlay}>
          <h3 className={s.description}>Отличные стили для каждого сезона. Посмотрите наши последние модели.</h3>
          <a href="#"><button onClick={handleClick2} className={s.button}>Посмотреть коллекцию</button></a>
        </div>
      </div>
      <div className={s.big_block}>
        <div className={s.background_image}></div>
        <div className={s.content_wrapper}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaizNHrYoh8pDBKvaJTwio-pmtBdVXDV2MY34Wx7C4LvwP9ixARsIhd4EPLn1Ezodj07M&usqp=CAU" alt="Your Product" className={s.product_image} />
            <div className={s.ad_content}>
                <h2 className={s.ad_title}>Стиль и инновации в одном</h2>
                <p className={s.ad_description}>Обновите свой гардероб с нашей коллекцией вдохновленной последними тенденциями моды. Или окунитесь в мир технологий с нашими инновационными гаджетами.</p>
                <a href="#" className={s.ad_button}>Узнать больше</a>
            </div>
        </div>
      </div>
        <ListItem
          items={data4}
          renderItem={(elem, i) => {
              return <ProductItem key={i} {...elem} children="В корзину" />;
          }}
        />
      </div>
      <h2 className={s.post_title}>Users Posts</h2>
      <div className={s.post}>
      {post.items.map((elem, i) => {
        return <MyCart key={i} isEditable={userData?._id === elem.user._id} id={elem._id} {...elem}/>
      })}
      </div>
    </div>
  );
};

export default Home;
