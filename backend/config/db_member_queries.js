const db = require("../models")

const db_queries = {

    createMember: function(reqBody){
        const [request, fields] = this.formatRequest(reqBody)
        return db.Member.create(request, fields)
    },

    getMember: function(member_id){
        return db.Member.findOne({where: {uid: member_id}
    })},

    updateMember: function(uid, update_request ){
        const [request] = this.formatRequest(update_request)
        return db.Member.update(request, {where: {uid}})
    },

    deleteMember: function(member_id){
        return db.Member.destroy({uid: member_id})
    },

    getAllMembers: function(){
        return db.Member.findAll();
    },

    formatRequest: function(reqBody){
        let fields = {options: {fields: []}};
        console.log("Create Member Called")
        let request = {
            username: reqBody.username,
            password: reqBody.password,
            fullName: reqBody.fullName,
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            prefix: reqBody.prefix,
            suffix: reqBody.suffix,
            phone: reqBody.phone,
            streetAddress1: reqBody.streetAddress1,
            streetAddress2: reqBody.streetAddress2,
            city: reqBody.city,
            state: reqBody.state,
            zip: reqBody.zip,
            occupation: reqBody.occupation,
            memberType: reqBody.memberType,
            memberMaritalStatus: reqBody.memberMaritalStatus,
            imageUrl: reqBody.imageUrl,
            uid: reqBody.uid,
            role: reqBody.role,
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
     * @param {*} reqBody Should be a object {memberId: val, degree: val, year: val}
     */
    addDegree: function(reqBody){
        console.log(reqBody)
        return db.Degree.create(reqBody)
    },

    allDegrees: function(){
        return db.Degree.find();
    },

    findMemberDegrees: function(member_id){
        return db.Degree.findOne({where: {MemberId: member_id}})
    },

    findMemberDegreesWithUid: function(uid){
        return db.Degree.findAll({where: {uid}})
    },
    /**
     *
     * @param {*} degree_id
     * @param {*} degree_info {degree: val, year: val, MemberId: val}
     */
    updateMemberDegree: function(degree_id, degree_info){
        return db.Degree.update(degree_info, {where: {id: degree_id}})
    },

    deleteMemberDegree: function(degree_id){
        return db.Degree.destroy({where: {id: degree_id}})
    },

    /**
     * degree_obj object containing {year, degree, memberId, and degreeId}
     */
    createOrUpdateMemberDegrees: function(degreeObj) {
      if (degreeObj.degreeId){
        console.log("Update Degree: ", degreeObj.degreeId)
        return db.Degree.update(degreeObj, {where: {id: degreeObj.degreeId}})
      } else {
        console.log("Create Degree")
        return db.Degree.create(degreeObj)
      }
    },

    getMemberId: function(uid){
      console.log("Get Member ID")
      return db.Member.findOne({where: uid, attributes: ['id']})
    }

}

module.exports = db_queries;