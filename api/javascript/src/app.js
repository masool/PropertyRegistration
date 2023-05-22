const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid');
var network = require('./fabric/network.js');
var registeruser_org1 = require('./registerUser_org1.js')
var registeruser_org2 = require('./registerUser_org2.js')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


const { promisify } = require('util')
const sleep = promisify(setTimeout)

/****************** Register USer for org1 and org2 to Blockchain ******************************************/  
app.post('/api/registerUser_org1', (req, res) => { 
  const registerUser_org1 = req.body.registerUser_org1
  registeruser_org1.RegisterUser_org1(registerUser_org1)
      .then((response) => {
        res.send(response)
      });
    })  
app.post('/api/registerUser_org2', (req, res) => { 
  const registerUser_org2 = req.body.registerUser_org2
  registeruser_org2.RegisterUser_org2(registerUser_org2)
      .then((response) => {
        res.send(response)
      });
    })  
/****************** BLOCKCHAIN END POINTS START HERE ******************************************/  
app.post('/api/Invoke_from_org1', (req, res) => { 

  const registeruser = req.body.registerUser_org1
  const chaincodename = req.body.chaincodename
  const chaincodeFunctionName = req.body.fcn
      network.Org1(registeruser,chaincodename,"INVOKE",[chaincodeFunctionName,req.body.tokenId,
      req.body.tokenURI, req.body.nameKey])
      .then((response) => {
        res.send(response)
      });
    }) 

app.post('/api/Invoke_from_org2', (req, res) => { 

  const registeruser = req.body.registerUser_org2
  const chaincodename = req.body.chaincodename
  const chaincodeFunctionName = req.body.fcn
      network.Org2(registeruser,chaincodename,"INVOKE",[chaincodeFunctionName,req.body.tokenId,
      req.body.tokenURI, req.body.nameKey])
      .then((response) => {
        res.send(response)
      });
    }) 

app.get('//api/Query_from_org1', (req, res) => { 

  const registeruser = req.body.registerUser_org1
  const chaincodename = req.body.chaincodename
  const chaincodeFunctionName = req.body.fcn
      network.Org1(registeruser,chaincodename,"QUERY",[chaincodeFunctionName, req.body.nameKey])
      .then((response) => {
        res.send(response)
      });
    })

app.get('/api/Query_from_org2', (req, res) => { 

  const registeruser = req.body.registerUser_org2
  const chaincodename = req.body.chaincodename
  const chaincodeFunctionName = req.body.fcn
      network.Org2(registeruser,chaincodename,"QUERY",[chaincodeFunctionName, req.body.nameKey])
      .then((response) => {
        res.send(response)
      });
    })
    
app.listen(process.env.PORT || 8081)
