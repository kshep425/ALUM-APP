const db_queries = require("../config/db_queries")
const passport = require("../config/passport");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
module.exports = function (app) {
//
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log(req.body)
        //console.log("Login Registered User: " + req.user.username)
        res.status(200)
            // .json({ username: req.user.username, full_name: req.user.full_name });
            .json(req);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/register", function (req, res) {
        const member_info = req.body
        db_queries.create_member(member_info)
            .then(function (member_response) {
                console.log("Add Degree")
                for(let i=0; i < member_info.degree.length; i++){
                    vals = Object.values(member_info.degree[i])
                    if(vals[0] && vals[1]){
                        member_info.degree[i]["MemberId"] = member_response.dataValues.id;
                        console.log(member_info)
                        db_queries.add_degree(member_info.degree[i])
                        .then((result)=>{
                            console.log("Degree Added")
                            console.log(result)
                        })
                        .catch((err)=>{
                            console.log("Create Member Failed")
                            console.log(err)
                        })
                    }
                }
            })
            .then(function () {
                res.redirect(307, "/");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/api/logout", function (req, res) {
        req.logout();
        res.send("You have logged out")
        //res.redirect(307, "/api/login");
    });

}
