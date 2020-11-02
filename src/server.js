const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');
const logger = require('./common/logger');
const userService = require('./resources/users/user.service');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const admin = { name: 'admin', login: 'admin', password: 'admin' };
const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    db.dropDatabase();
    userService.create(admin);
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  }
);
