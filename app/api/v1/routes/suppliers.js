
module.exports = app => {

    const suppliersController = require('../controller/products');
    var router = require('express').Router();

    /**
 * @swagger
 * /suppliers/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all suppliers
 *     tags: [Suppliers]
 *     description: Get all Suppliers
 *     responses:
 *       '200':
 *         description: OK
 */
    router.get('/all', suppliersController.findAll);

    /**
     * @swagger
     *   /suppliers/{id}:
     *     get:
     *       security:
     *         - bearerAuth: []
     *       summary: Returns a Supplier by id
     *       tags: [Suppliers]
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           description: id of item base unit to return
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
     *           description: The specified Supplier ID is invalid (not a number).
     *         '404':
     *           description: A Supplier with the specified ID was not found.
     *         default:
     *           description: Unexpected error
     */
    router.get('/:id', suppliersController.findOne);

    /**
     * @swagger
     * /suppliers/:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Add a Supplier
     *     tags: [Suppliers]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               suppliername:
     *                 type: string
     *               address:
     *                 type: string
     *               suppliercode:
     *                 type: string
     *               phonenumber:
     *                 type: string
     *               email:
     *                 type: string
     *               isactive:
     *                 type: string
     *     responses:
     *       '200':
     *         description: created
     *       '400':
     *         description: Unexpected error
     */
    router.post('/', suppliersController.create);

    /**
     * @swagger
     *   /suppliers/{id}:
     *     put:
     *       security:
     *         - bearerAuth: []
     *       summary: Updates a Supplier by id
     *       tags: [Suppliers]
     *       parameters:
     *         - in: path
     *           name: id
     *           required: true
     *           description: id of Supplier to update
     *           schema:
     *             type: integer
     *       requestBody:
     *         required: true
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 suppliername:
     *                   type: string
     *                 address:
     *                   type: string
     *                 suppliercode:
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
    router.put('/:id', suppliersController.update);


    app.use('/api/v1/suppliers', router);

};