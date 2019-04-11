import Axios from "axios";

export default class Ajax {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;

    const instance = Axios.create({
      baseURL: this.baseUrl
    });

    this.axiosInstance = instance;
  }

  async fetchResponse(path, method = "GET", requestData) {
    let requestConfig = {
      url: path,
      method: method,
      timeout: 2000
    };

    let headers = {
      Accept: "application/json; charset=UTF-8",
      Authorization: "Bearer V7hqHWPQPPV7UHPhq7UQVUU77cQWQVhU",
      "x-request-id": "270d0510-5c29-11e9-9804-1348a174966d"
    };

    if (requestData) {
      if (method === "GET") {
        requestConfig = Object.assign(requestConfig, {
          params: requestData
        });
      } else {
        requestConfig = Object.assign({}, requestConfig, {
          data: requestData
        });
      }
    }

    requestConfig = Object.assign({}, requestConfig, {
      headers: headers
    });

    try {
      let res = await this.axiosInstance.request(requestConfig);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  GET(path, querys) {
    return this.fetchResponse(path, "GET", querys);
  }

  POST(path, body) {
    return this.fetchResponse(path, "POST", body);
  }
}
