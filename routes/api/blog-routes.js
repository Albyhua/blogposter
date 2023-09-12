const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');


// to post new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = await BlogPost.create({
      title: req.body.title,
      content: req.body.content
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates blogpost
  try {
    const updateBlog = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateBlog[0]) {
      res.status(404).json({ message: 'No blog found.S' });
      return;
    }
    res.status(200).json(updateBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // deletes blog
  try {
    const delBlog = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delBlog) {
      res.status(404).json({ message: 'No blogpost found.' });
      return;
    }
    res.status(200).json(delBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
