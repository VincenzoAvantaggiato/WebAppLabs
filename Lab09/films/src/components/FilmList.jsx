import 'dayjs';
import {Col, Row} from 'react-bootstrap/';

import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Film } from '../films.mjs';

function FilmList(props) {

    return (<ListGroup id="films-list" variant="flush">
        {props.films.map((film) => <FilmInList filmData={film} key={film.id} setFormVisible={props.setFormVisible} setEditableFilm={props.setEditableFilm} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm}/>)}
    </ListGroup>);
}

FilmList.propTypes = {
    films: PropTypes.array.isRequired,
};

function FilmInList(props) {
    let filmData=props.filmData
    return (<ListGroupItem>
        <Row className="gy-2">

            <Col xs={6} xl={3} className="favorite-title d-flex gap-2 align-items-center">
                {filmData.title}
                <div className="d-xl-none actions">
                    <i className="bi bi-pencil"></i>
                    <i className="bi bi-trash"></i>
                </div>
            </Col>
            <Col xs={6} xl={3} className="text-end text-xl-center">
            <span className="custom-control custom-checkbox">
              <span className="custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" checked={filmData.favorite} onChange={()=>props.updateFilm(new Film(filmData.id,filmData.title,!filmData.favorite,filmData.watchDate,filmData.rating,filmData.userID))}/>
                          <label className="custom-control-label">Favorite</label>
                        </span>
            </span>
            </Col>

            <Col xs={4} xl={3} className="text-xl-center">
                {filmData.formatWatchDate()}
            </Col>
            <Col xs={8} xl={3} className="actions-container text-end">
                <div className="rating">
                    <Rating rating={filmData.rating} maxStars={5} filmData={props.filmData} updateFilm={props.updateFilm}/>
                </div>
                <div className="d-none d-xl-flex actions">
                    <Link to={"../"+filmData.id+"/edit"}>
                    <i className="bi bi-pencil"></i>
                    </Link>
                    <i className="bi bi-trash" onClick={()=>props.deleteFilm(filmData.id)}></i>
                </div>
            </Col>
        </Row></ListGroupItem>);
}

FilmInList.propTypes = {
    filmData: PropTypes.object.isRequired,
};

function Rating({maxStars, rating, filmData, updateFilm}) {
    
    return [...Array(maxStars)].map(
        (el, index) => <i key={index} className={(index < rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={()=>updateFilm(new Film(filmData.id,filmData.title,filmData.favorite,filmData.watchDate,index+1,filmData.userID))}/>);
}

Rating.propTypes = {
    maxStars: PropTypes.number.isRequired,
};


export default FilmList;
