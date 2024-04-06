const pino = require('pino');
const fs = require('fs');
const path = require('path');

class CustomLogger {
  constructor(level = 'info') {
    this.logger = pino({
      level: level
    });
  }

  log(level, message) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const logDir = `./logs/${year}/${month}/${day}`;
    const logFilePath = path.join(logDir, `${level}.log`);

    fs.mkdirSync(logDir, { recursive: true });

    this.logger[level](message);

    fs.writeFileSync(logFilePath, `[${currentDate.toISOString()}] ${message}\n`, { flag: 'a' });
  }

  info(message) {
    this.log('info', message);
  }

  error(message) {
    this.log('error', message);
  }

  debug(message) {
    this.log('debug', message);
  }
}

const runtimeLog = new CustomLogger();
module.exports = runtimeLog;