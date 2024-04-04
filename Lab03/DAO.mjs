import sqlite from 'sqlite3';
import {Film} from './objects.mjs'
import dayjs from 'dayjs';

// Apertura database e creazione oggetto
const db = new sqlite.Database('films.db', (err) => {if (err) throw err;});

export const  retrieveFilms = () =>{
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

export const retrieveFavoriteFilms = () =>{
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

export const retrieveFilmsRatingGE = (rating) =>{
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

export const retrieveFilmsAfterDate = (date) =>{
    return new Promise((resolve,reject)=>{
        const sql= 'SELECT * FROM films WHERE watchDate>?' ;
        db.all(sql,[dayjs(date).format('YYYY-MM-DD')],(err,rows)=>{
            if(err) reject(err);
            else{
                const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                resolve(films);
            }
        })
    })
}

export const retrieveUnseenFilms = () =>{
    return new Promise((resolve,reject)=>{
        const sql= 'SELECT * FROM films WHERE watchDate IS NULL' ;
        db.all(sql,[],(err,rows)=>{
            if(err) reject(err);
            else{
                const films = rows.map(r=> new Film(r.id,r.title,r.isFavorite,r.watchDate,r.rating,r.userID));
                resolve(films);
            }
        })
    })
}

export const getFilm = (id) => {
    return new Promise((resolve,reject)=>{
        const sql = 'SELECT * FROM films WHERE id=?';
        db.get(sql,[id],(err,row)=>{
            if(err) reject(err);
            else resolve(row);
        })
    })
}

export const storeFilm = (film) =>{
    return new Promise((resolve,reject)=>{
        let sql = 'SELECT id FROM users WHERE id=?';
        db.get(sql,[film.user],(err,row)=>{
            if(err) reject(err);
            else if(!row) resolve(-1);
            else{
                sql='INSERT INTO films(title,isFavorite,rating,watchDate,userId) VALUES(?,?,?,?,?)';
                db.run(sql,[film.title,film.favorite==true?1:0,film.score,(film.date===null) ? null : dayjs(film.date).format('YYYY-MM-DD'),film.user],function (err) {
                    if(err) reject(err);
                    else resolve(this.lastID);
                })
            }
        })
    })
}

export const updateFilm = (id,film) => {
    return new Promise((resolve,reject)=>{
        let sql = 'SELECT id FROM users WHERE id=?';
        db.get(sql,[film.user],(err,row)=>{
            if(err) reject(err);
            else if(!row) resolve(-1);
            else{
                let sql='UPDATE films SET title=?,isFavorite=?,rating=?,watchDate=?,userId=? WHERE id=?';
                db.run(sql,[film.title,film.favorite==true?1:0,film.score,(film.date===null) ? null : dayjs(film.date).format('YYYY-MM-DD'),film.user, id],function (err) {
                    if(err) reject(err);
                    else resolve(this.changes);
                })
            }
        })
    })
}

export const updateRating = (id,score) => {
    return new Promise((resolve,reject)=>{
        let sql='UPDATE films SET rating=? WHERE id=?';
        db.run(sql,[score, id],function (err) {
            if(err) reject(err);
            else resolve(this.changes);
        })
    })
}

export const updateFavorite = (id,favorite) => {
    return new Promise((resolve,reject)=>{
        let sql='UPDATE films SET isFavorite=? WHERE id=?';
        db.run(sql,[favorite, id],function (err) {
            if(err) reject(err);
            else resolve(this.changes);
        })
    })
}

export const removeFilm = (id)=>{
    return new Promise((resolve,reject)=>{
        let sql='DELETE FROM films WHERE id=?'; 
        db.run(sql,[id],function (err){
            if(err) reject(err);
            else resolve(this.changes);
        })
    })
} 