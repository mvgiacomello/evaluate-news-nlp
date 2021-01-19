const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv')

// Verify keys
dotenv.config();
console.log(`Your KEY is ${process.env.KEY}`)
console.log(`Your ENDPOINT is ${process.env.ENDPOINT}`)

// Setup express
const server = express();
const port = 8081;
server.use(cors());
server.use(bodyParser.json());

// Routes
server.post('/evaluate', (req, res) => {

    // Validation
    console.log('Request received on [POST] /evaluate', req.body);
    if (req.body.postURL === undefined) {
        res.send({ 'error': 'missing postURL value on request' })
    }

    // Call external API
    const response = fetch(`${process.env.ENDPOINT}?key=${process.env.KEY}&url=${encodeURI(req.body.postURL)}&lang=en&verbose=n&of=json`, { method: 'POST' })
        .then(xRes => xRes.json())
        .then(json => {
            const agreement = json.agreement
            const subjectivity = json.subjectivity
            const irony = json.irony
            const confidence = json.confidence
            res.send({
                agreement,
                subjectivity,
                irony,
                confidence
            })
        })
        .catch(error => {
            console.log(error)
            res.send({ error })
        });
})


// Start
server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});