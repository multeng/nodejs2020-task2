const { createLogger, transports, format } = require('winston');
const { DIR } = require('./config');

const logger = createLogger({
  format: format.combine(format.splat(), format.simple()),
  transports: [
    new transports.File({ filename: `${DIR}/error.log`, level: 'error' }),
    new transports.File({ filename: `${DIR}/info.log`, level: 'info' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${DIR}/exceptions.log` })
  ],
  rejectionHandlers: [
    new transports.File({ filename: `${DIR}/exceptions.log` })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.cli(),
      handleExceptions: true
    })
  );
}

logger.stream = {
  write: message => logger.info(message)
};

module.exports = logger;
