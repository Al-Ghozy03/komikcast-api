const { default: axios } = require("axios");

const AxiosService = async (url) => {
  return new Promise(async (resolve, reject) => {
    const _url = url == null ? url : encodeURI(url);
    try {
      const response = await axios.get(_url);
      if (response.status === 200) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error.message);
    }
  });
};

module.exports = { AxiosService };
