import React, { useRef, useEffect, useState } from 'react';
import Photo from '../../Asests/photo2.png';
import Building from '../../Asests/building.png';
import { useNavigate } from 'react-router-dom';
import s from './AboutUs.module.css';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import AddHomeWorkOutlinedIcon from '@mui/icons-material/AddHomeWorkOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Slider from 'react-material-ui-carousel';
import Office1 from '../../Asests/office1.png';
import Office2 from '../../Asests/office2.png';
import Office3 from '../../Asests/office3.png'

const AboutUs = () => {
  const navigate = useNavigate();
  const [historyHovered, setHistoryHovered] = useState(null);

  const handleAboutUs = () => {
    navigate(`/aboutUs`);
  };

  const photoRef = useRef(null);

  
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const photoTop = photoRef.current.getBoundingClientRect().top;
    const opacity = Math.max(0, Math.min(1, photoTop / windowHeight));
    photoRef.current.style.opacity = opacity;
    if (opacity < 0.1) {
      photoRef.current.style.opacity = 0; 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <div className={s.container}>
      <img ref={photoRef} className={s.element1} src={Photo} alt="" />
      <div className={s.aboutUsBegin}>
        <img className={s.imgBuild} src={Building} alt="" />
        <div className={s.elemAboutUs}>
          <h3>About Us</h3>
          <div className={s.element2}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia repellat nostrum pariatur, fuga distinctio vel fugiat maxime, est eos voluptas vitae harum nobis illo qui consequatur aspernatur accusamus. Nam ducimus explicabo obcaecati facere placeat adipisci omnis nesciunt facilis culpa consectetur, optio quibusdam asperiores ea est aut tempora impedit. Repellendus perspiciatis perferendis quo ab minima recusandae amet, animi possimus unde nesciunt doloribus magni!
          </div>
          <div className={s.number}>
            {[['9', 'years on the market'], ['200+', 'The best specialists in their field'], ['34', 'Brand partners']].map(([number, word]) => (
              <div key={number}>
                &nbsp;<h1 className={s.numerical} style={{ color: 'blue' }}>{number}</h1>&nbsp;<h6 className={s.word}>{word}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.ourHistory}>
        <h2 className={s.ourHistoryTitle}>Our History</h2>
        <div className={s.cards}>
          <div className={s.card1} onMouseEnter={() => setHistoryHovered('2012')} onMouseLeave={() => setHistoryHovered(null)}>
            <h2>{historyHovered === '2012' ? '2012 - Nam ducimus explicabo obcaecati facere ' : '2012'}</h2>
          </div>
          <div className={s.card2} onMouseEnter={() => setHistoryHovered('2016')} onMouseLeave={() => setHistoryHovered(null)}>
            <h2>{historyHovered === '2016' ? '2016 - Nam ducimus explicabo obcaecati facere.' : '2016'}</h2>
          </div>
          <div className={s.card3} onMouseEnter={() => setHistoryHovered('2018')} onMouseLeave={() => setHistoryHovered(null)}>
            <h2>{historyHovered === '2018' ? ' 2018 - Nam ducimus explicabo obcaecati facere .' : '2018'}</h2>
          </div>
          <div className={s.card4} onMouseEnter={() => setHistoryHovered('2020')} onMouseLeave={() => setHistoryHovered(null)}>
            <h2>{historyHovered === '2020' ? '2020 - Nam ducimus explicabo obcaecati facere ' : '2020'}</h2>
          </div>
        </div></div>
      <div>
        <h2 className={s.ourPrideTitle}>Our pride:</h2>
        <div className={s.ourPride}>
          <div className={s.infoCart}>
            <AdsClickIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6>
          </div>
          <div className={s.infoCart}>
            <AutoGraphIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6></div>
          <div className={s.infoCart}><AddShoppingCartOutlinedIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6></div>
          <div className={s.infoCart}><AddHomeWorkOutlinedIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6></div>
          <div className={s.infoCart}><AssuredWorkloadOutlinedIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6> </div>
          <div className={s.infoCart}><AutoStoriesOutlinedIcon color="primary" />
            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta asperiores saepe voluptates ullam a officiis! Quasi reiciendis dolore minus earum! Sunt laborum mollitia repellat expedita aperiam quod esse!</h6></div>
        </div>
      </div>
      <div className={s.ourOffices}>
        <h2 className={s.officesTitle}>StarkSpace Offices</h2>
        <Slider>
          <img className={s.Office1} src={Office1} alt="Image 1" />
          <img className={s.Office2} src={Office2} alt="Image 2" />
          <img className={s.Office3} src={Office3} alt="Image 3" />
        </Slider>
      </div>
    </div>
  );
};

export default AboutUs;