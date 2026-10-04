import express from "express";
import cors from "cors";
import productsRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "API قماش شیخ الاسلامی فعال است",
  });
});

app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "مسیر API پیدا نشد" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
