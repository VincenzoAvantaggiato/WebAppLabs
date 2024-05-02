import { useState } from 'react'
import './App.css'
import NavbarFilms from './components/NavbarComponents'
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/Sidebar';
import { Row, Col } from 'react-bootstrap';
import {Film, FilmLibrary} from './films.mjs'
import FilmBody from './components/FilmBody';

function init(){
  let library = new FilmLibrary();
  library.addNewFilm(new Film(1,'Pulp Fiction',true,'2024-03-10',5));
  library.addNewFilm(new Film(2,'21 Grams',true,'2024-03-17',4));
  library.addNewFilm(new Film(3,'Star Wars'));
  library.addNewFilm(new Film(4,'Matrix'));
  library.addNewFilm(new Film(5,'Shrek',false,'2024-03-21',3));
  return library;
}

let lb= init();


function App() {

  const [list, setList] = useState([true,false,false,false,false]);
  const [films, setFilms] = useState(lb.films)
  const [title, setTitle] = useState("All");

  const setActive = (index) =>{
      setList( oldList => {
        let newList=oldList.map(x=> false);
        newList[index]=true;
        return newList;
      })
      switch (index) {
        case 0:
          setTitle("All");
          setFilms(lb.films);
          break;
        case 1:
          setTitle("Favorites");
          setFilms(lb.favorite());
          break;
        case 2:
          setTitle("Best rated")
          setFilms(lb.best());
          break;
        case 3:
          setTitle("Seen last month")
          setFilms(lb.recent());
          break;
        case 4:
          setTitle("Unseen")
          setFilms(lb.unseen());
          break;
      }
  }



  return (
    <>
    <NavbarFilms/>
    <Row>
      <Col className='collapse col-12 d-md-block col-md-4 ' id='sidebar'>
        <SideBar list={list} setActive={setActive} ></SideBar>
      </Col>
      <Col className='col-12 col-md-8 mx-auto'>
        <FilmBody title={title} films={films}></FilmBody>
      </Col>
    </Row>
    </>
  )
}

export default App
