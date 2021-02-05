require('winston-daily-rotate-file');
const {createLogger, format, transports} = require('winston');
const {combine, timestamp} = format;

let transport = new (transports.DailyRotateFile)({
    filename: 'logs/%DATE%-application.log',
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    zippedArchive: true,
});

function LoggerService(level, requestHeader, functionName, response = '', error = '') {
    process.setMaxListeners(0);
    const loggerBody = {
        id: new Date().getTime(),
        level: level,
        url: requestHeader.url,
        functionName: functionName,
        metaInfo: {body: requestHeader.body, headers: requestHeader.headers, query: requestHeader.query},
        response: response,
        error: error
    }

    let logger = createLogger({
        format: combine(format.json(), timestamp()),
        transports: [
            transport
        ],
        exitOnError: false
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.json()
        }));
    }
    logger.log(level, loggerBody);
}

module.exports = LoggerService;