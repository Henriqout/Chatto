// server.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexão com o MongoDB Atlas
mongoose.connect('mongodb+srv://luizhenriquedb876:Abc917382@chatto.w86g7mn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB Atlas'))
.catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err));

// Definindo o modelo de dados para as emoções
const EmotionSchema = new mongoose.Schema({
  emotion: String
});

const Emotion = mongoose.model('Emotion', EmotionSchema);

// Endpoint para salvar a emoção selecionada
app.post('/emotion', async (req, res) => {
  const { emotion } = req.body;
  try {
    const savedEmotion = await Emotion.create({ emotion });
    res.status(200).json(savedEmotion);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar a emoção' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
