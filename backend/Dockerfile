# syntax=docker/dockerfile:1

#######################
# 1. Build the JAR    #
#######################
FROM maven:3.9.7-eclipse-temurin-21 AS build
WORKDIR /app

# copy only the files Maven needs to resolve dependencies
COPY pom.xml .
COPY src ./src

RUN mvn -q package -DskipTests   # or omit -DskipTests for real CI

#######################
# 2. Run it           #
#######################
FROM eclipse-temurin:21-jre
WORKDIR /app

# copy the jar that Maven just created
COPY --from=build /app/target/*.jar app.jar

# Spring will bind to whatever $PORT the PaaS injects
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
