import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React, { useEffect, useRef, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Redirecter from "../Payment/Redirecter";
import style from "./style.module.css";

const Pay = () => {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [showGpay, setGpay] = useState(false);
  const gpayRef = useRef(null);
  const location = useLocation();
  const { orderId, items, address, totalAmount } = location.state || {};

  useEffect(() => {
    if (showGpay && gpayRef.current) {
      gpayRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showGpay]);

  const isValidCardNumber = (number) => {
    const regex = /^\d{16}$/;
    return regex.test(number);
  };

  const isValidExpiryDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (month < 1 || month > 12) return false;
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const isValidCVV = (cvv) => {
    const regex = /^\d{3,4}$/;
    return regex.test(cvv);
  };

  const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name) && name.length > 0;
  };

  const isValidUPIId = (upiId) => {
    const regex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return regex.test(upiId);
  };

  const handleCardPayment = (event) => {
    event.preventDefault();
    const name = event.target.elements["input-name"].value;
    const cardNumber = event.target.elements["input-card-number"].value;
    const expiryDate = event.target.elements["input-expiry-date"].value;
    const cvv = event.target.elements["cvv"].value;

    if (!isValidName(name)) {
      toast.error("Please enter a valid name.");
      return;
    }
    if (!isValidCardNumber(cardNumber)) {
      toast.error("Please enter a valid 16-digit card number.");
      return;
    }
    if (!isValidExpiryDate(expiryDate)) {
      toast.error("Please enter a valid expiry date (MM/YY).");
      return;
    }
    if (!isValidCVV(cvv)) {
      toast.error("Please enter a valid 3 or 4 digit CVV.");
      return;
    }

    processPayment("Card", name, totalAmount);
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      setGpay(true);
      setRedirecting(false);
    }, 3000);
  };
  const complete = () => {
    const email = localStorage.getItem("userEmail");
    axios
      .delete(`http://localhost:8000/api/cart/delete/${email}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const processPayment = (method, payer, amount) => {
    complete();
    toast.success(`Payment of ${amount}/- through ${method} successful!`);
    generatePDF(payer, method, amount);
    navigate("/confirmation");
  };

  const generatePDF = (payer, method, amount) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Order Confirmation", 14, 22);

    doc.setFontSize(12);
    doc.text(`Order ID: ${orderId}`, 14, 30);
    doc.text(`Payer: ${payer}`, 14, 36);
    doc.text(`Payment Method: ${method}`, 14, 42);
    doc.text(`Delivery Address: ${address}`, 14, 48);
    doc.text(`Total Amount: $${amount}`, 14, 54);

    const tableColumn = ["#", "Restaurant", "Food Item", "Quantity", "Amount"];
    const tableRows = [];

    items.forEach((item, index) => {
      const orderData = [
        index + 1,
        item.food.restaurant_name + " " + item.restaurant.address,
        item.food.name,
        item.quantity,
        item.get_total_item_price,
      ];
      tableRows.push(orderData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 62 });

    // Save the PDF
    doc.save(`order_${orderId}.pdf`);
  };

  return (
    <div style={{ height: "100vh", display: "grid", placeContent: "center" }}>
      <div
        className="row col-md-12 main"
        style={{ display: "grid", placeContent: "center", paddingTop: "100px" }}
      >
        <div className={style.modal}>
          <form className={style.form} onSubmit={handleCardPayment}>
            <div className={style.payment_options}>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={handleRedirect}
              >
                Online
              </button>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={() =>
                  processPayment("Offline", "Customer", totalAmount)
                }
              >
                <GiTakeMyMoney />
                &nbsp; Offline
              </button>
            </div>
            <div className={style.separator}>
              <hr className={style.line} />
              <p>or pay using credit card</p>
              <hr className={style.line} />
            </div>
            <div className={style.credit_card_info_form}>
              <div className={style.input_container}>
                <label htmlFor="input-name" className={style.input_label}>
                  Card holder full name
                </label>
                <input
                  id="input-name"
                  className={style.input_field}
                  type="text"
                  name="input-name"
                  placeholder="Enter your full name"
                />
              </div>
              <div className={style.input_container}>
                <label
                  htmlFor="input-card-number"
                  className={style.input_label}
                >
                  Card Number
                </label>
                <input
                  id="input-card-number"
                  className={style.input_field}
                  type="number"
                  name="input-card-number"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className={style.input_container}>
                <label
                  htmlFor="input-expiry-date"
                  className={style.input_label}
                >
                  Expiry Date / CVV
                </label>
                <div className={style.split}>
                  <input
                    id="input-expiry-date"
                    className={style.input_field}
                    type="text"
                    name="input-expiry-date"
                    placeholder="MM/YY"
                  />
                  <input
                    id="cvv"
                    className={style.input_field}
                    type="number"
                    name="cvv"
                    placeholder="CVV"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className={style.purchase_btn}>
              Checkout
            </button>
          </form>
        </div>
      </div>
      <div className="pt-3" style={{ display: "grid", placeContent: "center" }}>
        {redirecting && <Redirecter />}
      </div>
    </div>
  );
};

export default Pay;
