const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Category}, {model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryNameData = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if (!categoryNameData) {
      res.status(404).json({message: 'Category Name cannot be found!'});
      return;
    }
    res.status(200).json(categoryNameData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async  (req, res) => {
  // create a new category
  try {
    const newCategoryData = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(newCategoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryNameData = await Category.update({
    id: req.body.id,
    name: req.body.name
  },
  {
    where: {
      id: req.params.id,
    },
  }
  );
  return res.json(categoryNameData);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryNameData = await Category.destroy ({
    where: {
      id: req.params.id,
    },
  });
  return res.json(categoryNameData);
});

module.exports = router;
