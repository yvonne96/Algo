module.exports = function(app) {
  let router = app.loopback.Router();

  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/bubble',(req,res)=> {
    res.render('bubble');
  });

  app.use(router);
};
