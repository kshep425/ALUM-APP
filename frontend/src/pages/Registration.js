import React, { Component } from 'react';
import Container from "../building_components/Container"
import RegistrationLogin from '../form_components/RegistrationLogin';
import RegistrationContactInfo from '../form_components/RegistrationContactInfo';
import RegistrationMemberInfo from '../form_components/RegistrationMemberInfo';
import RegistrationMemberType from '../form_components/RegistrationMemberType';

class Registration extends Component {
    render() {
        return (
            <div>
                <Container>
                    <RegistrationLogin></RegistrationLogin>
                    <RegistrationContactInfo></RegistrationContactInfo>
                    <RegistrationMemberInfo></RegistrationMemberInfo>
                    <RegistrationMemberType></RegistrationMemberType>
                </Container>

            </div>
        );
    }
}

export default Registration;