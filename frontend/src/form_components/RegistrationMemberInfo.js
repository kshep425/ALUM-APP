import React from 'react';
import get from 'lodash/get'

const RegistrationMemberInfo = (props) => {
  console.log(props)
  const authUser = props.authUser
  console.log(authUser)
  return (
    <div>
    <div className="form-group">
      <label htmlFor="inputOccupation">Occupation</label>
      <input id="inputOccupation" type="text" className="form-control" defaultValue={get(authUser, 'db.occupation')} ref={props.occupationRef}></input>
    </div>
    <div className="form-row">

      <div className="col">
        <label htmlFor="gradYear1">Graduation Year</label>
        <input id="gradYear1" type="text" className="form-control" defaultValue={get(authUser, 'degrees[0].year')} ref={props.gradYear1Ref}></input>
      </div>
      <div className="col">
        <label htmlFor="gradMajor1">Graduation Major</label>
        <input id="gradMajor1" type="text" className="form-control" defaultValue={get(authUser, 'degrees[0].degree')} ref={props.gradMajor1Ref}></input>
      </div>
      {/* <div className="col">
        <button className="btn-primary align-self-center" type="button" data-toggle="collapse"
          data-target="#addgrad" aria-expanded="false" aria-controls="addgrad">Add Degree
                    </button>
      </div> */}
    </div>
    <div className="collapse" id="addgrad">
      <div className="form-group">
        <div className="form-row">
          <div className="col">
            <label htmlFor="gradYear2">Graduation Year</label>
            <input id="gradYear2" type="text" className="pure-input-1-2 form-control" defaultValue={get(authUser, 'degrees[1].year')} ref={props.gradYear2Ref}></input>
          </div>
          <div className="col">
            <label htmlFor="gradMajor2">Graduation Major</label>
            <input id="gradMajor2" type="text" className="pure-input-1-2 form-control" defaultValue={get(authUser, 'degrees[1].degree')} ref={props.gradMajor2Ref}></input>
          </div>
          <div className="col">
            <button className=" btn-primary" type="button" data-toggle="collapse"
              data-target="#addanother" aria-expanded="false" aria-controls="addanother">
              Add Degree
                            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="collapse" id="addanother">
      <div className="form-row">
        <div className="col">
          <label htmlFor="gradYear3">Graduation Year</label>
          <input id="gradYear3" type="text" className="pure-input-1-2 form-control" defaultValue={get(authUser, 'degrees[2].year')} ref={props.gradYear3Ref}></input>
        </div>
        <div className="col">
          <label htmlFor="gradMajor3">Graduation Major</label>
          <input id="gradYMajor3" type="text" className="pure-input-1-2 form-control" defaultValue={get(authUser, 'degrees[2].degree')} ref={props.gradMajor3Ref}></input>
        </div>
      </div>
    </div>
  </div>

  );
};

export default RegistrationMemberInfo;
