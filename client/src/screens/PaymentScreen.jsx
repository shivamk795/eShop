import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../reducers/actions/cartActions";
const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const [paymentmethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentmethod));
    navigate("/placeorder");
  };
  //   useEffect(() => {
  //     if (userInfo) {
  //     //   navigate(redirect);
  //     }
  //   }, [userInfo, redirect, navigate]);
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment Method</Form.Label>
          <Form.Control
            as="select"
            value={paymentmethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="PayPal">PayPal or Credit Card</option>
            <option value="Stripe">Stripe</option>
          </Form.Control>
          {/* <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col> */}
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
