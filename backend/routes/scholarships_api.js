const path = require("path");
module.exports = function (app) {
  app.get("/api/getScholarshipForm", function(req, res){
    console.log("GetScholarshipForm")
    res.sendFile(path.join(__dirname, '../../frontend/src/components/Scholarships/ScholarshipForm.pdf'))
  })
};