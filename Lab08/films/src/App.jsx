/*
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 6 - 2024
 */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import {INITIAL_FILMS} from "./films.mjs";

import dayjs from 'dayjs';

import {useState} from 'react';
import {Button, Collapse, Col, Container, Row} from 'react-bootstrap/';
import {Filters, FilterRoutes} from './components/Filters';
import Header from "./components/Header.jsx";
import FilmList from "./components/FilmList.jsx";
import {FilmForm, EditForm} from './components/FilmForm.jsx';
import { Film } from './films.mjs';
import { Outlet, Route, Routes, Link, useParams } from 'react-router-dom';

function App() {

    const [films,setFilms] = useState(INITIAL_FILMS);
    /**
     * Defining a structure for Filters
     * Each filter is identified by a unique name and is composed by the following fields:
     * - A label to be shown in the GUI
     * - An ID (equal to the unique name), used as key during the table generation
     * - A filter function applied before passing the films to the FilmTable component
     */
    const filters = {
        'filter-all': {label: 'All', id: 'filter-all', filterFunction: () => true},
        'filter-favorite': {label: 'Favorites', id: 'filter-favorite', filterFunction: film => film.favorite},
        'filter-best': {label: 'Best Rated', id: 'filter-best', filterFunction: film => film.rating >= 5},
        'filter-lastmonth': {
            label: 'Seen Last Month',
            id: 'filter-lastmonth',
            filterFunction: film => {
                if (!film?.watchDate) return false;
                const diff = film.watchDate.diff(dayjs(), 'month');
                return diff <= 0 && diff > -1;
            }
        },
        'filter-unseen': {label: 'Unseen', id: 'filter-unseen', filterFunction: film => !film?.watchDate}
    };


    // This is not optimal - better ways will be introduced in the upcoming labs
    const visibleFilms = (filter) => films.filter(filters[filter].filterFunction);

    // This state controls the expansion of the sidebar (on small breakpoints only)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

    const addFilm = (film) => {
        setFilms((old_films)=>{
            const id = Math.max(...old_films.map(f=>f.id))+1;
            const newFilm = new Film(id,film.title,film.favorite,film.date,film.rating);
            return [...old_films, newFilm]
        });
    }

    const updateFilm = (film) => {
        setFilms(old_films=>old_films.map( f =>{
            if (f.id==film.id) return new Film(f.id,film.title,film.favorite,film.date,film.rating);
            else return f;
        }
        ))
    }

    const deleteFilm = (id) => {
        setFilms(old_films=>old_films.filter( f =>f.id!=id))
    }
    const getFilmById = (id)=>{
        const film = films.filter(f=>f.id==id);
        if (film.length===0) return null;
        return film[0];
    }
    const [editableFilm,setEditableFilm]= useState('');

    return (
        <Routes>
            <Route path="/" element={
                <div className="min-vh-100 d-flex flex-column">
                <Header isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded}/>

                {/* Main */}
                <Container fluid className="flex-grow-1 d-flex flex-column">
                    <Outlet/>
                </Container>
                </div>}>
                    <Route path={"/"} element={<>
                    <Row className="flex-grow-1">
                        <Collapse id="films-filters" in={isSidebarExpanded} className="col-md-3 bg-light d-md-block">
                            <div className="py-4">
                                <h5 className="mb-3">Filters</h5>
                                <Filters items={filters} selected={'filter-all'} />
                            </div>
                        </Collapse>
                        <Col md={9} className="pt-3">
                            <h1><span id="filter-title">{'All'}</span> films</h1>
                            <FilmList films={visibleFilms('filter-all')} setEditableFilm={setEditableFilm} deleteFilm={deleteFilm} updateFilm={updateFilm}/>
                        </Col>
                        
                    </Row>
                    <Link
                    className="btn btn-primary rounded-circle fixed-right-bottom"
                    to={"add"}>
                    <i className="bi bi-plus"></i>
                    </Link></>
                    }></Route>
                    
                    <Route path={"filter/:filter"} element={<FilterRoutes isSidebarExpanded={isSidebarExpanded} filters={filters} visibleFilms={visibleFilms} setEditableFilm={setEditableFilm} deleteFilm={deleteFilm} updateFilm={updateFilm}></FilterRoutes>}>
                    </Route>
                    <Route path="/add" element={
                        <FilmForm addFilm={addFilm}></FilmForm>
                    }>
                    </Route>
                    <Route path="/:id/edit" element={<EditForm editableFilm={editableFilm} getFilmById={getFilmById} setEditableFilm={setEditableFilm} updateFilm={updateFilm}></EditForm>
                    }>
                        
                    </Route>
                    <Route path="*" element={<h1>Wrong URL</h1>}></Route>
                    
            </Route>
            
        </Routes>
        );
}

export default App;
