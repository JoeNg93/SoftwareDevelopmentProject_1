const path = require('path');
const express = require('express');

const app = express();

app.set('port', 8765);

app.use(express.static(path.resolve(__dirname, '..', '..', 'front_end', 'assets')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'front_end', 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'));
});

