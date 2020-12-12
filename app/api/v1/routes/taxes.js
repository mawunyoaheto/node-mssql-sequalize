
module.exports= app =>{

    const taxes = require('../controller/taxes');
    var router = require('express').Router();
    
/**
 * @swagger
 * /taxes/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all Tax
 *    tags: [Tax]
 *    description: Get all Tax
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No Record found
 *      '400':
 *        description: Unexpected error
 */
    router.get('/',taxes.findAll);

/**
 * @swagger
 *   /taxes/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns Tax by id
 *       tags: [Tax]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: id of Tax to return
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
 *           description: The specified Tax ID is invalid (not a number).
 *         '404':
 *           description: A Tax with the specified ID was not found.
 *         default:
 *           description: Unexpected error
 */
    router.get('/:id',taxes.findOne);

/**
 * @swagger
 *
 * /taxes/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add New Tax
 *     tags: [Tax]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               percentage:
 *                 type: float
 *               isactive:
 *                 type: string
 *     responses:
 *       '200':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
    router.post('/',taxes.create);

/**
 * @swagger
 *
 * /taxes/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update Tax
 *     tags: [Tax]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of Tax to update
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
 *               percentage:
 *                 type: float
 *               isactive:
 *                 type: string
 *     responses:
 *       '200':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
    router.put('/:id',taxes.update);
    
    app.use('/api/v1/taxes', router);
    
    };