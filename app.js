// Configuraxion generañ
const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/incidencias", incidenciasRoutes);

app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});