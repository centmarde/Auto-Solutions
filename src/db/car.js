import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Mock data
const makes = ['Toyota', 'Honda', 'Ford'];
const models = {
  Toyota: ['Corolla', 'Camry', 'Highlander'],
  Honda: ['Civic', 'Accord', 'CR-V'],
  Ford: ['Focus', 'Fusion', 'Mustang']
};
const years = {
  Corolla: [2020, 2021, 2022],
  Camry: [2020, 2021, 2022],
  Highlander: [2020, 2021, 2022],
  Civic: [2020, 2021, 2022],
  Accord: [2020, 2021, 2022],
  Focus: [2020, 2021, 2022],
  Fusion: [2020, 2021, 2022],
  Mustang: [2020, 2021, 2022]
};

app.get('/api/makes', (req, res) => {
  res.json(makes);
});

app.get('/api/models/:make', (req, res) => {
  const make = req.params.make;
  res.json(models[make] || []);
});

app.get('/api/years/:model', (req, res) => {
  const model = req.params.model;
  res.json(years[model] || []);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
