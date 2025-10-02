import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();                       // carga .env
import sequelize from './db';
import Product from './models/Product';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: 'http://localhost:4200' })); // permite Angular local
app.use(express.json()); // parsea JSON en body

// RUTAS CRUD
// GET /api/products  -> lista todos los productos
app.get('/api/products', async (_req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

// GET /api/products/:id -> obtener uno
app.get('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'No encontrado' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Error' });
  }
});

// POST /api/products -> crear
app.post('/api/products', async (req: Request, res: Response) => {
  try {
    const { name, price, stock } = req.body;
    const newP = await Product.create({ name, price, stock });
    res.status(201).json(newP);
  } catch (err) {
    res.status(400).json({ message: 'Datos inválidos' });
  }
});

// PUT /api/products/:id -> actualizar
app.put('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'No encontrado' });
    await p.update(req.body);
    res.json(p);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar' });
  }
});

// DELETE /api/products/:id -> borrar
app.delete('/api/products/:id', async (req: Request, res: Response) => {
  try {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'No encontrado' });
    await p.destroy();
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al borrar' });
  }
});

// Arrancar servidor y sincronizar modelo con DB
(async () => {
  try {
    await sequelize.authenticate(); // prueba conexión
    await sequelize.sync();         // crea tabla si no existe
    app.listen(PORT, () => {
      console.log(`Server en http://localhost:${PORT}/api/products`);
    });
  } catch (err) {
    console.error('No se pudo iniciar el servidor', err);
  }
})();
