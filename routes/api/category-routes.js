const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [ {model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryData) {
      res.status(404).json({message: 'Category Name cannot be found!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async  (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      name: req.body.name,
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = await Category.update({
    id: req.body.id,
    name: req.body.name
  },
  {
    where: {
      id: req.params.id,
    },
  }
  );
  return res.json(categoryData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy ({
    where: {
      id: req.params.id,
    },
  });
  return res.json(categoryData);
});

module.exports = router;
