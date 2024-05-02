import {Button, Navbar, Container, Form, Row, Col} from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css';

function NavbarFilms() {
    return (
        <Navbar bg='primary' data-bs-theme='dark' expand='md'>
            <Container fluid>
                <Navbar.Toggle data-bs-toggle="collapse" data-bs-target="#" aria-controls="lsidebar" aria-expanded="false" aria-label="Toggle sidebar"></Navbar.Toggle>
                <Navbar.Brand>
                    <i className="bi bi-collection-play-fill me-2"></i>
                    Film Library
                </Navbar.Brand>
                
                <Navbar.Collapse >
                    <Form inline="true" className="d-flex m-auto">
                        <Form.Control type="text" placeholder="Search" className="d-flex m-auto" data-bs-theme="light"/>
                    </Form>
                </Navbar.Collapse>
                
                <Button><i className="bi bi-person-circle h3" ></i></Button>
            </Container>
        </Navbar>
    )
}


export default NavbarFilms;