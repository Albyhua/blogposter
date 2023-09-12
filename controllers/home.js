const router = require("express").Router(); //connecting to express

const { BlogPost, User, Comment } = require("../models");

// insert withAuth when pages are ready to be link and posted
router.get("/", async (req, res) => {
  try {
    const postData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const blogPosts = postData.map((post) => post.get({ plain: true }));
    console.log(blogPosts);
    res.render("homepage", {
      blogPosts, //this line is needs to be exact in handlebar page
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/blogpost/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        { model: Comment, include: [User] },
      ],
    });

    const blogPost = postData.get({ plain: true });
    res.render("blogpost", { ...blogPost });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
