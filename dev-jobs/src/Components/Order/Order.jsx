// TelegramForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const TelegramForm = ({ cart, onClose }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let message = `<b>Заказ с сайта!</b>\n`;
    message += `<b>Имя:</b> ${name}\n`;
    message += `<b>Номер:</b> ${number}\n`;
    message += `<b>Адрес:</b> ${address}\n\n`;
    message += `<b>Товары:</b>\n`;

    cart.forEach((item, index) => {
      message += `<b>${index + 1}. ${item.title}</b>\n`;
      message += `Цена: ${item.price}\n`;
      message += `Количество: ${item.quantity}\n\n`;
    });

    try {
      await axios.post(
        "https://api.telegram.org/bot7146076466:AAHEfq1XjIN0iCRJfQxWtVJoj86hEAX36QE/sendMessage",
        {
          chat_id: "6064303468",
          parse_mode: "html",
          text: message,
        }
      );

      // Reset form fields and close the modal
      setName("");
      setNumber("");
      setAddress("");
      onClose(); // Properly close the modal with animation
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
    }
  };

  return (
    <Modal show onHide={onClose} size="lg" centered>
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title className="text-center w-100">Оформить Заказ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Введите ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Введите ваш номер телефона"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Введите ваш адрес"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2">
            <Button className="btn-secondary" onClick={onClose}>
              Отменить
            </Button>
            <Button type="submit" className="btn-success">
              Отправить заказ
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TelegramForm;
