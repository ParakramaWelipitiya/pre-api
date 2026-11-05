# pre-api

A hardened, production-ready Node.js & Express REST API boilerplate designed for high-performance, secure, and zero-budget serverless deployments.

## Enterprise Features

- **Decoupled Architecture:** `app.js` is isolated from `server.js` for seamless automated testing without port collisions.
- **Military-Grade Security:** Pre-configured with Helmet (HTTP headers), strict CORS policies, and rate-limiting to help prevent DDoS and brute-force attacks.
- **Smart Observability:** Integrated Winston & Morgan logging. Automatically writes local file logs (`logs/combined.log`) during development, and features a serverless kill-switch to prevent file-system crashes when deployed to Vercel.
- **Automated Testing:** CI-ready test suite built with Jest and Supertest.
- **Continuous Integration:** GitHub Actions pipeline configured to validate testing environments on every push.
- **Multi-Platform Deployment:** Includes a lightweight Alpine Linux `Dockerfile` for containerization and a `vercel.json` configuration for serverless deployment.

## Tech Stack

- **Runtime:** Node.js (v20+)
- **Framework:** Express.js
- **Security:** Helmet, express-rate-limit, cors
- **Logging:** Winston, Morgan
- **Testing:** Jest, Supertest
- **Deployment:** Vercel (Serverless) / Docker (Containerized)

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/parakramawelipitiya/pre-api.git
cd pre-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
ALLOWED_ORIGIN=*
```

### 4. Start the Server

```bash
node server.js
```

The API will be available at:

`http://localhost:5000/api/health`

## Testing

Run the automated Jest test suite to validate endpoint reliability:

```bash
npm test
```

## Deployment

### Vercel (Serverless)

The repository includes a `vercel.json` routing configuration. Link the project using the Vercel CLI and deploy:

```bash
vercel --prod
```

### Docker (Containers)

Build the Docker image:

```bash
docker build -t pre-api .
```

Run the container:

```bash
docker run -p 5000:5000 pre-api
```