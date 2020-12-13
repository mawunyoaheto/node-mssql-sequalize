
module.exports= app =>{

    const orders = require('../controller/order_approval');
    var router = require('express').Router();
    

    
/**
 * @swagger
 * path:
 *   /orders/approve-order:
 *     post:
 *       security:
 *         - bearerAuth: []
 *       summary: Approves an order
 *       tags: [Purchase Orders]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchaseOrderID:
 *                   type: integer
 *                 approvalNo:
 *                   type: string
 *                 outletID:
 *                   type: integer
 *                 remark:
 *                   type: string
 *                 approvalLevelId:
 *                   type: integer
 *                 approvalDate:
 *                   type: string
 *                 approvaldetails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       purchaseOrderLineID:
 *                         type: integer
 *                       productID:
 *                         type: integer
 *                       unitCost:
 *                         type: integer
 *                       approvedtQty:
 *                         type: number
 *                       approvedLineTotalCost:
 *                         type: integer
 *                       productUnitID:
 *                         type: integer
 *                       reOrderLevel:
 *                         type: integer
 *                       stockLevel:
 *                         type: integer
 *                       remarks:
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
router.post('/approve-order',authToken.authenticateToken,ordersController.approveOrder);
    app.use('/api/v1/orders', router);
    
    };