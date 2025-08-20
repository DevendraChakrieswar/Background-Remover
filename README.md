# Background Remover (Full Stack)

An end‑to‑end background removal web app. The frontend lets users upload images and preview results; the backend processes images and returns the subject with the background removed. This repository contains both the UI and API so you can develop and deploy the full product together.

Key features:
- Fast client experience built with Vite + React
- Java Spring Boot API for robust server-side processing
- Environment‑based configuration (no secrets in Git)
- Containerized backend (Docker) and easy deployment to Render

- Client: `client/` (Vite + React)
- Server: `server/` (Spring Boot, Java 17, Maven)

## Tech Stack
- Frontend: React, Vite, Node 18+
- Backend: Spring Boot, Java 17, Maven Wrapper
- Container: Docker (optional)
- Deployment: Render (backend)

## Repository Structure
```
Bg-remover/
├─ client/               # React app (Vite)
├─ server/               # Spring Boot app
│  ├─ src/main/resources/
│  │  ├─ application.example.properties  # template (do not commit secrets)
│  │  └─ application.properties          # ignored by Git
│  └─ Dockerfile                         # Docker image for backend
├─ .gitattributes        # normalize line endings
├─ Dockerfile            # (legacy root dockerfile – not used for Render)
└─ README.md             # this file
```

## Prerequisites
- Node.js 18+ and npm 9+
- Java 17 (Temurin) and Maven Wrapper (included in `server/`)
- Git

## Environment Variables
Backend (`server/`): copy the example file and fill in your values.
```
# inside server/src/main/resources
copy application.example.properties application.properties
```
Recommended: reference secrets via environment variables in properties, e.g.
```
removebg.api.key=${REMOVE_BG_API_KEY}
```
Then set `REMOVE_BG_API_KEY` as an env var (locally or in Render).

## Local Development
### 1) Start the backend
```
# from repository root
cd server
# Windows PowerShell
./mvnw -DskipTests spring-boot:run
# or build a JAR
./mvnw -DskipTests package
java -Dserver.port=8080 -jar target/*.jar
```

### 2) Start the frontend
```
# from repository root
cd client
npm install
npm run dev
```
Default ports:
- Backend: 8080 (or as configured)
- Frontend: 5173 (Vite)

## Build
### Client
```
cd client
npm run build
```
Build output: `client/dist`

### Server
```
cd server
./mvnw -DskipTests package
```
Output JAR: `server/target/*.jar`

## Docker (Backend)
A dedicated backend Dockerfile exists at `server/Dockerfile` (multi-stage).

Build and run locally:
```
cd server
# build image
docker build -t bg-remover-server .
# run container (bind local port 8080)
docker run -e PORT=8080 -p 8080:8080 bg-remover-server
```
The container entrypoint binds to `$PORT` (Render requirement). For local runs we pass `-e PORT=8080`.

Optional `.dockerignore` (create at `server/.dockerignore`):
```
target
.mvn
.git
.gitignore
Dockerfile
*.iml
.idea
.vscode
```

## Deploy: Render (Backend)
Option A: Docker (recommended for consistency)
- Create a new Web Service on Render.
- Repository: this repo
- Root Directory: `server/`
- Render will auto-detect `server/Dockerfile`.
- Set environment variables (e.g., `REMOVE_BG_API_KEY`, DB creds).
- Deploy.

Option B: Native Java
- Create a Web Service (Runtime: Java)
- Root Directory: `server/`
- Build Command: `./mvnw -DskipTests package`
- Start Command: `java -Dserver.port=$PORT -jar target/*.jar`

Health check path (if using Actuator): `/actuator/health`.

## Line Endings
This repo includes a root `.gitattributes` to normalize files to LF on commit and avoid noisy CRLF warnings on Windows. To re-normalize after adding it:
```
git add --renormalize .
git commit -m "Normalize line endings via .gitattributes"
```

## Troubleshooting
- Render build error: "failed to read dockerfile" → ensure the file is named exactly `server/Dockerfile` (case-sensitive) and service Root Directory is `server/`.
- `application.properties` ignored but tracked → remove from Git:
```
git rm --cached server/src/main/resources/application.properties
git commit -m "Stop tracking application.properties"
```
- CORS errors from frontend → configure CORS in Spring Boot or via proxy in Vite.

## Scripts (quick reference)
- Backend dev: `./mvnw spring-boot:run`
- Backend build: `./mvnw package`
- Frontend dev: `npm run dev`
- Frontend build: `npm run build`

