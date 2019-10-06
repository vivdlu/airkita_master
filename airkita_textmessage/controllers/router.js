// Map routes to controller functions
module.exports = function(router) {
  router.get('/error', function(req, resp) {
    throw new Error('512');
  });
  router.get('/high-vtoc', function(req, resp, next) {
    return new Error('');
  })
};
