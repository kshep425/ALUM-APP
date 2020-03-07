import React, { Component } from 'react'

class RegistrationMemberType extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
<div class="container">
                <h5>Member Registration Type</h5>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputCurrentLifeMemberIndividual"
                        value="Current Life Member Individual" data-marital_status="individual" checked></input>
                    <label class="form-check-label" for="inputCurrentLifeMemberIndividual">
                        Current Life Member Individual $25
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputCurrentLifeMemberMarried"
                        value="Current Life Member Married Couple " data-marital_status="married" ></input>
                    <label class="form-check-label" for="inputCurrentLifeMemberMarried">
                        Current Life Member Married Couple $45
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputNonLifeMemberIndividual"
                        value="Regular Non-Life Membership Individual" data-marital_status="individual"></input>
                    <label class="form-check-label" for="inputNonLifeMemberIndividual">
                        Regular Non-Life Membership Individual $60
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputNonLifeMemberMarried"
                        value="Regular Non-Life Membership Married Couple" data-marital_status="married" ></input>
                    <label class="form-check-label" for="inputNonLifeMemberMarried">
                        Regular Non-Life Membership Married Couple $115
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputIndividualLifeMemberInstallment"
                        value="Individual Life Membership Installment " data-marital_status="individual" ></input>
                    <label class="form-check-label" for="inputIndividualLifeMemberInstallment">
                        Individual Life Membership Installment $150
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="member_type" id="inputMarriedLifeMemberInstallment"
                        value="Married Couple Life Membership Installment" data-marital_status="married" ></input>
                    <label class="form-check-label" for="inputMarriedLifeMemberInstallment">
                        Married Couple Life Membership Installment $220
                    </label>
                </div>


            </div>
        )
    }
}

export default RegistrationMemberType;