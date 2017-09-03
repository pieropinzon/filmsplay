// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const film   = require('./server/controllers/filmController');
const genero = require('./server/controllers/generoController');
const enlace = require('./server/controllers/enlaceController');

const front = require('./server/controllers/frontController');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//declaracion de la ruta de archivos estaticos
app.use("/public", express.static(path.join(__dirname, 'public')));

// motor de vistas
app.set('views', path.join(__dirname, './server/views'));
app.set("view engine", "jade");

//rutas de las vistas del backend
app.use('/',front);

// rutas de la api del cliente
app.use('/api', film);
app.use('/api', genero);
app.use('/api', enlace);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));