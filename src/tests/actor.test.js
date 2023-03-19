const request = require('supertest');
const app = require('../app.js');
require('../models');

let actorId;


test("POST / test to add an Actor, it should return status 201", async () => {
    const newActor = {
        firstName: "David",
        lastName: "Spade",
        nationality: "Estadounidense",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/David_Spade_1.jpg/375px-David_Spade_1.jpg",
        birthday: "1964-07-22"
    }  
    const res = await request(app)
    .post("/actors")
    .send(newActor);
    actorId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newActor.firstName);
});

test('GET/ test to get all Actors, should return status 200', async() => {
    const res= await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test("PUT /Actor should update an actor, return 200", async () => {
    
    const updatedActor = {
        birthday: "1987-10-12",
    };
    const res = await request(app)
            .put(`/actors/${actorId}`)
            .send(updatedActor);
        expect(res.status).toBe(200);
        expect(res.body.birthday).toBe(updatedActor.birthday);
});
    
test("DELETE /actors/:id should delete retun 204", async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
});
