// server.js
// server.js
// const cors=require("cors");
// const corsOptions ={
//    origin:'*', 
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }

// app.use(cors(corsOptions)) // Use this after the variable declaration

// const express = require('express');
// const app = express();
// const path = require('path');
// const port = 3001; // Choose any port you prefer

// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'filter/chef')));

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express');
const app = express();
const cors = require('cors'); 
const path = require('path');
app.use(cors());
// Serve static files from the 'filters' directory
app.use(express.static(path.join(__dirname, 'filters')));

// Start the server
const port = 3001; // Choose any port you prefer
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
