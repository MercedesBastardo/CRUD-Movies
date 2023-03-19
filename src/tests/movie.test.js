
const request = require('supertest');
const app = require('../app.js');
const Actor = require('../models/Actor.js');
const Director = require('../models/Director.js');
const Genre = require('../models/Genre.js');

require('../models');

let movieId;

test("POST / test to add a movie, it should return status 201", async () => {
    const newMovie = {
        name: "Need for Speed",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSuF55QJFnp66NVa0uXJD2PK4hBzd2k3CXAq7d9FC6gj8fsFHCc",
        synopsis: "Tobey es un joven piloto de carreras clandestinas que posee su propio garaje para modificar los coches y hacerlos más rápidos. Cuando su mejor amigo muere en una de las competiciones, Tobey es enviado a prisión, pero buscará la revancha cuando sea puesto en libertad.",
        releaseYear :"2014-03-13"
    }
   
    const res = await request(app)
    .post("/movies")
    .send(newMovie);
    movieId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
})

test('GET/ test to get all Movies, should return status 200', async() => {
    const res= await request(app).get('/movies')
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1);
    expect(res.body[0].actors).toBeDefined();
    expect(res.body[0].directors).toBeDefined();
    expect(res.body[0].genres).toBeDefined();
})

test("PUT /movie should update a movie, return 200", async () => {
    
const updatedMovie = {
    name: "Need for Speed, new",
}
const res = await request(app)
            .put(`/movies/${movieId}`)
            .send(updatedMovie);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updatedMovie.name);
})
test("POST /movie/:id/actors should set the movie actors", async () => {
    
    const actor = await Actor.create({ 
        firstName: "Aaron",
        lastName: "Paul",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Aaron_Paul_by_Gage_Skidmore_3.jpg/330px-Aaron_Paul_by_Gage_Skidmore_3.jpg",
        birthday: "1979-08-27"
    });
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([actor.id]);
        await actor.destroy();
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
      });
test("POST /movie/:id/directors should set the movie directors", async () => {
    
    const director = await Director.create({ 
        firstName: "Scott",
        lastName: "Waugh",
        nationality: "Estadounidense",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7APngDfMjtP5FfkF2RuKqpByto--Ka1Hr5P_WnRv7&s",
        birthday: "1970-03-23"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/directors`)
      .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

test("POST /movies/:id/genres should set the movie genres", async () => {
    const genre = await Genre.create({ 
        name: "rock" 
    });
    const res = await request(app)
      .post(`/movies/${movieId}/genres`)
      .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

test("DELETE /movies/:id should delete retun 204", async () => {

    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);

});
