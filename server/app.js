const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

const users = require('./routes/api/users');

app.use('/api/users', users);

// app.get('/', (req, res) => {
//   res.send = 'hi';
// });

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));
