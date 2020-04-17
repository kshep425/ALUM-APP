import React from 'react';
import { AuthUserContext } from '../Session';
import get from 'lodash/get'

function ContactInfoForm(props) {

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        (
          <div className='container'>
            <div className='form-group hidden'>
              <label htmlFor='uid'>uid</label>
              <input uid='uid' type='text' className='form-control' defaultValue={get(authUser, 'uid')} ref={props.uidRef}></input>
            </div>
            <div className='form-group hidden'>
              <label htmlFor='token'>token</label>
              <input uid='token' type='text' className='form-control' defaultValue={get(authUser, 'token')} ref={props.tokenRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='prefix'>Prefix</label>
              <input id='prefix' type='text' className='form-control' defaultValue={get(authUser, 'members.prefix')} ref={props.prefixRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input id='firstName' type='text' className='form-control' defaultValue={get(authUser, 'members.firstName')} ref={props.firstNameRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input id='lastName' type='text' className='form-control' defaultValue={get(authUser, 'members.lastName')} ref={props.lastNameRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='suffix'>Suffix</label>
              <input id='suffix' type='text' className='form-control' defaultValue={get(authUser, 'members.suffix')} ref={props.suffixRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input id='email' type='email' autoComplete='username' className='form-control' defaultValue={get(authUser, 'members.email')} ref={props.emailRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputPhone'>Phone Number</label>
              <input type='text' className='form-control' id='inputPhone' defaultValue={get(authUser, 'members.phone')} ref={props.phoneRef}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputAddress'>Address</label>
              <input type='text' className='form-control' id='inputAddress' placeholder='1234 Main St' defaultValue={get(authUser, 'members.streetAddress1')} ref={props.streetAddress1Ref}></input>
            </div>
            <div className='form-group'>
              <label htmlFor='inputAddress2'>Address 2</label>
              <input type='text' className='form-control' id='inputAddress2'
                placeholder='Apartment, studio, or floor' defaultValue={get(authUser, 'members.streetAddress2')} ref={props.streetAddress2Ref}></input>
            </div>
            <div className='form-row'>
              <div className='form-group col-md-6'>
                <label htmlFor='inputCity'>City</label>
                <input type='text' className='form-control' id='inputCity' defaultValue={get(authUser, 'members.city')} ref={props.cityRef}></input>
              </div>
              <div className='form-group col-md-4'>
                <label htmlFor='inputState'>State</label>
                <select id='inputState' className='form-control' defaultValue={get(authUser, 'members.state')} ref={props.stateRef}>
                  <option>Choose...</option>
                  <option defaultValue='AL'>Alabama (AL)</option>
                  <option defaultValue='AK'>Alaska (AK)</option>
                  <option defaultValue='AZ'>Arizona (AZ)</option>
                  <option defaultValue='AR'>Arkansas (AR)</option>
                  <option defaultValue='CA'>California (CA)</option>
                  <option defaultValue='CO'>Colorado (CO)</option>
                  <option defaultValue='CT'>Connecticut (CT)</option>
                  <option defaultValue='DE'>Delaware (DE)</option>
                  <option defaultValue='DC'>District Of Columbia (DC)</option>
                  <option defaultValue='FL'>Florida (FL)</option>
                  <option defaultValue='GA'>Georgia (GA)</option>
                  <option defaultValue='HI'>Hawaii (HI)</option>
                  <option defaultValue='ID'>Idaho (ID)</option>
                  <option defaultValue='IL'>Illinois (IL)</option>
                  <option defaultValue='IN'>Indiana (IN)</option>
                  <option defaultValue='IA'>Iowa (IA)</option>
                  <option defaultValue='KS'>Kansas (KS)</option>
                  <option defaultValue='KY'>Kentucky (KY)</option>
                  <option defaultValue='LA'>Louisiana (LA)</option>
                  <option defaultValue='ME'>Maine (ME)</option>
                  <option defaultValue='MD'>Maryland (MD)</option>
                  <option defaultValue='MA'>Massachusetts (MA)</option>
                  <option defaultValue='MI'>Michigan (MI)</option>
                  <option defaultValue='MN'>Minnesota (MN)</option>
                  <option defaultValue='MS'>Mississippi (MS)</option>
                  <option defaultValue='MO'>Missouri (MO)</option>
                  <option defaultValue='MT'>Montana (MT)</option>
                  <option defaultValue='NE'>Nebraska (NE)</option>
                  <option defaultValue='NV'>Nevada (NV)</option>
                  <option defaultValue='NH'>New Hampshire (NH)</option>
                  <option defaultValue='NJ'>New Jersey (NJ)</option>
                  <option defaultValue='NM'>New Mexico (NM)</option>
                  <option defaultValue='NY'>New York (NY)</option>
                  <option defaultValue='NC'>North Carolina (NC)</option>
                  <option defaultValue='ND'>North Dakota (ND)</option>
                  <option defaultValue='OH'>Ohio (OH)</option>
                  <option defaultValue='OK'>Oklahoma (OK)</option>
                  <option defaultValue='OR'>Oregon (OR)</option>
                  <option defaultValue='PA'>Pennsylvania (PA)</option>
                  <option defaultValue='RI'>Rhode Island (RI)</option>
                  <option defaultValue='SC'>South Carolina (SC)</option>
                  <option defaultValue='SD'>South Dakota (SD)</option>
                  <option defaultValue='TN'>Tennessee (TN)</option>
                  <option defaultValue='TX'>Texas (TX)</option>
                  <option defaultValue='UT'>Utah (UT)</option>
                  <option defaultValue='VT'>Vermont (VT)</option>
                  <option defaultValue='VA'>Virginia (VA)</option>
                  <option defaultValue='WA'>Washington (WA)</option>
                  <option defaultValue='WV'>West Virginia (WV)</option>
                  <option defaultValue='WI'>Wisconsin (WI)</option>
                  <option defaultValue='WY'>Wyoming (WY)</option>
                </select>
              </div>
              <div className='form-group col-md-2'>
                <label htmlFor='inputZip'>Zip</label>
                <input type='text' className='form-control' id='inputZip' defaultValue={get(authUser, 'members.zip')} ref={props.zipRef}></input>
              </div>
            </div>
          </div>
        )}

    </AuthUserContext.Consumer>
  )

}

export default ContactInfoForm;