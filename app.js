const express = require('express');

const app = express();



const PORT = 5000 || process.env.PORT;

app.listen(PORT,()=> console.log(`App started on port ${PORT}`));