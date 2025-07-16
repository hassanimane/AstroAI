const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const OPENAI_API_KEY = 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxx'; // استبدله بمفتاحك الحقيقي

app.use(cors());
app.use(bodyParser.json());

app.post('/get-fortune', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error from OpenAI:", error);
    res.json({ error: "خطأ في الاتصال بـ OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
