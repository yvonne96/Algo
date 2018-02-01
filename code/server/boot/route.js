module.exports = function(app) {
  let router = app.loopback.Router();

  router.get('/', (req, res) => {
    res.render('index');
  });

  app.use(router);
};
