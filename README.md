# Agile coding test (photoviewer)

## Project setup

Installs all dependencies

```
yarn install
```

Compiles and minifies for production

```
yarn build
```

## In order to serve index.html in a browser you need an HTTP server.

For example serve:

```
npm install -g serve
serve -s dist
```

The default port is 5000, but can be adjusted using the -l or --listen flags:

```
serve -s build -l 4000
```
