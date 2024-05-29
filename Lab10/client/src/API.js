import Film from "./models/Film.js";

const SERVER_URL = 'http://localhost:3001/api';

async function getFilms(filter) {
   const films = await fetch(SERVER_URL + '/films' + (filter ? `?filter=${filter}` : ''))
    .then(handleInvalidResponse)
    .then(response => response.json())
    .then(mapApiFilmsToFilms);

return films;
}

function handleInvalidResponse(response) {
    if (!response.ok) { throw Error(response.statusText) }
    let type = response.headers.get('Content-Type');
    if (type.indexOf('application/json') === -1){
        throw new TypeError(`Expected JSON, got ${type}`)
    }
    return response;
}

function mapApiFilmsToFilms(apiFilms) {
    return apiFilms.map(film => new Film(film.id, film.title, film.favorite, film.watchDate, film.rating, film.userId));
}

async function addFilm(film) {
    console.log(film);
    let response=await fetch(SERVER_URL + '/films',{
        method:'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(film)
    })

    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
    else return null;
}

async function deleteFilm(id) {
    let response=await fetch(SERVER_URL + '/films/'+id,{
        method:'DELETE'
    })

    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
    else return null;
}

async function editFilm(film){
    let response=await fetch(SERVER_URL + '/films/'+film.id,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate,
            rating: film.rating,
            userId: film.userId
        })
    })

    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
    else return null;
}


const API = {getFilms,addFilm,deleteFilm,editFilm};
export default API;