const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());


app.use(express.static('client'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended : false }));


// read
app.get('/getString', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post('/changeDB', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.changeDBConnection();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})




app.listen(process.env.PORT, () => console.log('app is running'));
