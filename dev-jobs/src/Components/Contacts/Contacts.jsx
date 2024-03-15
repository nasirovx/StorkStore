import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Contacts.module.css'

const Contacts = () => {
    const navigate = useNavigate();

    const handleAboutUs = () => {
        navigate('/contacts');
    };
    return (

        <div className={s.Contacts}>
            <h1 className={s.ContactInformation}>Contact Information</h1>
            <div className={s.contactInformation}>
                <div className={s.contacts}>
                    <div>
                        <h3 className={s.titleContact}>Phone:</h3>
                        <p> +996777567</p>
                        <p> +996508899</p>
                        <p> +996500527</p>
                    </div>
                    <div>
                        <h3 className={s.titleContact}>Email:</h3>
                        <p>info@starkspace.com</p>
                    </div>
                    <div>
                        <h3 className={s.titleContact}>Address: </h3>
                        <p>Osh City, Lenin Street 323, Kyrgyzstan    </p>
                    </div>
                    <div>
                        <h3 className={s.titleContact}>Schedule:</h3>
                        <p>Пн-Пт: 9:00-18:00</p>
                    </div>
                    <div className={s.contactIcon}>
                <a href=""><i class="fa-brands fa-whatsapp"></i></a>
                <a href=""><i class="fa-brands fa-instagram"></i></a>
                <a href=""><i class="fa-brands fa-telegram"></i></a>
                <a href=""><i class="fa-brands fa-twitter"></i></a>
            </div>
                </div>
                <div>
                    <iframe className={s.Geolocation} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.9566482082737!2d34.79158817546957!3d50.906018254459255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4129018954cb1a8d%3A0x92249b9831053878!2z0LLRg9C70LjRhtGPINCf0L7QutGA0L7QstGB0YzQutCwLCA5LzEsINCh0YPQvNC4LCDQodGD0LzRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwg0KPQutGA0LDQuNC90LAsIDQwMDAw!5e0!3m2!1sru!2skg!4v1710162995244!5m2!1sru!2skg" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
          
        </div>
    );
};

export default Contacts;