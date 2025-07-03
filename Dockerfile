# Build frontend
FROM node:18 AS frontend
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install && npm run build

# Build backend
FROM python:3.10-slim
WORKDIR /app
COPY backend/ ./backend/
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy built frontend into backend static files
COPY --from=frontend /app/frontend/dist /app/backend/static

EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
