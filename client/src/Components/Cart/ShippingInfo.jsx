import React, { useState } from "react";

import MetaData from "../Layouts/MetaData";

import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import TextField from "@mui/material/TextField";

import { Country, State } from "country-state-city";

import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../Actions/CartAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./ShippingInfo.css";
import CheckOutSteps from "./CheckOutSteps.jsx";

const ShippingInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [pinCode, setPinCode] = useState(shippingInfo.pincode);

  const ShippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone no should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pincode: pinCode, // due to name in orderModel(backend)
        phoneNo,
      })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <CheckOutSteps activeSteps={0} />

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form onSubmit={ShippingSubmit} className="shippingForm">
            <div className="address-input  form-input">
              <HomeIcon />
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="city-input form-input">
              <LocationCityIcon />
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="pin-input form-input">
              <PinDropIcon />
              <TextField
                id="outlined-basic"
                label="Pin Code"
                variant="outlined"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>

            <div className="phone-input form-input">
              <PhoneIcon />
              <TextField
                id="outlined-basic"
                label="Phone no."
                variant="outlined"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="country-input form-input">
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => {
                    return (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {country && (
              <div className="state-input form-input">
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => {
                      return (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="shippingBtn  bg-orange-500  text-white hover:bg-orange-400"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
