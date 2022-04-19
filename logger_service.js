require('winston-daily-rotate-file');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp} = format;

let transport = new (transports.DailyRotateFile)({
    filename: 'logs/%DATE%-application.log',
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    zippedArchive: true,
    maxSize: '20m',
});
process.setMaxListeners(0);

/**
 * @param {string} level
 * @param {object} requestHeader
 * @param {string} functionName
 * @param {object} response
 * @param {object} error
 * return {object}
 */
function generateLog(level, requestHeader, functionName, response = null, error = null) {
    const loggerBody = {
        id: new Date().getTime(),
        level: level,
        url: requestHeader.url,
        functionName: functionName,
        metaInfo: {body: requestHeader.body, headers: requestHeader.headers, query: requestHeader.query},
        response: response,
        error: error
    }
    return loggerBody;
}

/**
 * @param {object} loggerBody
 * return {object}
 */

let Logger = createLogger({
    format: combine(format.json(), timestamp()),
    level: 'info',
    transports: [
        transport
    ],
    exitOnError: false
});

if (process.env.NODE_ENV !== 'production') {
    Logger.add(new transports.Console({
        format: format.json()
    }));
}

module.exports = {generateLog, Logger};