import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError(""); // Reset errors

        if (!email || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password
            });
            
            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 404) {
                setError("No account found. Please sign up first.");
            } else if (err.response?.status === 401) {
                setError("Incorrect password. Try again.");
            } else {
                setError(err.response?.data?.error || "An error occurred during login");
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={4}>
                    <h2 className="text-center">Login</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </InputGroup>
                    
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </InputGroup>
                    
                    <Button variant="primary" className="w-100" onClick={handleLogin}>
                        Login
                    </Button>
                    
                    <p className="text-center mt-3">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-primary">
                            Sign Up
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
