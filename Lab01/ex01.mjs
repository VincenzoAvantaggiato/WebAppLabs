import dayjs from 'dayjs';

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
}

function printArray(array){
    for (const value of array) console.log(value.toString());
}

let library = new FilmLibrary();
library.addNewFilm(new Film(1,'Pulp Fiction',true,'2024-03-10',5));
library.addNewFilm(new Film(2,'21 Grams',true,'2024-03-17',4));
library.addNewFilm(new Film(3,'Star Wars'));
library.addNewFilm(new Film(4,'Matrix'));
library.addNewFilm(new Film(5,'Shrek',false,'2024-03-21',3));

console.log('Films:');
printArray(library.films);

console.log('\nFilms sorted by date:');
printArray(library.sortByDate());

console.log('\nRated films: ');
printArray(library.getRated());

library.deleteFilm(3);
console.log('\nRemoved film 3');
printArray(library.films);

library.resetWatchedFilms();
console.log('\nReset the watched films');
printArray(library.films);