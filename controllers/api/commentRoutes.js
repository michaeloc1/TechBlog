const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      blogpost_id: req.session.blogpost_id
    });

    res.status(200).json(newComment);
   
  } catch (err) {
    res.status(800).json(err);
  }
});



module.exports = router;