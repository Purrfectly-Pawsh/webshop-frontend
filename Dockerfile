FROM node:18 as react-build
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build 

FROM node:18
RUN npm install -g serve
COPY --from=react-build /app/dist /dist
EXPOSE 5173
CMD serve -s dist -p 5173
