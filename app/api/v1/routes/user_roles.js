
module.exports= app =>{

    const user_roles = require('../controller/user_roles');
    var router = require('express').Router();
    
/**
 * @swagger
 * /user-roles/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns all user roles
 *     tags: [User Roles]
 *     description: Get all user roles
 *     responses:
 *       '200':
 *         description: OK
 */
    router.get('/',user_roles.findAll);

/**
 * @swagger
 *   /user-roles/{roleid}:
 *     get:
 *       security:
 *         - bearerAuth: []
 *       summary: Returns a user role by id
 *       tags: [User Roles]
 *       parameters:
 *         - in: path
 *           name: roleid
 *           required: true
 *           description: id of user role to return
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
 *           description: The specified user role ID is invalid (not a number).
 *         '404':
 *           description: A user role with the specified ID was not found.
 *         default:
 *           description: Unexpected error
 */
    router.get('/:id',user_roles.findOne);

/**
 * @swagger
 * /user-roles/:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add user role
 *     tags: [User Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               note:
 *                 type: string
 *               active:
 *                 type: string
 *     responses:
 *       '200':
 *         description: created
 *       '400':
 *         description: Unexpected error
 */
    router.post('/',user_roles.create);

/**
 * @swagger
 *   /user-roles/{roleid}:
 *     put:
 *       security:
 *         - bearerAuth: []
 *       summary: Updates a user role by id
 *       tags: [User Roles]
 *       parameters:
 *         - in: path
 *           name: roleid
 *           required: true
 *           description: id of user role to update
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 note:
 *                   type: string
 *                 active:
 *                   type: string
 *       responses:
 *         '201':
 *           description: updated
 *         '400':
 *           description: Unexpected error
 */
    router.put('/:id',user_roles.update);
    
    app.use('/api/v1/user-roles', router);
    
    };