FROM node:16
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
ENV PORT=3010
ENV DB_USER=postgres
ENV DB_HOST=quiz-db
ENV DB_NAME=quiz
ENV DB_PASSWORD=docker
ENV DB_PORT=5432
EXPOSE 3010
CMD ["node", "index.js"]