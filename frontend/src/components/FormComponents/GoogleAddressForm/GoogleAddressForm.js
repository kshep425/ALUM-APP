import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./address.css";

const GoogleAddressForm = props => {
  const [address, setAddress] = useState("");

  const handleSelect = value => {
    geocodeByAddress(value)
      .then(results => getLatLng(results[0]))
      .then(result => {
        console.log("success", result);
      })
      .catch(error => console.log("Error", error));

    //we need to reset the address to the value that they selected
    setAddress(value);
    props.onChange(value);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        name={address}
        onChange={setAddress}
        //onSelect is what happens when the user actually selects an address
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({ placeholder: "Enter Address" })}
              className="addressInputBox"
            />
            <div className="autocomplete-dropdown-container">
              {/* {loading ? <div>...loading</div> : null} */}
              {loading && <div>Loading...</div>}

              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? "#f76f00" : "#fff"
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default GoogleAddressForm;
