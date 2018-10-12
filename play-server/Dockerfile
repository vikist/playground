FROM openjdk:8-jdk
WORKDIR /app

COPY target/play-server*.jar ./play-server.jar

CMD ["java", "-jar", "/app/play-server.jar"]