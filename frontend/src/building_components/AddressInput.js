import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import "./address.css";

const AddressInput = props => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });

  const handleSelect = value => {
    geocodeByAddress(value)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log("success", latLng);
        setCoordinates(latLng);
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
                  backgroundColor: suggestion.active ? "#fe7f18" : "#fff"
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

export default AddressInput;
