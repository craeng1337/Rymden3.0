const request = require('supertest');
const app = require('../../app');
//const http = require('http');

let server;

//beforeAll((done) => {
  //server = http.createServer(app);
  //server.listen(done);
//});

//afterAll((done) => {
  //server.close(done); // 👈 detta stänger TCP-anslutningen
//});

describe('Dynamic Test: GET /user?id=...', () => {
  it('should return 200 and contain "Nickname:" for each user', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);

    const userIds = [...res.text.matchAll(/\/user\?id=(\d+)/g)].map(match => match[1]);

    for (const id of userIds) {
      const userRes = await request(app).get(`/user?id=${id}`);
      expect(userRes.status).toBe(200);
      expect(userRes.text).toContain('Nickname:');
    }
  });
});


describe('Integration Test: POST /create', () => {
  it('should create a new user and redirect (302)', async () => {
    const newUser = {
      name: 'Testus Maximus',
      nickname: 'Testo',
      age: 42,
      email: 'testus@example.com',
      phone: '0701234567',
      bio: 'Ett test i rymdens namn.'
    };

    const response = await request(app)
      .post('/create')
      .type('form')
      .send(newUser);

    expect(response.status).toBe(302); // redirect efter successful save
    expect(response.headers.location).toBe('/'); // omdirigeras till startsidan
  });
});

describe('Integration Test: POST /edit', () => {
  it('should update a user and redirect (302)', async () => {
    const updatedUser = {
      id: 1,
      name: 'Uppdaterad Testus',
      nickname: 'U-Testo',
      age: 44,
      email: 'updated@example.com',
      phone: '0709999999',
      bio: 'Nu är jag uppdaterad i databasen.'
    };

    const response = await request(app)
      .post('/edit')
      .type('form')
      .send(updatedUser);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/');
  });
});

describe('Integration Test: POST /delete', () => {
  it('should delete user with id 1 and redirect (302)', async () => {
    const response = await request(app)
      .post('/delete')
      .type('form')
      .send({ id: 1 });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/');
  });
});

describe('Integration Test: GET / includes new user', () => {
  it('should include "Testus Maximus" in the user list', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Testus Maximus');
  });
});
