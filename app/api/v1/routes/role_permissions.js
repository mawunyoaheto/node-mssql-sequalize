
module.exports = app => {

    const rolePermissionsController = require('../controller/role_permissions');
    var router = require('express').Router();

 /**
 * @swagger
 * /role-permissions/all:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Returns all User Role Permissions
 *    tags: [Role Permissions]
 *    description: Get all User Acces Level Permissions
 *    responses:
 *      '200':
 *        description: OK
 *      '404':
 *        description: No records found
 *      '400':
 *        description: Unexpected error
 */
router.get('/all',rolePermissionsController.findAll);

/**
 * @swagger
 *   /role-permissions/{usercode}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns User Level Permissions by user id
 *       tags: [Role Permissions]
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
router.get('/:usercode', rolePermissionsController.findOne);

/**
 * @swagger
 * /role-permissions/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add Role Permissions
 *     tags: [Role Permissions]
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
router.post('/',rolePermissionsController.create);


/**
 * @swagger
 * /role-permissions/{usercode}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update UserPermiss ion by User Id
 *     tags: [Role Permissions]
 *     parameters:
 *       - in: path
 *         name: usercode
 *         required: true
 *         description: User ID of Role Permissions to update
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
router.put('/:usercode',rolePermissionsController.update);


    app.use('/api/v1/role-permissions', router);

};