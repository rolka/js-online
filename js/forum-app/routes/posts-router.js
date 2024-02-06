const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const PostModel = require('../models/post');
const upload = require('../config/multer').upload;
const validate =
    require('../utils/validation/postValidation');

router.get( '/', async ( req, res ) =>
{
    const posts =
        await PostModel.find();
    return res.json(posts);
});

router.get( '/:id', async ( req, res) =>
{
    return {
        message: 'yay'
    };
    const post =
        // await PostModel.findById(req.params.id, 'title content').exec();
        // await PostModel.findById(req.params.id).exec();
        // await PostModel.findById(req.params.id);
        await PostModel.findOne( { _id: req.params.id } );


    return res.send(req.params.id);
    // return res.json(post);
});

router.post( '/', async ( req, res) =>
{

});

router.put( '/', async ( req, res) =>
{

})

router.delete( '/:id', async ( req, res) =>
{
    const post =
        await PostModel.findOne({ _id: req.params.id });
    if ( post.authorId === req.session.user.id || req.session.user.admin )
    {
        /*
         * todo: have to check what if post with provided id is not found
         * */
        await PostModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ message: 'Post deleted' })
    }
    return res.status(403).json({ message: 'You have no rights to delete this post!' });
})



module.exports = router;