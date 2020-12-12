
module.exports= app =>{

    const taxes = require('../controller/outlets');
    var router = require('express').Router();
    
/**
 * @swagger
 * /outlets/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all outlets(branches)
 *    tags: [Outlets]
 *    description: Get all outlets(branches)
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No records found
 *      '400':
 *        description: Unexpected error
 */
    router.get('/',taxes.findAll);

/**
 * @swagger
 *   /outlets/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns an Outlet by id
 *       tags: [Outlets]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: id of Outlet to return
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
 *           description: The specified Outlet ID is invalid (not a number).
 *         '404':
 *           description: An Outlet with the specified ID was not found.
 *         default:
 *           description: Unexpected error
 */
    router.get('/:id',taxes.findOne);

/**
 * @swagger
 *
 * /outlets/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an Outlet (Branch)
 *     tags: [Outlets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outletname:
 *                 type: string
 *               countryID:
 *                 type: integer
 *               regionID:
 *                 type: integer
 *               cityID:
 *                 type: integer
 *               email:
 *                 type: string
 *               contactnumber:
 *                 type: string
 *               taxID:
 *                 type: integer
 *               userid:
 *                 type: integer
 *               isactive:
 *                 type: string
 *     responses:
 *       '201':
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
 * /outlets/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update an Outlet (Branch)
 *     tags: [Outlets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of outlet to update
 *         shema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               outletname:
 *                 type: string
 *               countryID:
 *                 type: integer
 *               regionID:
 *                 type: integer
 *               cityID:
 *                 type: integer
 *               email:
 *                 type: string
 *               contactnumber:
 *                 type: string
 *               taxID:
 *                 type: integer
 *               userid:
 *                 type: integer
 *               isactive:
 *                 type: string
 *     responses:
 *       '201':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
    router.put('/:id',taxes.update);
    
    app.use('/api/v1/outlets', router);
    
    };