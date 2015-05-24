module.exports = popsicleStatus

function popsicleStatus (lower, upper) {
  if (lower == null) {
    lower = 200
  }

  if (upper == null) {
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
