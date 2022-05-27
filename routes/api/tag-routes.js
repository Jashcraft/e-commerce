const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
  .then(tagData => {
    return res.json(tagData);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ]
  })
  .then(tagData => {
    return res.json(tagData);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  const {tag_name} = req.body;
  Tag.create({tag_name})
  .then(tagData => {
    res.json(tagData);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const {tag_name} = req.body;
  Tag.update({tag_name}, {
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    return res.json(tagData);
  })

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    return res.json(tagData);
  })
});

module.exports = router;
