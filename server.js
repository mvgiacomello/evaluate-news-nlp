const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv')

// Helper for logging
const logger = (log, obj = undefined) => {
    if (process.env.NODE_ENV == 'development') {
        if (obj === undefined) {
            console.log(log)
        } else {
            console.log(log, obj)
        }
    }
}

// Verify keys
dotenv.config();
logger(`Your KEY is ${process.env.KEY}`)
logger(`Your ENDPOINT is ${process.env.ENDPOINT}`)

// Setup Express
const server = express();
const port = 8081;
server.use(cors());
server.use(bodyParser.json());
server.use('/', express.static('./dist/'));

// Route
server.post('/evaluate', (req, res) => {

    // Validation
    logger('Request received on [POST] /evaluate', req.body);
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
            logger(`Result from MeaningCloud: Agreement(${agreement}), Subjectivity(${subjectivity}), Irony(${irony}), Confidence(${confidence})`)
        })
        .catch(error => {
            logger(error)
            res.send({ error })
        });
})


// Start
server.listen(port, () => {
    logger(`Starting server on port ${port}`);
});