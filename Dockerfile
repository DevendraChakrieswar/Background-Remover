# Stage 1: Build the frontend
FROM node:18-alpine AS build-frontend
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build the backend
FROM maven:3.8.4-openjdk-17 AS build-backend
WORKDIR /app/removebg
COPY removebg/pom.xml .
COPY removebg/src ./src
RUN mvn clean install -DskipTests

# Stage 3: Create the final image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built frontend assets
COPY --from=build-frontend /app/client/dist /app/src/main/resources/static

# Copy the built backend application
COPY --from=build-backend /app/removebg/target/*.jar /app/app.jar

# Set environment variables for database connection
ENV SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/removebgdb
ENV SPRING_DATASOURCE_USERNAME=root
ENV SPRING_DATASOURCE_PASSWORD=Devendra@9999

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
