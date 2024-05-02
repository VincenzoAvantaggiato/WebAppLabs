import { Row, Col, Form, Button } from "react-bootstrap";
function FilmBody (props){
    return(
        <>
        <h1 className="mx-3 my-2">{props.title}</h1>
        {props.films.map(film=><FilmRow film={film} key={"filmrow"+film.id}/>)}
        </>
    )
}

function Stars(props){
    let x =Array(5);
    for (let i=0;i<5;i++){
        if (i<props.rating) x[i] =<i className='bi bi-star-fill' key={"star"+i} ></i>
        else x[i] =<i className='bi bi-star' key={"star"+i}></i>
    }
    return x;
}

function FilmRow (props){
    return(
        <><Row className="my-3 mx-2">
            <Col xs={3}> {props.film.title} </Col>
            <Col xs={2}>
                <Form>
                    <Form.Check >
                        <Form.Check.Input checked={props.film.favorite} readOnly></Form.Check.Input>
                        <Form.Check.Label>Favorite</Form.Check.Label>
                    </Form.Check>
                </Form>
            </Col>
            <Col xs={3}>{props.film.date!==null?dayjs(props.film.date).format("MMMM DD, YYYY"):""}</Col>
            <Col xs={2}> <Stars rating={props.film.score} ></Stars></Col>
            <Col xs={2}>
                <Button className="mx-1">
                    <i className="bi bi-pen"></i>
                </Button>
                <Button className="mx-1">
                    <i className="bi bi-trash"></i>
                </Button>
            </Col>
        </Row>
        <hr className="hr"/></>
    )
}

export default FilmBody;