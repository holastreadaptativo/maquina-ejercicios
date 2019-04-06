if(process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
} else {
    require('dotenv').config({ path: '.env.production' });
}
require('./mongo/mongodb');
const userRouter = require('./routers/user');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
    console.log('running on port ', port);
})

