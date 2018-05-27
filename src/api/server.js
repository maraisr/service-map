const Koa = require('koa');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());

app.use(ctx => {
	ctx.body = 'hello world';
});

app.listen(8080);
