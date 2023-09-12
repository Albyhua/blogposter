const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/helpers');

router.delete('/', withAuth, async (req, res) => {
    try {
      const delPost = await BlogPost.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!delPost) {
        res.status(404).json({ message: 'No blogpost with this id!' });
        return;
      }
      res.status(200).json(delPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  router.put('/', withAuth, async (req, res) => {
    try {
      const updatePost = await BlogPost.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!updatePost[0]) {
        res.status(404).json({ message: 'No blogpost with this id!' });
        return;
      }
      res.status(200).json(updatePost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  module.exports = router;