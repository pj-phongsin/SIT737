const express= require("express");
const app= express();
const fs = require('fs');
const path = require("path");
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    message: 'New ${operation} operation requested: ${num1} ${operation} ${num2}',
    format: winston.format.json(),
    defaultMeta: { service: 'calculator-microservice' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

app.get("/", (req,res)=>{
  res.sendFile(path.join(__dirname, "index.html"));
})

  const add= (num1,num2) => {
    return num1+num2;
}
app.get("/add", (req,res)=>{
    try{
    const num1= parseFloat(req.query.num1);
    const num2=parseFloat(req.query.num2);
    if(isNaN(num1)) {
        logger.error("num1 is incorrectly defined");
        throw new Error("num1 incorrectly defined");
    }
    if(isNaN(num2)) {
        logger.error("num2 is incorrectly defined");
        throw new Error("num2 incorrectly defined");
    }
    
    if (num1 === NaN || num2 === NaN) {
        console.log()
        throw new Error("Parsing Error");
    }
    logger.info('Parameters '+num1+' and '+num2+' received for addition');
    const result = add(num1,num2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

const sub= (num1,num2) => {
  return num1-num2;
}
app.get("/sub", (req,res)=>{
  try{
  const num1= parseFloat(req.query.num1);
  const num2=parseFloat(req.query.num2);
  if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
  if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
  }
  
  if (num1 === NaN || num2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+num1+' and '+num2+' received for subtraction');
  const result = sub(num1,num2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const mul= (num1,num2) => {
  return num1*num2;
}
app.get("/mul", (req,res)=>{
  try{
  const num1= parseFloat(req.query.num1);
  const num2=parseFloat(req.query.num2);
  if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
  if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
  }
  
  if (num1 === NaN || num2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+num1+' and '+num2+' received for multiplication');
  const result = mul(num1,num2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const div= (num1,num2) => {
  return num1/num2;
}
app.get("/div", (req,res)=>{
  try{
  const num1= parseFloat(req.query.num1);
  const num2=parseFloat(req.query.num2);
  if(isNaN(num1)) {
      logger.error("num1 is incorrectly defined");
      throw new Error("num1 incorrectly defined");
  }
  if(isNaN(num2)) {
      logger.error("num2 is incorrectly defined");
      throw new Error("num2 incorrectly defined");
  }
  
  if (num1 === NaN || num2 === NaN) {
      console.log()
      throw new Error("Parsing Error");
  }
  logger.info('Parameters '+num1+' and '+num2+' received for devision');
  const result = div(num1,num2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

const port=3040;
app.listen(port,()=> {
    console.log("hello i'm listening to port " +port);
})