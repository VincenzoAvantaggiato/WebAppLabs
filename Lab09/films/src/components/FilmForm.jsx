import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';
import { Link, useNavigate, useParams } from 'react-router-dom';


function FilmForm(props){
    const [title,setTitle] = useState(props.film? props.film.title :'');
    const [rating,setRating] = useState(props.film? props.film.rating :'');
    const [date,setDate] = useState(props.film? props.film.watchDate==null? null: dayjs(props.film.watchDate).format("YYYY-MM-DD") :null);
    const [favorite,setFavorite]= useState(props.film? props.film.favorite : false);
    const [invalidTitle,setInvalidTitle]= useState(false);
    const [invalidDate,setInvalidDate]= useState(false);
    const navigate = useNavigate();

    const handleSubmit= (event) =>{
        event.preventDefault();
        let invalidT=false;
        let invalidD=false;
        let film={title,rating,date,favorite};
        if (title.trim()=='') {
            setInvalidTitle(true);
            invalidT=true;
        }
        else {
            setInvalidTitle(false);
            invalidT=false;
        };
        if (date!==null && dayjs(date).isAfter(dayjs())) {
            setInvalidDate(true);
            invalidD=true;
        }
        else{
            setInvalidDate(false);
            invalidD=false;
        }
        if(!invalidT&&!invalidD){
            if (!props.film) props.addFilm(film);
            else {
                film=({id:props.film.id,...film})
                props.updateFilm(film);
            }
            navigate(props.film? "../..":"..",{relative: "path"})
        }
    
        
    }
    return (
        <>
        {!props.film && <h2>Add film</h2>}
        {props.film && <h2>Edit film</h2>}
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control value={title} required={true} type='text' minLength={1} onChange={(event) => setTitle(event.target.value)} isInvalid={invalidTitle}></Form.Control>
                <Form.Control.Feedback type='invalid'>Title can't be empty</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
                <Form.Label>Rating</Form.Label>
                <Form.Control value={rating}  type='number' min={0} max={5} onChange={(event) => setRating(event.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Favorite</Form.Label>
                <Form.Check checked={favorite} onChange={() => setFavorite(old=>!old)}></Form.Check>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control value={date} type='date' onChange={(event) => setDate(event.target.value)} isInvalid={invalidDate}></Form.Control>
                <Form.Control.Feedback type='invalid'>Date is in the future</Form.Control.Feedback>
            </Form.Group>
            {!props.film &&<Button className="my-2 me-2" variant='success' type='submit'>Add</Button>}
            {props.film &&<Button className="my-2 me-2" variant='success' type='submit'>Edit</Button>}
            <Link className='btn btn-danger' to={props.film? "../.." : ".."}>Cancel</Link>
        </Form>
        </>
    )
}

function EditForm(props) {
    const {id} = useParams();
    const film= props.getFilmById(id);
    if (film==null) return (<h1>No film with this id!</h1>);
    props.setEditableFilm(film);
    return (<FilmForm updateFilm={props.updateFilm} film={props.editableFilm} key={props.editableFilm.id}></FilmForm>);
}

export {FilmForm, EditForm};