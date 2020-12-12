
module.exports= app =>{

const currencies = require('../controller/currencies');
var router = require('express').Router();

/**
 * @swagger
 * /currencies/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all Currencies
 *    tags: [Currencies]
 *    description: Get all Currencies
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No Record found
 *      '400':
 *        description: Unexpected error
 */
router.get('/all',currencies.findAll);

/**
 * @swagger
 *   /currencies/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns Currency by id
 *       tags: [Currencies]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: id of Currency to return
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
 *           description: The specified Currency ID is invalid (not a number).
 *         '404':
 *           description: A Currency with the specified ID was not found.
 *         default:
 *           description: Unexpected error
 */
router.get('/:id',currencies.findOne);

/**
 * @swagger
 * /currencies/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add New Currency
 *     tags: [Currencies]
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
 *               isactive:
 *                 type: string
 *               default:
 *                 type: string
 *     responses:
 *       '200':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
router.post('/',currencies.create);

/**
 * @swagger
 * /currencies/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update Currency
 *     tags: [Currencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of Currency to update
 *         schema:
 *           type: integer
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
 *               isactive:
 *                 type: string
 *               default:
 *                 type: string
 *     responses:
 *       '200':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
    router.put('/:id',currencies.update);

app.use('/api/v1/currencies', router);

};