import Film from "./models/Film.js";

const SERVER_URL = 'http://localhost:3001/api';

async function getFilms(filter) {
   const films = await fetch(SERVER_URL + '/films' + (filter ? `?filter=${filter}` : ''),
    {credentials: 'include'})
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
        credentials: 'include',
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
        method:'DELETE',
        credentials: 'include'
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
        credentials: 'include',
        body: JSON.stringify({
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate,
            rating: film.rating
        })
    })

    if(!response.ok) {
        const errMessage = await response.json();
        throw errMessage;
      }
    else return null;
}

// NEW
const logIn = async (credentials) => {
    const response = await fetch(SERVER_URL + '/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
  };
  
  
  const getUserInfo = async () => {
    const response = await fetch(SERVER_URL + '/sessions/current', {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;  // an object with the error coming from the server
    }
  };
  
  
  const logOut = async() => {
    const response = await fetch(SERVER_URL + '/sessions/current', {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
  }


const API = {getFilms,addFilm,deleteFilm,editFilm,logIn,getUserInfo,logOut};
export default API;