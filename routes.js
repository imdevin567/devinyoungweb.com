module.exports = function (app) {
  // Handle all those pesky redirects from my bad URLs in the old site
  app.get('/*', function (req, res, next) {
    if (req.get('host').match(/^www\..*/i)) {
      res.redirect(301, req.protocol + '://' + req.get('host') + req.path);
    }

    if (req.path.match(/^\/jrclicker-demo|^\/css-award-nominee|^\/google-plus-sign-in-with-ruby-on-rails|^\/css-award-nominee|^\/is-php-outdated/)) {
      res.redirect(301, req.protocol + '://' + req.get('host') + '/blog' + req.path);
    } else {
      return next();
    }
  });

  app.get('/', function (req, res) {
    res.render('index', {
      title: 'Devin Young'
    });
  });

  app.get('/resume', function (req, res) {
    res.render('resume', {
      title: 'Devin Young Resume'
    });
  });

  app.get('/blog', function (req, res) {
    res.render('blog', {
      title: 'Devin Young Blog'
    });
  });

};
