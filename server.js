const express = require('express');
const logger = require('morgan');

require('dotenv').config();
require('./config/database');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(require('./middleware/auth').authenticate);
app.use('/api/v1/users', require('./routes/users'));
// app.use('/api/v1/groups', require('./routes/groups'));
// app.use('/api/v1/notifications', require('./routes/notifications'));
// app.use('/api/v1/transactions', require('./routes/transactions'));

app.set('port', process.env.port || 3001);
app.listen(app.get('port'), () => {
  console.log(`express listening from port ${app.get('port')}`);
});
