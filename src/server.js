const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send();
});

app.listen(7000, () => console.log('Listening to port 7000...'));