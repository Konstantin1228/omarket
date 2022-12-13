import React from "react";
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import NorthIcon from '@mui/icons-material/North';
import { LocationIcon, MailIcon, PhoneIcon, FacebookIcon, } from "./Icons/";
import "./footer.scss"
const Footer: React.FC = () => {
  return (
    <footer >
      <div className="footer__top">
        <div className="footer__top-component--img">
          <ul>
            <a href=""><img src="https://i.ibb.co/QcpDX8h/omarket-white.png" className="img-big" alt="omarket-white" /></a>
            <a href="" className="footer__top-component--img-text">Скачайте наше мобильное приложение</a>
            <div className="footer__top-component--img-bottom">
              <a href=""><img src="https://i.ibb.co/sH32vyW/google-play.png" className="img-small" alt="google-play" /></a>
              <a href=""><img src="https://i.ibb.co/j6tzJSM/appstore.png" className="img-small" alt="appstore" /></a>
            </div>
          </ul>
        </div>
        <ul className="footer__top-component">
          <a href="">О компании</a>
          <a href="">Новости</a>
          <a href="">Вакансии</a>
          <a href="">Поставщикам</a>
          <a href="">Вопросы и ответы</a>
        </ul>
        <ul className="footer__top-component">
          <a href="">Тех. поддержка</a>
          <a href="">Политика возврата</a>
          <a href="">Договор оферты</a>
          <a href="">График службы доставки: 09.00-20.00</a>
        </ul>
        <ul className="footer__top-component">
          <a href="mailto:ceo@omar-market.kz">
            <MailIcon />
            <span>ceo@omar-market.kz</span>
          </a>
          <a href="tel:+77132513510">
            <PhoneIcon />
            <span>+7 7132 513 510</span>
          </a>
          <a href="">
            <LocationIcon />
            <span>г. Актобе, ул. Назарбаева, 123/1</span>
          </a>
          <ul className="footer__top-component-flex">
            <a href=""><FacebookIcon /></a>
            <a href=""><InstagramIcon fontSize="large" /></a>
            <a href=""><WhatsAppIcon fontSize="large" /></a>
          </ul>
        </ul>
        {/* <div className="on__top" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth', })}>
              <NorthIcon sx={{
                color: "white"
              }} />
            </div > */}
      </div>
      <div className="footer__bottom">
        <p className="footer__bottom-information">Все права защищены 2021</p>
      </div>
    </footer >
  );
};

export default React.memo(Footer);