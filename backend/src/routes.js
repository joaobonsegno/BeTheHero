const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// SESSION
routes.post('/session', SessionController.create);

// ONG
routes.get('/ongs', OngController.list);
routes.post('/ongs', OngController.create);
routes.delete('/ongs/:id', OngController.delete);

// INCIDENT
routes.get('/incidents', IncidentController.list);
routes.get('/incidents/listByOngId', IncidentController.listByOng);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete)


module.exports = routes;