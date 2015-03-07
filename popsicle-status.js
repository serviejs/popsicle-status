module.exports = popsicleStatus

function popsicleStatus (lower, upper) {
  if (!arguments.length) {
    lower = 200
    upper = 399
  }

  return function (req) {
    req.after(function (res) {
      if (res.status >= lower && res.status <= upper) {
        return Promise.resolve(res)
      }

      var err = res.error('Invalid HTTP status: ' + res.status)
      err.status = res.status
      return Promise.reject(err)
    })
  }
}
