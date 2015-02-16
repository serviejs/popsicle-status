function popsicleStatus (lower, upper) {
  if (!arguments.length) {
    lower = 200;
    upper = 399;
  }

  return function (response) {
    if (response.status >= lower && response.status <= upper) {
      return Promise.resolve(response);
    }

    var err = response.error('Invalid HTTP status: ' + response.status);
    err.status = response.status;
    return Promise.reject(err);
  };
}

module.exports = popsicleStatus;
