import React from "react";

import Travel from "./Travel";

const outwardTrip = {
  origin: "Lille",
  destination: "Nantes",
  departureDate: "12/09/2018 à 10h35",
};

const inwardTrip = {
  origin: "Nantes",
  destination: "Lille",
  departureDate: "14/09/2018 à 18h12",
};

const inwardTrip2 = {
  origin: "Nantes",
  destination: "Paris",
  departureDate: "18/09/2018 à 18h12",
};

const price = {
  value: 105.6,
  currency: "EUR",
};

const price2 = {
  value: 98.5,
  currency: "GBP",
};

export default {
  title: "Travel",
  component: Travel,
};

export const allerSimple = () => {
  return <Travel outwardTrip={outwardTrip} passengerCount={1} price={price} />;
};

export const allerRetour = () => {
  return <Travel outwardTrip={outwardTrip} inwardTrip={inwardTrip} passengerCount={2} price={price} />;
};

export const allerRetourAsymetrique = () => {
  return <Travel outwardTrip={outwardTrip} inwardTrip={inwardTrip2} passengerCount={1} price={price} />;
};

export const multiplesTrajets = () => {
  return (
    <>
      <div style={{ margin: "0.3rem" }}>
        <Travel grid outwardTrip={outwardTrip} passengerCount={1} price={price} />
      </div>
      <div style={{ margin: "0.3rem" }}>
        <Travel grid outwardTrip={outwardTrip} inwardTrip={inwardTrip} passengerCount={2} price={price} />
      </div>
      <div style={{ margin: "0.3rem" }}>
        <Travel grid outwardTrip={outwardTrip} inwardTrip={inwardTrip2} passengerCount={1} price={price2} />
      </div>
    </>
  );
};
