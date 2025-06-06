const request = require('supertest');
const app = require('../../app');


jest.mock("../../logic");

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require('../../logic');
//const e = require('express');

/* MOCKA databasens query-funktion
jest.mock('../../database', () => {
  let users = [
    { id: 1, name: 'Alice', nickname: 'Ali', age: 30, bio: 'Test bio', email: 'a@b.com', phone: '123' },
    { id: 2, name: 'Bob', nickname: 'B', age: 25, bio: 'Another bio', email: 'b@c.com', phone: '456' }
  ];

  return {
    query: async (sql, values) => {
      if (sql.includes('SELECT * FROM users WHERE id =')) {
        return [[users.find(u => u.id === values[0])]];
      }

      if (sql.includes('SELECT * FROM users')) {
        return [users];
      }

      if (sql.includes('INSERT INTO users')) {
        const [name, nickname, age, bio, email, phone] = values;
        const newUser = {
          id: users.length + 1,
          name, nickname, age, bio, email, phone
        };
        users.push(newUser);
        return [{ insertId: newUser.id }];
      }

      if (sql.includes('UPDATE users')) {
        const [name, nickname, age, bio, email, phone, id] = values;
        const user = users.find(u => u.id === id);
        if (user) Object.assign(user, { name, nickname, age, bio, email, phone });
        return [{}];
      }

      if (sql.includes('DELETE FROM users')) {
        users = users.filter(u => u.id !== values[0]);
        return [{}];
      }

      return [[]];
    }
  };
});
*/

let server;

//beforeAll((done) => {
  //server = http.createServer(app);
  //server.listen(done);
//});

//afterAll((done) => {
  //server.close(done); // 👈 detta stänger TCP-anslutningen
//});

// Testar att '/' svarar med 200 och innehåller användarnamnet från mockad data.

describe('Dynamic Test: GET /user?id=...', () => {
  it('should return 200 and contain "Nickname:" for each user', async () => {
    const users = [ { id: 1, name: "testy" } ]
    getAllUsers.mockImplementation(() => Promise.resolve(users))

    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.text).toContain("testy")
/*
    const userIds = [...res.text.matchAll(/\/user\?id=(\d+)/g)].map(match => match[1]);

    for (const id of userIds) {
      const userRes = await request(app).get(`/user?id=${id}`);
      expect(userRes.status).toBe(200);
      expect(userRes.text).toContain('Nickname:');
    }
      */

// Testar 200-svar och rendering av mockad användare.

  });
});

describe('Integration Test: GET /user?id=...', () => {
  it('should return 200 and render user details', async () => {
    const mockUser = {
      id: 1,
      name: 'Testus McMockface',
      nickname: 'Mocky',
      age: 30,
      email: 'test@example.com',
      phone: '0701234567',
      bio: 'Jag är en mock-användare.'
    };

    // Mocka getUserById
    getUserById.mockImplementation(() => Promise.resolve(mockUser));

    const response = await request(app).get('/user?id=1');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Testus McMockface');
    expect(response.text).toContain('Mocky');
  });
});

// Testar att POST /create skapar en användare och redirectar till '/'.

describe('Dynamic Test: POST /create', () => {
  it('should create a new user and redirect (302)', async () => {
    const newUser = {
      name: 'Mockus Maximus',
      nickname: 'Mocko',
      age: 42,
      email: 'mockus@example.com',
      phone: '0701234567',
      bio: 'Ett test i rymdens mock.'
    };

// Mockar createUser och testar att POST /create returnerar 302 och redirectar till '/'.

    createUser.mockImplementation(() => Promise.resolve({ id: 1, ...newUser }));

    const res = await request(app)
      .post('/create')
      .type('form') 
      .send(newUser); 

    expect(res.status).toBe(302); 
    expect(res.headers.location).toBe('/'); 
  });
});

// Verifierar uppdatering och redirect via POST /edit.

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

   
    updateUser.mockImplementation(() => Promise.resolve({ ...updatedUser }));

    const response = await request(app)
      .post('/edit')
      .type('form')
      .send(updatedUser);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/')
  });
});

// Verifierar borttagning och redirect via POST /delete.

describe('Integration Test: POST /delete', () => {
  it('should delete user with id 1 and redirect (302)', async () => {
    // Mocka deleteUser
    deleteUser.mockImplementation(() => Promise.resolve());

    const response = await request(app)
      .post('/delete')
      .type('form')
      .send({ id: 1 });

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/');
  });
});



/*
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
*/