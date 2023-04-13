const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: Product
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    const error = err.errors[0].message;
    res.status(400).json({ error });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedCategory === 0) {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(200).json({ message: 'Category deleted successfully' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
