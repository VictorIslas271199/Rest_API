const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors())

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use(require('./src/routes/productos'));
app.use(require('./src/routes/usuarios'));
app.use(require('./src/routes/prestamo'));
app.use(require('./src/routes/solicitud'));
// app.use(require('./src/routes/libros'));
// app.use(require('./src/routes/temas'));
// app.use(require('./src/routes/reportes'));
// app.use(require('./src/routes/logins'));



// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});