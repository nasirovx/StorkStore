import React, { useState } from 'react';
import Logo from '../../Asests/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import s from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../Redux/Slices/auth';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalMallIcon from '@mui/icons-material/LocalMall';

const Header = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const {products} = useSelector((state) => state.products)
  const {cart} = useSelector((state) => state.allCart)
  const userData = useSelector((state) => state.auth.data);
  const data = products.items
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input>>>", input);
    const product = data.find(product => product.title === input);
    if (product){
    navigate(`/info/${product.id}/${product.title}`);
    }
    setInput("")
  };
  
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token', '');
    }
  };
  const itemCount = userData ? data.filter(item => item.user && item.user._id === userData._id).length : 0;

  return (
    <div className={s.header}>
      <nav className={s.navbar}>
        <div className={`container ${s.nav_content}`}>
          <div className={s.navigation}>
            <Link to='/' className={s.logoLink}>
              <img src={Logo} width={150} height={90} alt="" />
            </Link>
            <div className={s.contacts}>
              <Link to='/contacts'>CONTACTS</Link>
            </div>
            <div className={s.services}>
              <Link to='/aboutUs'>ABOUT US</Link>
            </div>
            <div className={s.finance}>
              <Link to='/sale'>FINANCE</Link>
            </div>
            <div className={s.finance}>
              <Link to='/posts'>MY POST</Link>
            </div>
            <div className={`${s.nav} ${s.link}`}>
            <div className={s.icon}>
            <Link to='/card'>
              <i className="fa-regular fa-heart" style={{ fontSize: '20px' }}></i>
              <div className={s.count1}>{itemCount}</div>
            </Link>
          </div>
              <div className={s.icon}>
                <Link to='/cart'>
                  <LocalMallIcon style={{color:"rgb(207, 8, 177)"}} /><div className={s.count2}>{cart ? cart.length : 0}</div>
                </Link>
              </div>
              {!isAuth ? (
                <button className={s.comeIn}>
                  <Link to='/register'>COME IN</Link>
                </button>
              ) : (
                <LogoutIcon className={s.redLogoutIcon} onClick={onClickLogout} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className={s.search_bar}>
        <div className={s.search_container}>
          <form onSubmit={handleSubmit} className={s.form_control}>
            <div className={s.search_input_container}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Search for goods...'
                type="text"
                className={s.search_input}
              />
              <SearchIcon className={s.search_icon} onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>

      <div className={s.nav_links}>
        <Link to='/smart'><button className={s.active}>ELECTRONICS</button></Link>
        <Link to='/cloth'><button className={s.active}>CLOTHES</button></Link>
        <Link to='/kids'><button className={s.active}>KIDS</button></Link>
        <Link to='/meal'><button className={s.active}>FOOD</button></Link>
      </div>
    </div>
  );
};

export default Header;
