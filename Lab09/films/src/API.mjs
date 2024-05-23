import { Film } from "./films.mjs";
const SERVER_URL= 'http://localhost:3001'

const getFilms = async (filter) =>{
    let response;
    console.log(filter)

    switch (filter){
        case 'filter-all':
            response = await fetch(SERVER_URL + '/api/films');
            break;
        case 'filter-unseen':
            response = await fetch(SERVER_URL + '/api/films/unseen');
            break;
        case 'filter-favorite':
            response = await fetch(SERVER_URL + '/api/films/favorite');
            break;
        case 'filter-best':
            response = await fetch(SERVER_URL + '/api/films/best');
            break;
        case 'filter-lastmonth':
            response = await fetch(SERVER_URL + '/api/films/recent');
            break;
        default:
            throw new Error('Internal server error');

    }
    if(response.ok) {
        const filmsJson = await response.json();
        return filmsJson.map(f => new Film(f.id,f.title,f.favorite==1?true:false,f.date,f.score,f.user));
    }
    else
        throw new Error('Internal server error');
}

const API = {getFilms};
export default API;