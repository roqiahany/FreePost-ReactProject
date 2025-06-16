// server.cjs
const jsonServer = require('json-server');
const auth = require('json-server-auth');
const cors = require('cors');

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// ربط الـ db بالـ app عشان json-server-auth تشتغل صح
app.db = router.db;

// صلاحيات الوصول
const rules = auth.rewriter({
  users: 600,
  posts: 640,
});

// ترتيب الميدل ويرز مهم جدًا
app.use(cors()); // لو بتشتغل من React
app.use(rules);
app.use(auth);
app.use(router);

app.listen(8000, () => {
  console.log('JSON Server Auth running on http://localhost:8000');
});
