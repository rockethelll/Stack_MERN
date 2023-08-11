import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import indexRouter from './routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
  });
  app.use('/', indexRouter);
})
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });


