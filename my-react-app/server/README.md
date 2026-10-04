# API قماش شیخ الاسلامی

Backend با Node.js + Express.

## نصب

```bash
cd server
npm install
```

## اجرا در حالت توسعه

```bash
npm run dev
```

API روی این آدرس اجرا می‌شود:

```text
http://localhost:5000
```

## مسیرها

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/category/:categoryId`
- `GET /api/categories`
- `GET /api/categories/:group`

نمونه:

```text
GET /api/products?group=fabric
GET /api/products?group=clothing
GET /api/products?category=chadori
GET /api/products?search=چادری
```
