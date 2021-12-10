import './setup';
import app from './app';

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}!`);
  console.log(`Application running in ${process.env.NODE_ENV} mode`);
});