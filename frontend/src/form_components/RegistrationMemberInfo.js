import React, { Component } from 'react'

class RegistrionMemberInfo extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>

                <h5>Member Info</h5>
                <div class="form-group">
                    <label for="inputOccupation">Occupation</label>
                    <input id="inputOccupation" type="text" class="form-control"></input>
                </div>
                <div class="form-row">

                    <div class="col">
                        <label for="gradYear1">Graduation Year</label>
                        <input id="gradYear1" type="text" class="form-control"></input>
                    </div>
                    <div class="col">
                        <label for="gradMajor1">Graduation Major</label>
                        <input id="gradMajor1" type="text" class="form-control"></input>
                    </div>
                    <div class="col">
                        <button class="btn-primary align-self-center" type="button" data-toggle="collapse"
                            data-target="#addgrad" aria-expanded="false" aria-controls="addgrad">Add Degree
                        </button>
                    </div>
                </div>
                <div class="collapse" id="addgrad">
                    <div class="form-group">
                        <div class="form-row">
                            <div class="col">
                                <label for="gradYear2">Graduation Year</label>
                                <input id="gradYear2" type="text" class="pure-input-1-2 form-control"></input>
                            </div>
                            <div class="col">
                                <label for="gradMajor2">Graduation Major</label>
                                <input id="gradMajor2" type="text" class="pure-input-1-2 form-control"></input>
                            </div>
                            <div class="col">
                                <button class=" btn-primary" type="button" data-toggle="collapse"
                                    data-target="#addanother" aria-expanded="false" aria-controls="addanother">
                                    Add Degree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collapse" id="addanother">
                    <div class="form-row">
                        <div class="col">
                            <label for="gradYear3">Graduation Year</label>
                            <input id="gradYear3" type="text" class="pure-input-1-2 form-control"></input>
                        </div>
                        <div class="col">
                            <label for="gradMajor3">Graduation Major</label>
                            <input id="gradYMajor3" type="text" class="pure-input-1-2 form-control"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegistrionMemberInfo;