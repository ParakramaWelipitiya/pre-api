const request = require('supertest');
const app = require('../app'); // Import the decoupled app

describe('Health Endpoint /api/health', () => {
    it('should return 200 OK and success message', async () => {
        const response = await request(app).get('/api/health');
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'success');
        expect(response.body).toHaveProperty('message', 'pre-api is running securely!');
    });
});