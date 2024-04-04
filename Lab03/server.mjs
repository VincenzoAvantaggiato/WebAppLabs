import express, {json} from 'express';
import morgan from 'morgan';
import {check, validationResult} from 'express-validator';
import { getFilm, removeFilm, retrieveFavoriteFilms, retrieveFilms, retrieveFilmsAfterDate, retrieveFilmsRatingGE, retrieveUnseenFilms, storeFilm, updateFavorite, updateFilm, updateRating } from './DAO.mjs';
import dayjs from 'dayjs';

const app = express();
const port = 3001;

app.use(json());
app.use(morgan('dev'));


app.get('/api/films',(req,res)=>{
    retrieveFilms()
    .then(films=>res.json(films))
    .catch(()=>res.status(500).end());
})

app.get('/api/films/favorite',(req,res)=>{
    retrieveFavoriteFilms()
    .then(films=>res.json(films))
    .catch(()=>res.status(500).end());
})

app.get('/api/films/best',(req,res)=>{
    retrieveFilmsRatingGE(5)
    .then(films=>res.json(films))
    .catch(()=>res.status(500).end());
})

app.get('/api/films/recent',(req,res)=>{
    retrieveFilmsAfterDate(dayjs().subtract(1,'month'))
    .then(films=>res.json(films))
    .catch(()=>res.status(500).end());
})

app.get('/api/films/unseen',(req,res)=>{
    retrieveUnseenFilms()
    .then(films=>res.json(films))
    .catch(()=>res.status(500).end());
})

app.get('/api/films/:id',(req,res)=>{
    getFilm(req.params.id)
    .then(film=>{
        if(film) res.json(film);
        else res.status(404).end();
    })
    .catch(()=>res.status(500).end());
})

app.post('/api/films',[
    check('title').notEmpty(),
    check('favorite').isNumeric(),
    check('date').isDate({format: 'YYYY-MM-DD'}),
    check('score').isNumeric(),
    check('user').isNumeric()
    ],(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        } else{
            const film = req.body;
            storeFilm(film).then(id=>{
                if(id==-1) res.status(422).end();
                else{
                    console.log('Assigned ID: '+id);
                    res.status(201).json({id: id});
                }
            })
            .catch(()=>res.status(503).end());
        }
    })

app.put('/api/films/:id',[
    check('title').notEmpty(),
    check('favorite').isNumeric(),
    check('date').isDate({format: 'YYYY-MM-DD'}),
    check('score').isNumeric(),
    check('user').isNumeric()
    ],(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        } else{
            updateFilm(req.params.id,req.body)
            .then(c=>{
                if (c==-1) res.status(422).end();
                else if (c==0) res.status(404).end();
                else res.status(204).end();
            })
            .catch(()=>res.status(500).end());
        }
    })

app.put('/api/films/:id/score',(req,res)=>{
    updateRating(req.params.id,req.body.score)
    .then(c=>{
        if (c==0) res.status(404).end();
        else res.status(204).end();
    })
    .catch(()=>res.status(500).end());
})

app.put('/api/films/:id/favorite',(req,res)=>{
    updateFavorite(req.params.id,req.body.favorite)
    .then(c=>{
        if (c==0) res.status(404).end();
        else res.status(204).end();
    })
    .catch(()=>res.status(500).end());
})

app.delete('/api/films/:id',(req,res)=>{
    removeFilm(req.params.id)
    .then(c=>{
        if (c==0) res.status(404).end();
        else res.status(204).end();
    })
    .catch(()=>res.status(500).end());
})

app.listen(port,()=>console.log("Server started on http://localhost:"+port));