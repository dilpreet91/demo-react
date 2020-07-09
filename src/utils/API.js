var axios = require('axios');
  let homeScreenData = JSON.parse(JSON.parse(localStorage.getItem("user_token")));
  
  let options = {
    headers: {'Authorization': ''}
  };

  // if (homeScreenData) {
  //   options = {
  //     headers: {'Authorization': "Bearer "+homeScreenData}
  //   };
  // }

  // Set config defaults when creating the instance
  var axiosInstance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://catberrymedia.com/dev/tap/'
  });

  axiosInstance.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    // console.log("test");
    // console.log(response);
    return response;
  }, (error) => {
    // console.log(error.response.status);
      // Return any error which is not due to authentication back to the calling service
      // if (error.response.status !== 401) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      // }
    

  });

  // Alter defaults after instance has been created
  axiosInstance.defaults.headers.common['Authorization'] = "Bearer "+homeScreenData;

module.exports = axiosInstance;