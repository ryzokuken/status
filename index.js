const express = require('express');
var cors = require('cors');
const netstat = require('node-netstat');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const payload = {};
  netstat(
    {
      sync: true
    },
    data => (payload[data.local.port + data.remote.port] = data)
  );
  res.json(payload);
});

app.listen(8000, () => console.log('Status app listening on port 8000!'));
