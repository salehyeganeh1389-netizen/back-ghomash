import { Router } from "express";
import { categoryGroups } from "../data/categories.js";

const router = Router();

router.get("/", (req, res) => {
  res.json(categoryGroups);
});

router.get("/:group", (req, res) => {
  const group = categoryGroups[req.params.group];

  if (!group) {
    return res.status(404).json({ message: "گروه دسته‌بندی پیدا نشد" });
  }

  res.json(group);
});

export default router;
