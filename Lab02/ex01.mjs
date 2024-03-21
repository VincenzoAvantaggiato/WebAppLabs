import dayjs from 'dayjs';
import sqlite from 'sqlite3';

// Apertura database e creazione oggetto
const db = new sqlite.Database('films.db', (err) => {if (err) throw err;});

function Film(id,title,favorite=false,date=null,score=0,user=1){
    this.id=id;
    this.title=title;
    this.favorite=favorite;
    this.date=(date===null) ? null : dayjs(date);
    this.score=score;
    this.user=user;

    this.toString = () => {
        return `Id: ${this.id}, Title: ${this.title}, Favorite: ${this.favorite}, Watch date: ${(this.date===null)? null:this.date.format('MMMM DD, YYYY')}, Score: ${this.score}, User: ${this.user}`;
    }
}

function FilmLibrary(films=[]){
    this.films=[];

    this.films.push(...films);

    this.addNewFilm = (film)=>{
        this.films.push(film);
    }

    this.sortByDate = () => {
        return [...this.films].sort((a,b)=>{
            if(a.date===null) return 1;
            if(b.date===null) return -1;
            return a.date.isAfter(b.date);
        });
    }

    this.deleteFilm = (id) => {
        this.films=this.films.filter((film)=>film.id!==id);
    }

    this.resetWatchedFilms = () => {
        this.films=this.films.map((film)=>{
            let newFilm = film;
            newFilm.date=null;
            return newFilm;
        })
    }

    this.getRated = () => {
        return this.films.filter((film)=>film.score!==0).sort((a,b)=>b.score-a.score);
    }

    this.retrieveFilms = () =>{
        return new Promise((resolve,reject)=>{
            const sql= 'SELECT * FROM films' ;
            db.all(sql,[],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }

    this.retrieveFavoriteFilms = () =>{
        return new Promise((resolve,reject)=>{
            const sql= 'SELECT * FROM films WHERE isFavorite=1' ;
            db.all(sql,[],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }

    this.retrieveFilmsToday = () =>{
        return new Promise((resolve,reject)=>{
            const sql= 'SELECT * FROM films WHERE watchDate=?' ;
            db.all(sql,[dayjs().format('YYYY-MM-DD')],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }

    this.retrieveFilmsBeforeDate = (date) =>{
        return new Promise((resolve,reject)=>{
            const sql= 'SELECT * FROM films WHERE watchDate<?' ;
            db.all(sql,[date],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }

    this.retrieveFilmsRatingGE = (rating) =>{
        return new Promise((resolve,reject)=>{
            const sql= 'SELECT * FROM films WHERE rating>=?' ;
            db.all(sql,[rating],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }

    this.retrieveFilmsByTitle = (matchString) =>{
        return new Promise((resolve,reject)=>{
            const sql= "SELECT * FROM films WHERE title LIKE '%' || ? || '%' " ;
            db.all(sql,[matchString],(err,rows)=>{
                if(err) reject(err);
                else{
                    const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                    resolve(films);
                }
            })
        })
    }
}

function printArray(array){
    for (const value of array) console.log(value.toString());
}

let library = new FilmLibrary();

async function main(){

    library.retrieveFilms().then((x)=>{
        console.log('Stored films');
        printArray(x);
    });

    library.retrieveFavoriteFilms().then((x)=>{
        console.log('\nFavorite films');
        printArray(x);
    });
    
    library.retrieveFilmsToday().then((x)=>{
        console.log('\nFilms watched today');
        printArray(x);
    });

    let date ='2024-03-15';
    library.retrieveFilmsBeforeDate(date).then((x)=>{
        console.log('\nFilms watched before '+date);
        printArray(x);
    });

    let rating=4;
    library.retrieveFilmsRatingGE(rating).then((x)=>{
        console.log('\nFilms with rating greater or equal to '+rating);
        printArray(x);
    });

    let substring='fi';
    library.retrieveFilmsByTitle(substring).then((x)=>{
        console.log('\nFilms containing '+substring);
        printArray(x);
    });
}

main()