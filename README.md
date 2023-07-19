# URL Shortener API

The URL Shortener API allows you to shorten long URLs into shorter, more manageable links. It uses Node.js and PostgreSQL for URL mapping storage.

## Getting Started

To get started with the URL Shortener API, follow these instructions:

### Prerequisites

- Node.js (version 12 or higher)
- PostgreSQL database
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Adithya-Adi/url-shortener-api.git
cd url-shortener-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and configure your PostgreSQL database:

```env
DB_USER=your_postgres_username
DB_PASS=your_postgres_password
DB_HOST=your_postgres_host
DB_PORT=5432
DB_NAME=your_postgres_database
PORT=3000
```

### Database Setup

1. Create a new PostgreSQL database , and note down the connection details such as the database name, username, password, host, and port.

2. Update the `.env` file with your PostgreSQL database configuration.

3. If you're using a self-signed certificate or running in a development environment, set `rejectUnauthorized: false` in the `ssl` option of the database configuration in `db.js`. For production, use a valid SSL certificate and set `rejectUnauthorized: true`.

### Running the API

Start the URL Shortener API server:

```bash
npm start
```

The server should now be running on http://localhost:3000 (or the port you specified in the `.env` file).

## API Endpoints

### Shorten URL

- **Endpoint:** POST /shorten
- **Request Body:**
  ```json
  {
    "originalUrl": "https://example.com/very-long-url"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "http://localhost:3000/abcdEf"
  }
  ```

### Redirect to Original URL

- **Endpoint:** GET /:shortCode
- **Response:**
  If the short code exists, the server will redirect to the original URL. Otherwise, it will respond with a 404 status and the following JSON:
  ```json
  {
    "error": "URL not found."
  }
  ```

## Deployed API Endpoint

The URL Shortener API is deployed and accessible at the following endpoint:

https://url-shortener-zccn.onrender.com/shorten

---
