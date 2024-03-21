import dayjs from 'dayjs';
import sqlite from 'sqlite3';

// Apertura database e creazione oggetto
const db = new sqlite.Database('films copy.db', (err) => {if (err) throw err;});

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

    this.storeFilm = (film) =>{
        return new Promise((resolve,reject)=>{
            let sql='INSERT INTO films(id,title,isFavorite,rating,watchDate,userId) VALUES(?,?,?,?,?,?)';
            db.run(sql,[film.id,film.title,film.favorite===true?1:0,film.score,(film.date===null) ? null : film.date.format('YYYY-MM-DD'),film.user],(err)=>{
                if(err) reject(err);
                else resolve();
            })
        })
    }

    this.removeFilm = (id)=>{
        return new Promise((resolve,reject)=>{
            let sql='DELETE FROM films WHERE id=?'; 
            db.run(sql,[id],(err)=>{
                if(err) reject(err);
                else resolve();
            })
        })
    } 

    this.deleteWatchDate = () => {
        return new Promise((resolve,reject)=>{
            let sql='UPDATE films SET watchDate=NULL'; 
            db.run(sql,[],(err)=>{
                if(err) reject(err);
                else resolve();
            })
        })
    }
}

function printArray(array){
    for (const value of array) console.log(value.toString());
}

let library = new FilmLibrary();

async function main(){
    library.storeFilm(new Film(6,'Forza Lecce',true,null,5,3)).then(console.log('Inserimento andato a buon fine')).catch('Errore nell\'inserimento');
    //library.removeFilm(4).then(console.log('Rimozione andata a buon fine')).catch('Errore nella rimozione');
    //library.deleteWatchDate().then(console.log('Cancellazione data andata a buon fine')).catch('Errore nella cancellazione data');
}

main()