const express = require("express");
const mongoose = require("mongoose");
const user = require('./model/user');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const fs = require('fs');
const csv = require('csv-parser');

require('dotenv/config');

const app = express();  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  
app.use(fileUpload());

// Home page
app.get('/', (req, res) => {
    res.send("Home Page");
});


//Register route - input: name, username, password
app.post('/register', async function (req, res) {
    console.log(req.body);
    const new_user = new user({
        name: req.body.name,
        username: req.body.username,
        accountNo: Math.random().toString().slice(2, 10)
    });

    new_user.password = new_user.generateHash(req.body.password);
    await new_user.save();

    res.send({
        "Account Number": new_user.accountNo,
        "UserName": new_user.username,
        "Name": new_user.name
    });

    alert("Registered");
});


// Loging route - input: username, password
app.post('/login', function (req, res) {
    user.findOne({ username: req.body.username }, function (err, user) {

        if (!user.validPassword(req.body.password)) {
            //    res.send("Password not matched!");
            res.send("Please Upload the csv file");
        } else {
            res.send(user);
        }

    });
});


// Upload route: user to upload the csv files with the bank transactions details
app.post("/upload", (req, res)=>{

    const results = [];
    var uploadDir = "/home/nitesh/Downloads/"

    fs.createReadStream( uploadDir + req.files.Bank.name)
        .pipe(csv({}))
        .on('data', (data)=> results.push(data))
        .on('end', ()=>{
            results.slice(0,100);

            var date = results[0]['Date'];
            var month = date[1]=='/' ? date[0] : date.slice(0,2);
            
            var prevMonth = month;

            var balance = 0;
            var totalBalance = +results[0]['Closing Balance'];

            for(var i=0; i<results.length; ){
                date = results[i]['Date'];
                month = date[1]=='/' ? date[0] : date.slice(0,2);

                if(month==prevMonth){
                    if(results[i]['Withdraw']==''){
                        var deposit = parseInt( results[i]['Deposit'], 10);
                        balance = balance + deposit ;
                    }else{
                        var Withdraw = parseInt(results[i]['Withdraw'],10); 
                        balance = balance -  Withdraw ;
                    }
                    i++;
                }else{
                    prevMonth = month;
                    totalBalance +=  isNaN(balance) ? 0: balance;
                    balance = 0;
                }

            }

            console.log(results);

            var avgBalance = totalBalance/12;
            var creditlimit = avgBalance*(1.2); 
            res.send( {"Average Balance" : avgBalance,
                        "Credit Limit" : creditlimit} );
        });
});

// Connect the application with the mongoDb Atlas
mongoose.connect(
    "mongodb+srv://Niteshyadav:2020ABCD@upidata.jkqva.mongodb.net/upiData?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true },
    (req, res) => {
        console.log('connected');
    });

// Starting point of the server and port number is 3000
app.listen(3000, () => {
    console.log("listning to 3000");
});