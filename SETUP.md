# How to Run the Project

## Prerequisites
- Node.js (v18+)
- Yarn
- Docker Desktop

## Steps

### 1. Install Dependencies
```bash
yarn install
```
*Note: This project uses Yarn Workspaces - one command installs both frontend and backend.*

### 2. Start MongoDB (Docker)
```bash
docker compose -f docker-compose.dev.yml up
```

### 3. Seed Database
```bash
cd be
yarn seed
```

### 4. Start Backend
```bash
cd be
yarn dev
```

### 5. Start Frontend
```bash
cd fe
yarn dev
```

### 6. Open Browser
http://localhost:5173

---

## API Examples

- All products: `http://localhost:5000/api/products`
- Search: `http://localhost:5000/api/products?search=pralka`
- Filter: `http://localhost:5000/api/products?energyClass=A&sort=price`

---

## Stop Everything

- Press `Ctrl+C` in terminals
- Stop Docker: `docker compose -f docker-compose.dev.yml down`
