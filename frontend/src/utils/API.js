import axios from "axios";

export default {
  // Gets all events
  getEvents: function () {
    return axios.get("/api/events");
  },
  // Gets the event with the given id
  getEvent: function (id) {
    return axios.get("/api/events/" + id);
  },
  // Deletes the event with the given id
  deleteEvent: function (id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves a event to the database
  addEvent: function (eventData) {
    return axios.post("/api/events", eventData);
  },

  addNewUser: function (data) {
    return axios.post("/api/user", data)
  },

  getAllUsers: function () {
    return axios.get("/api/users")
  },

  getAllUsersWithToken: async function (token) {
    console.log(token)
    return axios.get("/api/users", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  getUser: function (token) {
    return axios.get("/api/user/", {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  updateUser: function (data, token) {
    return axios.post('/api/updateUser/', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  setUserRole: function (data, token) {
    return axios.post('/api/setUserRole/', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  getUserDegrees: function (token) {
    console.log("getUserDegrees")
    return axios.get('/api/getUserDegreesWithUid', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  updateDegreeInfo: function (data, token) {
    console.log("updateDegreeInfo: ", data)
    return axios.post('/api/updateDegreeInfo/', data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },

  /**
   * payDues - submit payment for dues
   * @param {} data
   *    {memberType,
   *    memberId}
   * @param {*} token
   */
  payDues: function (data, token) {
    console.log("payDues")
    return axios.post("/api/payDues", data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
};
