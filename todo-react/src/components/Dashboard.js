import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup
} from "react-bootstrap";

export default function Dashboard() {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch todos from backend
    axios
      .get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setList(res.data))
      .catch((err) => {
        console.error("Error fetching todos:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  }, [navigate]);

  const addItem = () => {
    if (userInput.trim() !== "") {
      const token = localStorage.getItem("token");
      axios
        .post(
          "http://localhost:5000/api/todos",
          {
            title: userInput,
            completed: false
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((res) => {
          setList([...list, res.data]);
          setUserInput("");
        })
        .catch((err) => {
          console.error("Error adding todo:", err);
          if (err.response?.status === 401) {
            navigate("/login");
          }
        });
    }
  };

  const deleteItem = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => setList(list.filter((item) => item.id !== id)))
      .catch((err) => {
        console.error("Error deleting todo:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        }
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h1 className="text-center">TODO LIST</h1>
      </Row>

      <Row className="justify-content-center mt-3">
        <Button variant="danger" onClick={logout} className="w-auto px-4">
          Logout
        </Button>
      </Row>
      <br />

      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Add item..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button variant="dark" onClick={addItem}>
              ADD
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <ListGroup>
            {list.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between"
              >
                {item.title}
                <Button variant="light" onClick={() => deleteItem(item.id)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}
