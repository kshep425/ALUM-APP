const db = require("../models")

const db_queries = {

    create_member: function(req_body){
        const [request, fields] = this.format_request(req_body)
        return db.Member.create(request, fields)
    },

    find_member: function(member_id){
        return db.Member.findOne({id: member_id})
    },

    update_member: function(update_request, member_id){
        const [request] = this.format_request(update_request)
        return db.Member.update(request, {where: {id: member_id}})
    },

    delete_member: function(member_id){
        return db.Member.destroy({id: member_id})
    },

    get_all_members: function(member_id){
        return db.Member.find();
    },

    format_request: function(req_body){
        let fields = {options: {fields: []}};
        console.log("Create Member Called")
        let request = {
            username: req_body.username,
            password: req_body.password,
            full_name: req_body.full_name,
            email: req_body.email,
            prefix: req_body.prefix,
            suffix: req_body.suffix,
            phone: req_body.phone,
            street_address_1: req_body.street_address_1,
            street_address_2: req_body.street_address_2,
            city: req_body.city,
            state: req_body.state,
            zip: req_body.zip,
            occupation: req_body.occupation,
            member_type: req_body.member_type,
            member_marital_status: req_body.member_marital_status
        };
        Object.keys(request).forEach(key => {
            if (!request[key]) {
                delete request[key];
            } else {
                fields.options.fields.push(key)
            }
        });

        return [request, fields]
    },

    /**
     * Add a degree
     * @param {*} req_body Should be a object {memberId: val, degree: val, year: val}
     */
    add_degree: function(req_body){
        console.log(req_body)
        return db.Degree.create(req_body)
    },

    all_degrees: function(){
        return db.Degree.find();
    },

    find_member_degrees: function(member_id){
        return db.Degree.findOne({where: {MemberId: member_id}})
    },
    /**
     *
     * @param {*} degree_id
     * @param {*} degree_info {degree: val, year: val, MemberId: val}
     */
    update_member_degree: function(degree_id, degree_info){
        return db.Degree.update(degree_info, {where: {id: degree_id}})
    },

    delete_member_degree: function(degree_id){
        return db.Degree.destroy({where: {id: degree_id}})
    }


}

module.exports = db_queries;