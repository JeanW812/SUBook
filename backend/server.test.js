import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './index.js'; // Must include the .js extension in ES Modules!

describe('Backend Health Check', () => {
  it('should return 200 OK on the root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Backend is running!');
  });
});