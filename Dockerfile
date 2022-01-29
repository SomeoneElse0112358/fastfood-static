FROM node

WORKDIR /fastfood-static

COPY . .

RUN npm install

 
