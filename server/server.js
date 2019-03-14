
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const employeeRequestRouter = require('./routes/employeeRequest.router');
const adminAddTimeRouter = require('./routes/adminAddTime.router');

const adminEmployeeRouter = require('./routes/adminEmployee.router');
const adminRequestRouter = require('./routes/adminRequest.router');
const employeeUserInfoRouter = require('./routes/employeeUserInfo.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/employee/request', employeeRequestRouter);
app.use('/api/admin/addtime', adminAddTimeRouter);
app.use('/api/admin/employees', adminEmployeeRouter);
app.use('/api/admin/request', adminRequestRouter);
app.use('/api/employee/userinfo', employeeUserInfoRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
