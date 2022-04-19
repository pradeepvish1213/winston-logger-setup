const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {Logger, generateLog: LogData} = require('./logger_service');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/info-log', async (req, res) => {
    let message = 'This is sample value of message we store in log file.';
    Logger.error(LogData('info', req, 'info-log', message));
    Logger.warn('Trace, log4js!');
    Logger.info('Debug, log4js!');
    Logger.http('http, log4js!');
    Logger.verbose('http, log4js!');
    Logger.debug('Hello, log4js!');
    Logger.silly('Heads up, log4js!');

    return res.json({
        logging: "Info",
        data: {
            message,
            level: 'info',
            functionName: 'info-log'
        }
    });
});

app.get('/silly-log', async (req, res) => {
    let message = 'This is sample value of message we store in log file.';
    Logger.silly(LogData('silly', req, 'silly-log', message));
    return res.json({
        logging: "silly",
        data: {
            message,
            level: 'silly',
            functionName: 'info-log'
        }
    });
});

app.get('/warn-log', async (req, res) => {
    let message = 'This is sample value of message we store in log file. with additional value.';
    Logger.warn(LogData('warn', req, 'debug-log', message));
    return res.json({
        logging: "warn",
        data: {
            message,
            level: 'warn',
            functionName: 'warn-log',
            req: {header: req.headers, body: req.body, query: req.query},
        }
    });
});

app.get('/error-log', async (req, res) => {
    let error = 'Found some error in line no 10 file name';
    let message = 'This is sample value of message we store in log file. with additional value error also.';
    Logger.error(LogData('error', req, 'fetched values error', message, error));
    // LoggerService.error(req, 'fetched values error', message, error);
    return res.json({
        logging: "Error",
        data: {
            message,
            level: 'error',
            functionName: 'error-log',
            req: {header: req.headers, body: req.body, query: req.query},
            error,
        }
    });
});

app.listen(4001, () => {
    console.info('=========Server started at port :', 4001)
})