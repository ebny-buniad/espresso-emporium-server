const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const database = client.db("coffees_data");
        const coffeesCollection = database.collection("coffees");

        // Insert Data to DB
        app.post('/coffees', async (req, res) => {
            const coffeeData = req.body;
            const result = await coffeesCollection.insertOne(coffeeData);
            res.send(result);
        })

        // Get inserted all data, now you can show this data your UI
        app.get('/coffees', async (req, res) => {
            const cursor = coffeesCollection.find({});
            const allCoffeesData = await cursor.toArray()
            res.send(allCoffeesData)
        })


        // For find One Specific item - 

        app.get('/coffees/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await coffeesCollection.findOne(query)
            res.send(result)
        })

        // Update Details API

        app.put('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const updateData = req.body;
            console.log(updateData)
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const update = {
                $set: updateData
            }
            const result = await coffeesCollection.updateOne(query, update, options);
            res.send(result);
        })


        // Delete Data API

        app.delete('/coffees/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await coffeesCollection.deleteOne(query);
            res.send(result)
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