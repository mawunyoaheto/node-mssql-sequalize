
module.exports= app =>{

    const orders = require('../controller/orders');
    const ReceiveOrder = require('../controller/receive_order')
    var router = require('express').Router();
    
/**
 * @swagger
 * /orders/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all Purchase Orders
 *    tags: [Orders]
 *    description: Get all Purchase Orders
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No records found
 *      '400':
 *        description: Unexpected error
 */
   // router.get('/all',currencies.findAll);
    
/**
 * @swagger
 * path:
 *   /orders/{invoiceNo}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns orders by invoiceNo
 *       tags: [Orders]
 *       parameters:
 *         - in: path
 *           name: invoiceNo
 *           required: true
 *           description: invoiceNo of order to return
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: OK
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         '400':
 *           description: The specified invoiceNo is invalid (not a number).
 *         '404':
 *           description: An order with the specified invoiceNo was not found.
 *         default:
 *           description: Unexpected error
 */
    //router.get('/:id',currencies.findOne);
    
/**
 * @swagger
 * /orders/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an Order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoiceNum:
 *                 type: string
 *               awardNo:
 *                 type: string
 *               supplierID:
 *                 type: integer
 *               discount:
 *                 type: number
 *               vatID:
 *                 type: integer
 *               orderTerms:
 *                 type: string
 *               orderComments:
 *                 type: string
 *               outletID:
 *                 type: integer
 *               create_userid:
 *                 type: integer
 *               stageID:
 *                 type: integer
 *               statusID:
 *                 type: integer
 *               orderDate:
 *                 type: string
 *               archived:
 *                 type: string
 *               orderdetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemID:
 *                       type: integer
 *                     itemUnitID:
 *                       type: integer
 *                     qty:
 *                       type: integer
 *                     unitCost:
 *                       type: number
 *                     stockLevel:
 *                       type: integer
 *                     reOrderLevel:
 *                       type: integer
 *                     remark:
 *                       type: string
 *                     approvaLevelID:
 *                       type: integer
 *                     approvaSatusID:
 *                       type: integer
 *                     stageID:
 *                       type: integer
 *                     statusID:
 *                       type: integer
 *                     archived:
 *                       type: string
 *                     archiveTime:
 *                       type: string
 *                     createTime:
 *                       type: string
 *     responses:
 *       '201':
 *         description: created
 *       '400':
 *         description: Unexpected error
 */
    router.post('/',orders.createOrder);
    
    /**
     * @swagger
     * /orders/{id}:
     *   put:
     *     security:
     *       - bearerAuth: []
     *     summary: Update Currency
     *     tags: [Orders]
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
       // router.put('/:id',currencies.update);

/**
 * @swagger
 *   /orders/receiveorder:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Receive an order
 *       tags: [Purchase Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderID:
 *                   type: integer
 *                 receivedDate:
 *                   type: string
 *                 wayBillNo:
 *                   type: string
 *                 sraNo:
 *                   type: string
 *                 receivalNo:
 *                   type: string
 *                 remarks:
 *                   type: string
 *                 outletID:
 *                   type: integer
 *                 details:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderlineid:
 *                         type: integer
 *                       productID:
 *                         type: integer
 *                       unitCost:
 *                         type: integer
 *                       qty:
 *                         type: integer
 *                       unitID:
 *                         type: integer
 *                       batchNo:
 *                         type: string
 *                       expiryDate:
 *                         type: string
 *                       outletID:
 *                         type: integer
 *                       baseItemID:
 *                         type: integer
 *       responses:
 *         '201':
 *           description: created
 *         '400':
 *           description: Unexpected error
 */
router.post('/receiveorder',ReceiveOrder.receiveOrder);


    
    app.use('/api/v1/orders', router);
    
    };