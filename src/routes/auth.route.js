const router = require('express').Router();
const { AuthController } = require('../controllers/auth.controller');
const { hasValidToken } = require('../middlewares/check.middleware');
const { asyncHandler } = require('../utils/asyncHandler')

router.post('/register',asyncHandler(AuthController.register))
router.post('/login',asyncHandler(AuthController.login))
router.get('/me',hasValidToken,asyncHandler(AuthController.me))
router.get('/refresh', asyncHandler(AuthController.refreshToken))

exports.authRoutes = router;