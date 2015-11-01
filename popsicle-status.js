module.exports = popsicleStatus

function popsicleStatus () {
  var lower = 200
  var upper = 399

  if (arguments.length === 1) {
    lower = arguments[0]
    upper = arguments[0]
  }

  if (arguments.length === 2) {
    lower = arguments[0]
    upper = arguments[1]
  }

  return function (req) {
    req.after(function (res) {
      if (res.status >= lower && res.status <= upper) {
        return res
      }

      var message

      if (lower === upper) {
        message = 'should equal ' + upper
      } else {
        message = 'should be between ' + lower + ' and ' + upper
      }

      var error = res.error('Invalid HTTP status, ' + res.status + ', ' + message, 'EINVALIDSTATUS')
      error.status = res.status
      throw error
    })
  }
}
