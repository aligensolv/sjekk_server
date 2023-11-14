import * as request from "supertest"
import { host,port } from "../config.js";

const url = `${host}:${port}`

describe('places test', () => {
    test('get places', async () => {
        const response = await request(url).get('/api/places');
        
        expect(response.status).toBe(200);

        expect(response.body).toMatchObject([
            {
                location: expect.any(String),
                policy: expect.any(String),
            }
        ])
    })
})