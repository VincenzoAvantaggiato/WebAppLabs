import PropTypes from 'prop-types';
import { useState } from 'react';
import {NavItem, Row, Collapse, Col} from "react-bootstrap";
import { useParams, Link, NavLink } from 'react-router-dom';
import FilmList from './FilmList';

/**
 * This components requires:
 * - the list of filters labels to show,
 * - the filter that is currently selected
 * - the handler to notify a new selection
 */
function Filters(props) {
    const {items, selected} = props;

    // Converting the object into an array to use map method
    const filterArray = Object.entries(items);

    return (
        <ul className="nav nav-pills flex-column gap-2 mb-auto">
            {
                filterArray.map(([filterName, {label}]) => {
                    return (
                        <NavItem key={filterName}>
                            <NavLink
                                className={selected === filterName ? 'btn btn-primary': 'btn link-dark'}
                                active={selected === filterName}
                                to={"/filter/"+filterName.split("-")[1]}
                            >
                                {label}
                            </NavLink>
                        </NavItem>);
                })
            }
        </ul>
    );
}

function FilterRoutes(props){
    let {filter}=useParams();
    filter = "filter-"+filter;
    return (<>
        <Row className="flex-grow-1">
            <Collapse id="films-filters" in={props.isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                <div className="py-4">
                    <h5 className="mb-3">Filters</h5>
                    <Filters items={props.filters} selected={filter}/>
                </div>
            </Collapse>
            <Col md={9} className="pt-3">
                <h1><span id="filter-title">{props.filters[filter].label}</span> films</h1>
                <FilmList films={props.visibleFilms(filter)} setEditableFilm={props.setEditableFilm} deleteFilm={props.deleteFilm} updateFilm={props.updateFilm}/>
            </Col>
                        
        </Row>
        <Link
            className="btn btn-primary rounded-circle fixed-right-bottom"
            to={"../add"}>
            <i className="bi bi-plus"></i>
        </Link></>
                
    )
}

Filters.propTypes = {
    items: PropTypes.object,
    selected: PropTypes.string,
    onSelect: PropTypes.func
};


export {Filters, FilterRoutes};
