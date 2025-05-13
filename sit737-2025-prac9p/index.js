const express = require("express");
const app = express();
const fs = require('fs');
const path = require("path");
const winston = require('winston');

const mongoose = require('mongoose');
mongoose.set('bufferCommands', true);


async function connectWithRetry() {
    const mongoURI = "mongodb://mongo-0.mongo-headless.default.svc.cluster.local:27017/sit737db?directConnection=true";
    // Debug log for checking MONGO_URI
    console.log("🔥 Starting MongoDB connection with URI:", mongoURI);
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB");

        const calculatorSchema = new mongoose.Schema({
            type: String,
            num1: Number,
            num2: Number,
            result: Number,
            timestamp: { type: Date, default: Date.now }
        }, { bufferCommands: true });

        const Calculator = mongoose.model('Calculator', calculatorSchema);

        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'calculator-microservice' },
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' }),
            ],
        });

        if (process.env.NODE_ENV !== 'production') {
            logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }

        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, "index.html"));
        });

        const add = (num1, num2) => {
            return num1 + num2;
        };

        app.get("/add", async (req, res) => {
            console.log("🧪 /add route called with:", req.query);
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for addition`);
                const result = add(num1, num2);

                await Calculator.create({type: 'addition', num1, num2, result});

                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const sub = (num1, num2) => {
            return num1 - num2;
        };

        app.get("/sub", async (req, res) => {
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for subtraction`);
                const result = sub(num1, num2);

                await Calculator.create({type: 'subtraction', num1, num2, result});

                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const mul = (num1, num2) => {
            return num1 * num2;
        };

        app.get("/mul", async (req, res) => {
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for multiplication`);
                const result = mul(num1, num2);

                await Calculator.create({type: 'multiplication', num1, num2, result});

                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const div = (num1, num2) => {
            if (num2 === 0) {
                throw new Error("Division by zero");
            }
            return num1 / num2;
        };

        app.get("/div", async (req, res) => {
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for division`);
                const result = div(num1, num2);

                await Calculator.create({type: 'division', num1, num2, result});

                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const exp = (num1, num2) => {
            return Math.pow(num1, num2);
        };

        app.get("/exp", (req, res) => {
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for exponentiation`);
                const result = exp(num1, num2);
                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const sqrt = (num) => {
            if (num < 0) {
                throw new Error("Cannot calculate square root of a negative number");
            }
            return Math.sqrt(num);
        };

        app.get("/sqrt", (req, res) => {
            try {
                const num = parseFloat(req.query.num);
                if (isNaN(num)) {
                    logger.error("num is incorrectly defined");
                    throw new Error("num incorrectly defined");
                }

                logger.info(`Parameter ${num} received for square root`);
                const result = sqrt(num);
                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        const modulo = (num1, num2) => {
            if (num2 === 0) {
                throw new Error("Modulo by zero");
            }
            return num1 % num2;
        };

        app.get("/modulo", (req, res) => {
            try {
                const num1 = parseFloat(req.query.num1);
                const num2 = parseFloat(req.query.num2);
                if (isNaN(num1)) {
                    logger.error("num1 is incorrectly defined");
                    throw new Error("num1 incorrectly defined");
                }
                if (isNaN(num2)) {
                    logger.error("num2 is incorrectly defined");
                    throw new Error("num2 incorrectly defined");
                }

                logger.info(`Parameters ${num1} and ${num2} received for modulo`);
                const result = modulo(num1, num2);
                res.status(200).json({ statuscocde: 200, data: result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ statuscocde: 500, msg: error.toString() });
            }
        });

        app.get("/history", async (req, res) => {
            console.log("📜 /history route called");
            try {
                const records = await Calculator.find().sort({ timestamp: -1 });
                res.status(200).json(records);
            } catch (error) {
                res.status(500).json({ msg: error.toString() });
            }
        });

        const port = 3040;
        app.listen(port, () => {
            console.log("🚀 Server is listening on port " + port);
        });
    } catch (err) {
        console.error("❌ MongoDB connection failed, retrying in 5 seconds...", err.message);
        setTimeout(connectWithRetry, 5000);
    }
}

connectWithRetry();
