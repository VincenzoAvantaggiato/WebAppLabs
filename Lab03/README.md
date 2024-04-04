## APIs
Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List all films__

URL: `/api/films`

HTTP Method: GET.

Description: Retrieve all films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "date": "2024-03-09",
    "score": 5,
    "user": 1
  },
  ...
]
```

### __List favorite films__

URL: `/api/films/favorite`

HTTP Method: GET.

Description: Retrieve all favorite films.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "date": "2024-03-09",
    "score": 5,
    "user": 1
  },
  ...
]
```
### __List best films__

URL: `/api/films/best`

HTTP Method: GET.

Description: Retrieve films rated 5/5.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "date": "2024-03-09",
    "score": 5,
    "user": 1
  },
  ...
]
```
### __List recently seen films__

URL: `/api/films/recent`

HTTP Method: GET.

Description: Retrieve films watched in the last month.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 1,
    "title": "Pulp Fiction",
    "favorite": 1,
    "date": "2024-03-09",
    "score": 5,
    "user": 1
  },
  ...
]
```

### __List unseen films__

URL: `/api/films/unseen`

HTTP Method: GET.

Description: Retrieve films without a watch date.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:
```
[
  {
    "id": 3,
    "title": "Star Wars",
    "favorite": 0,
    "date": null,
    "score": null,
    "user": 1
  },
  ...
]
```

### __Get a single film__

URL: `/api/films/<id>`

HTTP Method: GET.

Description: Retrieve a film given its `<id>`.

Response: `200 OK` (success),`404 Not Found` (wrong id), `500 Internal Server Error` (generic error).

Response body:
```
{
  "id": 2,
  "title": "21 Grams",
  "isFavorite": 1,
  "rating": 4,
  "watchDate": "2024-03-17",
  "userId": 1
}
```

## __Create a new film__

URL: `/api/films`

HTTP Method: POST.

Description: Create a new film.

Request body:
```
{
    "title": "Shrek 4",
    "favorite": 1,
    "date": "2024-03-10",
    "score": 5,
    "user": 1
}
```

Response: `201 Created` (success) or `503 Service Unavailable` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: 
```
{
  "id": 6
}
```
## __Update a film__

URL: `/api/films/<id>`

HTTP Method: PUT.

Description: Update a film given its `<id>`.

Request body:
```
{
    "title": "Shrek 3",
    "favorite": 1,
    "date": "2024-03-10",
    "score": 4,
    "user": 1
}
```

Response: `204 No content` (success), `404 Not Found` (wrong id), `500 Internal Server Error` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: __None__

## __Update rating__

URL: `/api/films/<id>/score`

HTTP Method: PUT.

Description: Update the rating of a film given its `<id>`.

Request body:
```
{
    "score": 3
}
```

Response: `204 No content` (success),`404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body: __None__

## __Update favorite__

URL: `/api/films/<id>/favorite`

HTTP Method: PUT.

Description: Mark a film as favorite/unfavorite given its `<id>`.

Request body:
```
{
    "favorite": 0
}
```

Response: `204 No content` (success),`404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body: __None__

## __Remove a film__

URL: `/api/films/<id>`

HTTP Method: REMOVE.

Description: Remove a film given its `<id>`.

Request body: __None__

Response: `204 No content` (success),`404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body: __None__


