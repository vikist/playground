FROM openjdk:8-jdk
WORKDIR /app

COPY target/play-server*.jar ./play-server.jar

CMD ["java", "-jar", "/app/play-server.jar"]

# FROM maven:3.5-jdk-8-alpine
# WORKDIR /app
# COPY ./ /app
# RUN mvn install

# FROM openjdk:8-jre-alpine
# WORKDIR /app
# COPY target/play-server*.jar ./play-server.jar

# CMD ["java", "-jar", "/app/play-server.jar"]