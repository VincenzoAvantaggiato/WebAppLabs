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

    this.favorite = () => {
        return this.films.filter(f=>f.favorite);
    }

    this.best = () => {
        return this.films.filter(f=>f.score==5);
    }

    this.recent = () => {
        return this.films.filter(f=>f.date>=dayjs().subtract(1,'month'));
    }

    this.unseen = () => {
        return this.films.filter(f=>f.date==null);
    }

    this.delete = (id) => {
        this.films=this.films.filter(f=>f.id!=id);
    }
}

function createFilmRow(film){
    let row=document.createElement('div');
    row.className='row my-3';

    let title=document.createElement('div');
    title.className='col-3';
    title.innerText = film.title;
    row.appendChild(title);

    let favorite=document.createElement('div');
    favorite.className='form-check col-2';
    if (film.favorite) favorite.innerHTML='<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked><label class="form-check-label" for="flexCheckChecked">Favorite</label>';
    else favorite.innerHTML = '<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"><label class="form-check-label" for="flexCheckDefault">Favorite</label>';
    row.appendChild(favorite);

    let date=document.createElement('div');
    date.className = 'col-3';
    if(film.date) date.innerText = film.date.format("MMMM DD, YYYY");
    row.appendChild(date);

    let score=document.createElement('div');
    score.className='col-2';
    
    for (let i=0;i<film.score;i++){
        const starFill = document.createElement('i');
        starFill.className='bi bi-star-fill';
        score.appendChild(starFill);
    }
    for (let i=0;i<5-film.score;i++){
        const star = document.createElement('i');
        star.className='bi bi-star';
        score.appendChild(star);
    }
    row.appendChild(score);

    let buttons=document.createElement('div');
    buttons.className='col-2';
    let pen=document.createElement('button');
    pen.className='btn';
    pen.innerHTML='<i class="bi bi-pen"></i>';
    buttons.appendChild(pen);
    let trash=document.createElement('button');
    trash.className='btn';
    trash.innerHTML='<i class="bi bi-trash"></i>';
    buttons.appendChild(trash);
    row.appendChild(buttons);

    let hr=document.createElement('hr');
    hr.className="hr";
    row.append(hr);

    trash.addEventListener('click',event=>{
        library.delete(film.id);
        row.remove();
    })

    return row;
}

function fillFilmList(tab,films){
    const filmTable = document.getElementById('films-list');
    filmTable.innerHTML="";
    let h1=document.createElement('h1');
    h1.innerText=tab;
    filmTable.append(h1);
    for (const film of films) {
        let filmRow=createFilmRow(film);
        filmTable.append(filmRow);
        
    }
}



export {Film, FilmLibrary}