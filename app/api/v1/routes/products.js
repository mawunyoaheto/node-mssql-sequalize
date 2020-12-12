
module.exports= app =>{

    const products = require('../controller/products');
    const prodUpload = require('../controller/uploadproductscsv');
    var router = require('express').Router();
    
/**
 * @swagger
 *   /products/all:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns all products
 *       tags: [Products]
 *       responses:
 *         '200':
 *           description: OK
 *         '404':
 *           description: No records found
 *         '400':
 *           description: Unexpected error
 */
router.get('/all',products.findAll);

/**
 * @swagger
 *   /products/{id}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns a product by id
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: productid
 *           required: true
 *           description: id of product to return
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
 *           description: The specified Product ID is invalid (not a number).
 *         '404':
 *           description: A Product with the specified ID was not found.
 *         default:
 *           description: Unexpected error
 */
router.get('/:id',products.findOne);

/**
 * @swagger
 * /products/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               ext_description:
 *                 type: string
 *               product_code:
 *                 type: string
 *               cost_price:
 *                 type: integer
 *               s_price:
 *                 type: integer
 *               category_id:
 *                 type: integer
 *               baseunit_id:
 *                 type: integer
 *               archived:
 *                 type: string
 *               userid:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: created
 *       '400':
 *         description: Unexpected error
 */
router.post('/',products.create);


/**
 * @swagger
 *
 * /products/upload:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Products from a CSV file
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
router.post('/upload',prodUpload.uploadProducts);

/**
 * @swagger
 *   /products/{id}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       summary: Updates a product by id
 *       tags: [Products]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: id of product to update
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                 ext_description:
 *                   type: string
 *                 product_code:
 *                   type: string
 *                 cost_price:
 *                   type: double
 *                 s_price:
 *                   type: double
 *                 category_id:
 *                   type: integer
 *                 isactive:
 *                   type: boolean
 *                 userid:
 *                   type: integer
 *       responses:
 *         '201':
 *           description: created
 *         '400':
 *           description: Unexpected error
 */
router.put('/:id',products.update);
    
    app.use('/api/v1/products', router);
    
    };