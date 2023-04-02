import React, { useEffect } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../reducers/actions/cartActions";
import {
  Row,
  Col,
  ListGroup,
  Image,
  FormControl,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
const CartScreen = () => {
  const { id } = useParams();
  const productId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty"));
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);
  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  return (
    <div className="text-white">
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.lenght === 0 ? (
            <Message>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.image} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <FormControl
                        className="bg-dark text-white"
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option
                            className="text-white"
                            key={x + 1}
                            value={x + 1}
                          >
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="dark"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <MdDelete />
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h2>
                <h2>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </h2>
              </ListGroupItem>
              <ListGroupItem className="d-grid gap-2">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.lenght === 0}
                  onClick={checkOutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
