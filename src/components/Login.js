import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Alert } from "react-bootstrap";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [responseFetch, setResponseFetch] = ([]);
    const [alert, setAlert] = useState(false);
    const [response, setResponse] = useState({
        data: '',
        type: 'success',
    });

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        postData();
    }

    async function postData() {
        const newRecord = {
            email: email,
            password: password,
        };
        try {
            const res = await fetch('https://dev.api.globetrott.app/api/users/login/', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecord),
            });


            //ask
            const fetchData = await res.json();
            const errorMessage = Object.values(fetchData)[0]
            console.log(errorMessage)

            if (res.ok) {
                setResponse({ data: 'Logged in successfully', type: 'success' });
                showAlert(true);
            }
            if (!res.ok) {
                setResponse({
                    data: `Ups... ${errorMessage}`,
                    type: 'error'
                });
                showAlert(true);
            }

        } catch (err) {
            setResponse({
                data: `${err}`,
                type: 'error'
            });
            showAlert(true);
        }
    }

    const showAlert = (status) => {
        setAlert(status)
    }

    useEffect(() => {
        setTimeout(() => {
            showAlert();
        }, 4000);
    }, [alert]);

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button size="lg" type="submit" className="login-button" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
            {alert ? <Alert variant={`${(response.type === 'success') ? 'success' : 'danger'}`}>{response.data}</Alert> : ''}
        </div>
    );
}

// Email: cct-lab@cct.lt
// Password: cctLAB123@