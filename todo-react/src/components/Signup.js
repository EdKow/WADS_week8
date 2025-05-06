import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError(""); // Reset errors

        if (!name || !email || !password) {
            setError("All fields are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", {
                name,
                email,
                password
            });
            
            // Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.status === 409) {
                setError("Email is already registered. Please log in.");
            } else if (err.response?.status === 400) {
                setError("Password should be at least 6 characters.");
            } else {
                setError(err.response?.data?.error || "An error occurred during signup");
            }
        }
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={4}>
                    <h2 className="text-center">Sign Up</h2>
                    {error && <p className="text-danger text-center">{error}</p>}
                    
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </InputGroup>
                    
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
                    
                    <Button variant="primary" className="w-100" onClick={handleSignup}>
                        Sign Up
                    </Button>
                    
                    <p className="text-center mt-3">
                        Already have an account?{" "}
                        <Link to="/login" className="text-primary">
                            Login
                        </Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
