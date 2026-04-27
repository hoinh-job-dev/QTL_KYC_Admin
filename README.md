# Quanta Token Lottery Know Your Customer Admin

## Features
**Admin Server** provides an Admin UI in which administrator can manage KYC Database System. Some basic functions:
- Create account (Operator, Client, User)
- Login/Logout
- Verify KYC


## Tech
- Nodejs
- Angular
- Javascript
- Typescript
- Mongodb 
- Passport



## API

 - backend
GET /admin/allhistory
GET /admin/myhistory
GET /admin/adminlist
GET /user/userlist'
GET /user/verifylist
GET /lottery/history
GET /lottery/prizes
GET /logout

POST /login
POST /admin/changepassword
POST /admin/addadmin
POST /admin/deleteadmin
POST /user/adduser
POST /user/verifyuser
POST /user/modifyuser/KYC
POST /user/deactiveuser
POST /user/activeuser
POST /user/userinfo
POST /lottery/payprizes

 - frontend
GET	/dashboard
GET /adminhistory
GET /myhistory
GET /adminlist
GET /userlist
GET /lotteryhistory

POST /changepassword
POST /addadmin
POST /adduser
POST /verifyuser
POST /verifyuser/:email
POST /edituser/:email


