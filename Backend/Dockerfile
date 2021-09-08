FROM openjdk:16-jdk-alpine
RUN mkdir /home/app
COPY target/gipher-backend-0.1.0.jar gipher-backend-0.1.0.jar
ENTRYPOINT ["java","-jar","/gipher-backend-0.1.0.jar"]