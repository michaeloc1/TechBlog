const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogposts and JOIN with user data
    const blogpostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
 

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((blogpost) => blogpost.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogposts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  req.session.save(() => {
    req.session.blogpost_id = req.params.id;

  });
  try {
    const blogpostData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });

    const commentData = await Comment.findAll(
      {
        where:{
          blogpost_id: req.params.id
        },

        include: [
          {
            model: User,
            attributes: ['username'],
           
          },
        ]
   
      }
    
    )

    const comments = commentData.map((comment) => comment.get({ plain: true }));

 
    res.render('blogpost', {
      ...blogpost,
      comments,
      logged_in: req.session.logged_in,
     // userID: req.session.user_id
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('dashboard', {
      ...user,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;
