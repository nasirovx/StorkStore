import React from 'react';
import s from './Footer.module.css';
import QRCode from 'react-qr-code';
import Logo from '../../Asests/logo.png';

const Footer = () => {
  return (
    <div className='content'>
      <div className={s.footer}>
        <div className={s.footer_up}>
          <div className={s.footer_item}>
            <span className={s.nav_content}>
              <a className={s.link} href='/card'>Favorites</a>
              <a className={s.link} href="/service">Services</a>
              <a className={s.link} href='/basket'>Basket</a>
              <a className={s.link} href="/Stock">Stock</a>
            </span>
            {/* <span className={s.nav_content}>
              <a className={s.link} href='/card'>Favorites</a>
              <a className={s.link} href="/service">Services</a>
              <a className={s.link} href='/basket'>Basket</a>
              <a className={s.link} href="/Stock">Stock</a>
            </span> */}
          </div>
          <div className={s.footer_logo}>
            <div className={s.logo_container}>
              <img src={Logo} alt="" className={s.logo} />
              <div className={s.logo_text}>
                {/* <span>SPARK SPACE</span> */}
              </div>
            </div>
          </div>
          <div className={s.footer_icons}>
            <a className={s.footer_icon} href=""><i className="fa-brands fa-instagram"></i></a>
            <a className={s.footer_icon} href=""><i className="fa-brands fa-telegram"></i></a>
            <a className={s.footer_icon} href=""><i className="fa-brands fa-whatsapp"></i></a>
            <a className={s.footer_icon} href=""><i className="fa-solid fa-phone-volume"></i></a>
            <div className={s.footer_qr}>
            <QRCode
              size={90}
              value={"https://www.youtube.com/"}
              bgColor="#85dcfd"
              fgColor="black"
              level="Q"
            />
          </div>
          </div>
        
        </div>
        <hr className={s.footer_hr} />
        <div className={s.footer_txt}>
          {/* <div className={s.footer_txt1}><h4>2024</h4></div> */}
          <span className={s.footer_text}>© ALTYNAI \ BEKASTAN \ ALINA \ KHUZAIFULLA \ AKMARAL \ SAHJARBEK \ ZARINA </span>
          <div className={s.footer_txt2}><h4>BY ITC BOOTCAMP — 2024</h4></div>
        </div>
      </div>
    </div>
  )
}

export default Footer;