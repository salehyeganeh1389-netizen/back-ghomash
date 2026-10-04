import { Router } from "express";
import { storeProducts } from "../data/products.js";
import { categoryGroups } from "../data/categories.js";

const router = Router();

const categoryToGroup = {};

for (const [groupKey, group] of Object.entries(categoryGroups)) {
  for (const category of group.categories) {
    categoryToGroup[category.id] = groupKey;
  }
}

function decorateProduct(product) {
  return {
    ...product,
    group: categoryToGroup[product.category] || null,
    image: product.image || null,
    rating: product.rating || { rate: 0, count: 0 },
  };
}

router.get("/", (req, res) => {
  let products = storeProducts.map(decorateProduct);

  const { group, category, search, minPrice, maxPrice } = req.query;

  if (group) {
    products = products.filter((product) => product.group === group);
  }

  if (category) {
    products = products.filter((product) => product.category === category);
  }

  if (search) {
    const searchText = String(search).trim().toLowerCase();

    if (searchText) {
      products = products.filter((product) =>
        [product.title, product.description, product.details, product.category]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(searchText))
      );
    }
  }

  if (minPrice !== undefined && minPrice !== "") {
    products = products.filter((product) => product.price >= Number(minPrice));
  }

  if (maxPrice !== undefined && maxPrice !== "") {
    products = products.filter((product) => product.price <= Number(maxPrice));
  }

  res.json(products);
});

router.get("/category/:categoryId", (req, res) => {
  const products = storeProducts
    .filter((product) => product.category === req.params.categoryId)
    .map(decorateProduct);

  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = storeProducts.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({ message: "محصول پیدا نشد" });
  }

  res.json(decorateProduct(product));
});

export default router;
