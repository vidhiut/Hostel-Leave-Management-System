import app from './app.js';
import connectToDatabase from './config/dbconfig.js';


const startServer = async () => {
  try {
    await connectToDatabase();
    
    const port = process.env.PORT || 5000;
    const server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
    
    process.on('unhandledRejection', (err) => {
      console.error(err);
      console.log("hello")
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(error);
    console.log("hi")
    process.exit(1);
  }
};

process.on('uncaughtException', (err) => {
  console.error(err);
  process.exit(1);
});

startServer();
