const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const apiRoutes = require('./routes/index');
const db = require('./models/index');

const app = express();

// const userService = require('./services/user-service');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter : true});
        }
    });



    // const service = new userService();

    // const token = service.createToken({email :'mon@gam.cm' , id:'2'});
    // console.log(token);

    // const ver = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IT-KEHfUephA';
    // const res = service.verifyToken(ver);
    // console.log(res);
}

prepareAndStartServer();