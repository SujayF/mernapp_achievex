const path  = require('path')
const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv')
const port = process.env.PORT || 5100;
const {MongoClient} = require('mongodb')
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');



dotenv.config()
const mode = process.env.NODE_ENV


connectDB();

const app = express();


app.use(
  cors({
    origin:"*",
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with specific domains
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


//frontend
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../frontend/build')))

  app.get('*',(req,res) => res.sendFile(
    path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
  )
  );
}else{
    app.get('/',(req,res) => res.send('Please Set to production'))
}

app.use(errorHandler)

app.listen(port,()=>
    console.log(`Server started on port ${port}`)
);
