const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let direccion = 'mongodb://host.docker.internal:27017/GestionUG';

mongoose.connect(direccion)
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error('Error de conexión a la base de datos:', err));

const usuariosSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
});

const gruposSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  usuarios: [
    {id_usuario: Number}
  ],
});


const Usuario = mongoose.model("Usuario", usuariosSchema, "usuarios");
const Grupo = mongoose.model("Grupo", gruposSchema, "grupos");


app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
  const nueva = new Usuario(req.body);
  await nueva.save();
  res.json(nueva);
});

app.put('/usuarios/:id', async (req, res) => {
  const actualizada = await Comida.findOneAndUpdate({ id: Number(req.params.id) }, req.body, { new: true });
  res.json(actualizada);
});

app.delete('/usuarios/:id', async (req, res) => {
  await Usuario.findOneAndDelete({ id: Number(req.params.id) });
});



app.get('/grupos', async (req, res) => {
  const grupos = await Grupo.find();
  res.json(grupos);
});

app.post('/grupos', async (req, res) => {
  const nueva = new Grupo(req.body);
  await nueva.save();
  res.json(nueva);
});

app.put('/grupos/:id', async (req, res) => {
  const actualizada = await Grupo.findOneAndUpdate({ id: Number(req.params.id) }, req.body, { new: true });
  res.json(actualizada);
});

app.delete('/grupos/:id', async (req, res) => {
  await Grupo.findOneAndDelete({ id: Number(req.params.id) });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`));