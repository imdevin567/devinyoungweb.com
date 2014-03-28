module.exports = function (app) {

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
