import axios from "axios";

export default {
  // Gets all events
  getEvents: function() {
    return axios.get("/api/events");
  },
  // Gets the event with the given id
  getEvent: function(id) {
    return axios.get("/api/events/" + id);
  },
  // Deletes the event with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/events/" + id);
  },
  // Saves a event to the database
  addEvent: function(eventData) {
    return axios.post("/api/events", eventData);
  },

  addNewUser: function(data) {
    return axios.post("/api/user", data)
  },

  getAllUsers: function(data) {
    return axios.get("/api/users")
  },

  getUser: function(uid) {
    return axios.get("/api/user/" + uid)
  },

  updateUser: function(uid, data) {
    return axios.post("/api/update/" + uid, data)
  },

  updateUserWithToken: function(data, token) {
    return axios.post('/api/updateUserWithToken/',data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
};
