const express = require('express');
const app = express();
const port = process.env.PORT || 7000;

app.listen(port, () => console.log('Listening to port 7000...'));
app.use(express.static('public'))