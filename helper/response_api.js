function responseApi(res, code, message, data = []) {
  return res.status(code).json({
    status: message,
    data: data,
  });
}

module.exports = { responseApi };
