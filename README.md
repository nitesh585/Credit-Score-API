# Credit-Score-API

Developed a backend application using NodeJS, Express, and MongoDB.

## Functionality :
Register API: (User Input: Name, username, password), account
number to be created by
+ Backend: Random 8 digit unique throughout
+ Output: Account number, username, and name

Login API using username password: JWT Token
+ If account details exist, then print account details Else msg to upload CSV

Upload csv() bank statement [date, withdraw, deposit, balance] - 
+ To store the CSV data to DB with respect to users as its current account details) only 100 records (first 100)
+ Return with the credit limit and rate of interest
+ Credit limit calculation should work based on average monthly balance and the credit limit should be 20% + avg monthly balance
+ Total deposits - credits each month = monthly balance
+ Avg monthly Balance = all months monthly balance /12
+ Credit limit = Avg monthly balance * 1.2 (i.e 20% + credit
limit)


-----------------------------
### Installation of NodeJS and NPM
+ Open terminal/Command prompt
+ Run ``sudo apt update``
+ Run  ``sudo apt install nodejs``
+ Run  ``sudo apt install npm``

### Starting the application
+ Run ``npm install`` in the project directory. 
+ Run ``npm start`` to start the server

---------------------------
+ I have used <b>Postman</b> for interacting with my API and highly recommend to install Postman.
