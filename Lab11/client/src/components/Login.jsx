import {useState} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import API from '../API';
import {useNavigate} from 'react-router-dom';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '' || email === '') {
            setFeedback('Email and password are required!');
            return;
        }
        props.login({username: email, password: password});
    };

    return (<>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Container className="mt-3">
                {feedback && <p className="text-danger">{feedback}</p>}
            </Container>
            </>
    );
}

export default LoginForm;