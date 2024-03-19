const express = require('express');
const auth = require('./middleware/auth.js');
const app = express();
const cors = require('cors')
const port = 3333;

// Controller
const userController = require('./controller/userController');
const listController = require('./controller/listController');
const tasksController = require('./controller/tasksController');

app.use(cors());
app.use(express.json());

// Routes
app.post('/user/create', userController.create);
app.post('/user/login', userController.getOne);
app.get('/user/all', auth, userController.getAll);

app.post('/list/create', auth, listController.create);
app.get('/list/show/:user_id', auth, listController.getAll);
app.post('/list/status-update', auth, listController.statusUpdate);
app.post('/list/delete', auth, listController.delete);

app.post('/task/create', auth, tasksController.create);
app.get('/tasks/show/:user_id/:list_id', auth, tasksController.getAll);
app.post('/tasks/check-update', auth, tasksController.checkUpdate);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () =>
  console.log('REST API server ready at: http://localhost:' + port),
)