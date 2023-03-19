const request = require('supertest');
const app = require('../app.js');
require('../models');

let genreId;


test("POST / test to add a genre, it should return status 201", async () => {
    const newGenre = {
        name: "Accion"
    }  
    const res = await request(app)
    .post("/genres")
    .send(newGenre);
    genreId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
});

test('GET/ test to get all Genres, should return status 200', async() => {
    const res= await request(app).get("/genres");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test("PUT /Genres should update a genre, return 200", async () => {
    
    const updatedGenre = {
        name: "Poesia",
    };
    const res = await request(app)
            .put(`/genres/${genreId}`)
            .send(updatedGenre);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedGenre.name);
});
    
test("DELETE /genres/:id should delete retun 204", async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
});