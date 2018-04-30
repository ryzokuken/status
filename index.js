const express = require('express');
var cors = require('cors');
const netstat = require('node-netstat');

const app = express();
app.use(cors());

const payload = {};

netstat(
  {
    watch: true
  },
  data => {
    payload[data.protocol + data.local.port] = data;
  }
);

app.get('/payload', (req, res) => {
  res.json(payload);
});

app.listen(8000, () => console.log('Status app listening on port 8000!'));
