import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container, Form, Row, Col, Toast, ToastContainer } from "react-bootstrap";
import { tours } from "./tourData";

function App() {
  const [isBooking, setIsBooking] = useState(false);
  const [isCancellation, setIsCancellation] = useState(false);
  const [selectedTour, setSelectedTour] = useState({ id: null, name: "" });
  const [isBothSelected, setIsBothSelected] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isBothSelected) {
      console.log("Cannot process when both are selected.");
      return;
    }

    const completedTour = {
      isBooking,
      isCancellation,
      name,
      email,
      selectedTour,
    };

    console.log("Completed tour: ", completedTour);
    setIsSuccess(true)

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const handleSelectTour = (event) => {
    const tourName = event.target.value;
    const tour = tours.find((t) => t.name === tourName);
    if (tour) {
      setSelectedTour(tour);
    }
  };

  const handleCheckboxChange = (type) => {
    if (type === "booking") {
      if (isCancellation && !isBooking) {
        setIsCancellation(false);
      }
      setIsBooking(!isBooking);
    } else if (type === "cancellation") {
      if (isBooking && !isCancellation) {
        setIsBooking(false);
      }
      setIsCancellation(!isCancellation);
    }
    setIsBothSelected(isBooking && isCancellation);
  };

  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit}>
        <Row className="mt-5 mb-3">
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Choose tour</Form.Label>
          <Form.Control
            as="select"
            value={selectedTour.name}
            onChange={handleSelectTour}
          >
            <option disabled value="">
              Select a tour
            </option>
            {tours.map((tour) => (
              <option key={tour.id} value={tour.name}>
                {tour.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Col>
          <Form.Group className="mb-3">
            <Form.Check
              checked={isBooking}
              type="checkbox"
              label="Book"
              onChange={() => handleCheckboxChange("booking")}
            />
            <Form.Check
              checked={isCancellation}
              type="checkbox"
              label="Cancel"
              onChange={() => handleCheckboxChange("cancellation")}
            />
          </Form.Group>
        </Col>
        {isBothSelected && <p className="text-danger">You must choose either Book or Cancel.</p>}
        <Form.Group>
          <Form.Control type="submit" value="Submit" />
        </Form.Group>
      </Form>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast show={isSuccess} onClose={() => setIsSuccess(false)} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="toast-position">Successfully registered {isBooking ? 'Booking' : 'Cancellation'}!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default App;
