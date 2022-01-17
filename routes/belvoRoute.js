const express = require('express')
const router = express.Router()
const belvoController = require('../controllers/belvoController')

router.get('/token/:environment', belvoController.belvoToken)
router.post('/accounts', belvoController.getAccounts)
router.post('/transactions', belvoController.getTransactions)
router.post('/balances', belvoController.getBalances)
router.post('/owners', belvoController.getOwners)
router.post('/delete', belvoController.deleteLink)
router.get('/update-link/:environmen/:updateLink', belvoController.updateLink)

module.exports = router