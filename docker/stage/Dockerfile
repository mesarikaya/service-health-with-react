# build environment
FROM node:16.13.0-alpine as react-build
WORKDIR /app
COPY package*.json ./
#RUN apk update --no-cache add libgcrypt libcrypto libcurl libxml libssl
#RUN apk update --no-cache add libgcrypt>=1.9.1  libcrypto>=1.1.1l-r0 libcurl>=7.78.0-r0 libxml>=2.9.10-r7 libssl>=1.1.1l-r0
RUN npm install --legacy-peer-deps
RUN npm config set legacy-peer-deps true
COPY . ./

RUN npm run build:stage

# server environment
FROM nginx:1.23.1-alpine
# Install libxml2, workaround for CVE-2021-3517
RUN apk add libxml2-dev
# Install libxml2, workaround for CVE-2022-27404
RUN apk add --upgrade freetype
# Install libxml2, workaround for CVE-2021-30560
RUN apk add --upgrade libxslt
# Install curl, workaround for CVE-2021-22945
RUN apk add --upgrade curl
COPY nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT 8080
ENV HOST 0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
