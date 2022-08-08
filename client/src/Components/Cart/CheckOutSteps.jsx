import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import "./CheckOutSteps.css";

const CheckOutSteps = ({ activeSteps }) => {
  const Steps = [
    {
      label: "Shipping Info",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Confirm Order",
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: "Payment Info",
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <div className="checkOutSteps bg-white mt-3">
      <Stepper activeStep={activeSteps} alternativeLabel>
        {Steps.map((item, index) => {
          return (
            <Step key={index} active={activeSteps === index ? true : false}>
              <StepLabel
                style={{ color: activeSteps >= index ? "orangered" : "black" }}
                icon={item.icon}
              >
                {item.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default CheckOutSteps;
