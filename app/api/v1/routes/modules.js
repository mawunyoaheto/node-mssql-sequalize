
module.exports = app => {

    const modulesController = require('../controller/modules');
    var router = require('express').Router();

    /**
 * @swagger
 * /modules/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all modules
 *     tags: [modules]
 *     description: Get all modules
 *     responses:
 *       '200':
 *         description: OK
 */
    router.get('/all', modulesController.findAll);

    /**
     * @swagger
     *   /modules/{id}:
     *     get:
     *       security:
     *         - bearerAuth: []
     *       summary: Returns a Supplier by id
     *       tags: [modules]
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
    router.get('/:id', modulesController.findOne);

    /**
     * @swagger
     * /modules/:
     *   post:
     *     security:
     *       - bearerAuth: []
     *     summary: Add a Supplier
     *     tags: [modules]
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
     *               directory:
     *                 type: string
     *               baseassemblyname:
     *                 type: string
     *               versionnumber:
     *                 type: string
     *               versionname:
     *                 type: string
     *               apptypeid:
     *                 type: integer
     *               url:
     *                 type: string
     *               iconid:
     *                 type: integer
     *               moduletypeid:
     *                 type: integer
     *               isactive:
     *                 type: string
     *     responses:
     *       '200':
     *         description: created
     *       '400':
     *         description: Unexpected error
     */
    router.post('/', modulesController.create);

    /**
     * @swagger
     *   /modules/{id}:
     *     put:
     *       security:
     *         - bearerAuth: []
     *       summary: Updates a Supplier by id
     *       tags: [modules]
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
    router.put('/:id', modulesController.update);


    app.use('/api/v1/modules', router);

};