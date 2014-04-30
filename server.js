require('newrelic');

var
  express = require('express'),
  app = express(),
  Poet = require('poet'),
  handle404 = require('./lib/handle-404'),
  port = parseInt(process.env.PORT || 3333)
;

var poet = Poet(app, {
  postsPerPage: 5,
  posts: __dirname + '/_posts',
  metaFormat: 'json',
  routes: {
    '/blog/:post': 'post',
    '/tags/:tag': 'tag',
    '/categories/:category': 'category',
    '/blog/:page': 'page'
  }
});

var seven_days = 86400000 * 7;

poet
  .watch()
  .init();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.compress());
app.use(express.static(__dirname + '/public', { maxAge: seven_days }));
app.use(app.router);
app.use(handle404);

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

require('./routes')(app);

app.get('/feed', function (req, res) {
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('rss', {
    posts: poet.helpers.getPosts(0, 5),
    base_url: req.protocol + '://' + req.get('host')
  })
});

app.listen(port);
