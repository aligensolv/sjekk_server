import * as request from "supertest"
import { UserInterface } from "../interfaces/user_interface";
import { host,port } from "../config";

const url = `${host}:${port}`


describe('users api', () => {
    it('Get All Users', async () => {
      const response = await request(url).get('/api/users');
      
      expect(response.status).toBe(200);

      expect(response.body).toMatchObject<UserInterface[]>([
        {
            identifier: expect.any(String),
            name: expect.any(String),
            password: expect.any(String)
        }
      ])
    });

    // get single user
    it('Get user', async () => {
      const response = await request(url).get('/api/users/654f2d5a2e34cb952e0b9bc0')

      expect(response.status).toBe(200)
      expect(response.body).toMatchObject({
        identifier: expect.any(String),
        name: expect.any(String),
        password: expect.any(String)
      })
  })

    // test a not existing user
    it('Unknown user', async () => {
        const response = await request(url).get('/api/users/654f2d5a2e34cb952e0b9bc1')

        expect(response.status).toBe(404)
        expect(response.body).toMatchObject({
            error: expect.any(String)
        })
    })
  });