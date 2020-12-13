
module.exports = app => {

    const userPermissionsController = require('../controller/user_permissions');
    var router = require('express').Router();

 /**
 * @swagger
 * /user-permissions/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all User Role Permissions
 *    tags: [User Permissions]
 *    description: Get all User Acces Level Permissions
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No records found
 *      '400':
 *        description: Unexpected error
 */
router.get('/all',userPermissionsController.findAll);

/**
 * @swagger
 *   /user-permissions/{usercode}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns User Level Permissions by user id
 *       tags: [User Permissions]
 *       parameters:
 *         - in: path
 *           name: usercode
 *           required: true
 *           description: Role id of User Role Permissions to return
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
 *           description: The specified User Role ID is invalid (not a number).
 *         '404':
 *           description: Role Permissions with the specified Role ID was not found.
 *         default:
 *           description: Unexpected error
 */
router.get('/:usercode', userPermissionsController.findOne);

/**
 * @swagger
 * /user-permissions/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add User Permissions
 *     tags: [User Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 usercode:
 *                   type: integer
 *                 moduleid:
 *                   type: integer
 *                 moduletransid:
 *                   type: integer
 *                 transstageid:
 *                   type: integer
 *                 add:
 *                   type: string
 *                 edit:
 *                   type: string
 *                 view:
 *                   type: string
 *                 print:
 *                   type: string
 *                 delete:
 *                   type: string
 *                 viewlog:
 *                   type: string
 *                 isactive:
 *                   type: string
 *     responses:
 *       '201':
 *         description: created
 *       '400':
 *         description: Unexpected error
 */
router.post('/',userPermissionsController.create);


/**
 * @swagger
 * /user-permissions/{usercode}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update UserPermiss ion by User Id
 *     tags: [User Permissions]
 *     parameters:
 *       - in: path
 *         name: usercode
 *         required: true
 *         description: User ID of User Permissions to update
 *         shema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 moduleid:
 *                   type: integer
 *                 moduletransid:
 *                   type: integer
 *                 transstageid:
 *                   type: integer
 *                 add:
 *                   type: string
 *                 edit:
 *                   type: string
 *                 view:
 *                   type: string
 *                 print:
 *                   type: string
 *                 delete:
 *                   type: string
 *                 viewlog:
 *                   type: string
 *                 isactive:
 *                   type: string
 *     responses:
 *       '201':
 *         description: created
 *       '402':
 *         description: failed
 *       '400':
 *         description: Unexpected error
 */
router.put('/:usercode',userPermissionsController.update);


    app.use('/api/v1/user-permissions', router);

};