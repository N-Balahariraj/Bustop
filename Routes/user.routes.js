const userController = require('../Controllers/user.controller.js')
const verifyToken = require('../Middlewares/verifyJWT.js')

module.exports = (app) => {
    app.post('/api/Register',userController.Register)
    app.post('/api/Login',userController.Login)
    app.put('/api/BookBus',verifyToken.verifyAccessToken,userController.BookBus)
    app.put('/api/CancelBus',verifyToken.verifyAccessToken,userController.CancelBus)
    app.delete('/api/DeleteAcc',verifyToken.verifyAccessToken,userController.DeleteAcc)
    app.get('/api/Logout',userController.Logout)
    app.get('/api/refreshToken',verifyToken.verifyRefreshToken,userController.refreshToken)
}