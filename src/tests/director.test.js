const request = require('supertest');
const app = require('../app.js');
require('../models');

let directorId;


test("POST / test to add a director, it should return status 201", async () => {
    const newDirector = {
        firstName: "Scott",
        lastName: "Waugh",
        nationality: "Estadounidense",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7APngDfMjtP5FfkF2RuKqpByto--Ka1Hr5P_WnRv7&s",
        birthday: "1970-03-23"
    }  
    const res = await request(app)
    .post("/directors")
    .send(newDirector);
    directorId= res.body.id;
	expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
});

test('GET/ test to get all Directors, should return status 200', async() => {
    const res= await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].movies).toBeDefined();
});

test("PUT /Directors should update a director, return 200", async () => {
    
    const updatedDirector = {
        birthday: "1974-01-20",
    };
    const res = await request(app)
            .put(`/directors/${directorId}`)
            .send(updatedDirector);
        expect(res.status).toBe(200);
        expect(res.body.birthday).toBe(updatedDirector.birthday);
});
    
test("DELETE /directors/:id should delete retun 204", async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
});