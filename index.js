const express = require('express');
const morgan = require('morgan');
const app = express();

// Alternativas a Express -> hapi (Walmart) / Adonis / Sails.js / Koa.js / kraken.js (Paypal)
// ORM para evitar reescribir código, usado por ejemplo: si es que uno desea migrar a otra BD. Sequelize / Mongoose
/* Forma manual en vez de usar la dependencia morgan
function logger(req,res,next){
  console.log(`Route received ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
}
app.use(logger);
*/
//Settings
app.set('appName','RWD Tutorial');
app.set('port', 3000);
app.set('view engine', 'ejs'); // Motor de plantilla (ejs, pug, handlebars, etc..)
// Uso de middlewares (Procesar datos antes de llegar a una ruta) Ponerlos siempre antes de las rutas para que funcionen.
app.use(express.json()); 
app.use(morgan('dev')); //Logear peticiones 
//app.use(express.static('public'));
/*
app.all sirve para indicar que se va a presentar / ejecutar por default para cualquier petición HTTP
app.all('/user', (req,res,next) =>{ 
  console.log('Se accedió a la ruta /user');
  next(); // Para continuar con el flujo normal de todas las peticiones que se realicen.
});
*/
app.get('/',(req,res) =>{
  const data = [{name:'John'},{name:'César'},{name:'Mauricio'},{name:"Ray"}]; // Datos de simulación de una BD
  res.render('index.ejs',{people: data}); // .ejs para poder pintar elementos de manera dinámica
});

app.get('/user',(req,res) =>{
  res.json({
    username: "César",
    lastname: "Arellano"
  });
});

app.post('/user/:userId',(req,res) =>{
  console.log(req.params);
  console.log(req.body);
  res.send("POST REQUEST RECEIVED");
});

app.put('/user/:userId',(req,res) =>{
  res.send(`User: ${req.params.userId} updated`);
});

app.delete('/user/:userId',(req,res) =>{
  res.send(`User: ${req.params.userId} deleted`);
});

app.listen(app.get('port'), () => {
  console.log(app.get('appName'));
  console.log("Server on port",app.get('port'));
});
