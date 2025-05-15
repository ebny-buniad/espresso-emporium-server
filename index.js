const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Espresso Emporium Server is Running');
})


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASS}@cluster0.dpqzrtb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        await client.connect();


        app.post('/coffees', (req, res) => {
            const coffeeData = req.body
            console.log('connect post API')
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally {

    }
}

run().catch(console.dir);
















app.listen(port, () => {
    console.log(`Your server is running port on ${port}`)
})