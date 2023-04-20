const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogpost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogpost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    //console.log(blogpostData)
    if (!blogpostData) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/:id', async (req, res) => {
  console.log("in router get for blogpost")
  console.log(req.params.id)
try{
  const blogpostData = await BlogPost.findByPk(req.params.id)
  const blogpost = blogpostData.get({ plain: true });
  return res.json(blogpost)

}
catch{
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  try {
    console.log(req.body)
    console.log(req.params.id)
    const updateBlog = await BlogPost.update(req.body,{
      where: { id: req.params.id }
    });
    console.log(updateBlog)
    if (!updateBlog) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(updateBlog);
  
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
