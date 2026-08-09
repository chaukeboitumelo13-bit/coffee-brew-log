const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());

// CREATE a brew
app.post('/api/brews', async (req, res) => {
  const { method, coffeeAmount, waterAmount, brewTime, notes } = req.body;

  if (!method || !coffeeAmount || !waterAmount || !brewTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const brew = await prisma.brew.create({
      data: { method, coffeeAmount, waterAmount, brewTime, notes },
    });
    res.status(201).json(brew);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all brews (with optional method filter)
app.get('/api/brews', async (req, res) => {
  const { method } = req.query;
  try {
    const brews = await prisma.brew.findMany({
      where: method ? { method } : {},
      orderBy: { createdAt: 'desc' },
    });
    res.status(200).json(brews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch brews' });
  }
});

// UPDATE a brew
app.put('/api/brews/:id', async (req, res) => {
  const { id } = req.params;
  const { method, coffeeAmount, waterAmount, brewTime, notes } = req.body;

  if (!method || !coffeeAmount || !waterAmount || !brewTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const brew = await prisma.brew.update({
      where: { id: Number(id) },
      data: { method, coffeeAmount, waterAmount, brewTime, notes },
    });
    res.status(200).json(brew);
  } catch (error) {
    res.status(404).json({ error: 'Brew not found' });
  }
});

// DELETE a brew
app.delete('/api/brews/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.brew.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});