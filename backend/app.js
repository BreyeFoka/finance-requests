const express = require('express');
const cors = require('cors')
const bodyparser = require('body-parser')
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const manRoutes = require('./routes/managerRoutes');
const exportRoutes = require('./routes/exportRoutes');
const authMiddleware = require('./middleware/authMiddleware');
dotenv.config();

const app = express();

// app.use(express.json());
app.use(bodyparser.json())
app.use(cors())
app.use('/api/export', exportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', authMiddleware, manRoutes);
app.use('/api/requests', authMiddleware, requestRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.log('Error connecting to the database', error);
});
