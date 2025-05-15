const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Espresso Emporium Server is Running');
})






app.listen(port, () => {
    console.log(`Your server is running port on ${port}`)
})