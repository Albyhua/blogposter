const router = require('express').Router();
const { Comment, BlogPost, User } = require('../../models');

router.post('/', async (req, res) => {
  // create comment
  try {
    const newComment = await Comment.create({ // makes new user ID
      comment: req.body.comment,
      blogpost_id: req.body.blogpost_id,
      user_id: req.body.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // updates a comments
  // somehow needs a edit button for comments
  try {
    const updateComment = await Comment.update(req.body, {
      where: {
        id: req.params.id, // or is it ...
        comment: req.body.comment,
      },
    });
    if (!updateComment[0]) {
      res.status(404).json({ message: 'No comment found.' });
      return;
    }
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const delComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delComment) {
      res.status(404).json({ message: 'No comment found.' });
      return;
    }
    res.status(200).json(delComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
