
module.exports = app => {

    const tranStageController = require('../controller/transaction_stages');
    var router = require('express').Router();

    /**
 * @swagger
 * /transactions/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all Transactions
 *     tags: [Transactions Stages]
 *     description: Get all modules
 *     responses:
 *       '200':
 *         description: OK
 */
    router.get('/all', tranStageController.findAll);

    /**
     * @swagger
     *   /modules/{id}:
     *     get:
     *       security:
     *         - bearerAuth: []
     *       summary: Returns a Transaction by id
     *       tags: [Transactions Stages]
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           description: id of transaction to return
     *           schema:
     *             type: integer
     *       responses:
     *         '200':
     *           description: OK
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *         '400':
     *           description: The specified Transaction ID is invalid (not a number).
     *         '404':
     *           description: A Transaction stage with the Transaction ID was not found.
     *         default:
     *           description: Unexpected error
     */
    router.get('/:id', tranStageController.findOne);

    /**
     * @swagger
     * /transaction-stages/:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Add a Transaction stage
     *     tags: [Transactions Stages ]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               description:
     *                 type: string
     *               code:
     *                 type: string
     *               url:
     *                 type: string
     *               iconid:
     *                 type: integer
     *               moduletransid:
     *                 type: integer
     *               isactive:
     *                 type: string
     *     responses:
     *       '200':
     *         description: created
     *       '400':
     *         description: Unexpected error
     */
    router.post('/', tranStageController.create);

    /**
     * @swagger
     *   /transaction-stages/{id}:
     *     put:
     *       security:
     *         - bearerAuth: []
     *       summary: Updates a Transaction stage by id
     *       tags: [Transactions Stages]
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           description: id of Transaction stage to update
     *           schema:
     *             type: integer
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 Transaction stagename:
     *                   type: string
     *                 address:
     *                   type: string
     *                 Transaction stagecode:
     *                   type: string
     *                 phonenumber:
     *                   type: string
     *                 email:
     *                   type: string
     *                 isactive:
     *                   type: string
     *       responses:
     *         '200':
     *           description: updated
     */
    router.put('/:id', tranStageController.update);


    app.use('/api/v1/transaction-stages', router);

};