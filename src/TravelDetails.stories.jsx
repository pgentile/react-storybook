import TravelDetails from "./TravelDetails";

export default {
  title: "TravelDetails",
  component: TravelDetails,
};

export const main = () => {
  const segments = [
    {
      type: "train",
      transporter: "SNCF",
      equipment: "TER",
      origin: "Clisson",
      destination: "Nantes",
      duration: 30,
    },
    {
      type: "connection",
      sameStation: true,
      origin: "Nantes",
      destination: "Nantes",
      duration: 25,
    },
    {
      type: "train",
      transporter: "SNCF",
      equipment: "TGV Atlantique",
      origin: "Nantes",
      destination: "Paris Montparnasse",
      duration: 60 * 2 + 16,
    },
    {
      type: "connection",
      sameStation: false,
      origin: "Paris Montparnasse",
      destination: "Paris Gare du Nord",
      duration: 62,
    },
    {
      type: "train",
      transporter: "Eurostar",
      equipment: "Eurostar",
      origin: "Paris Gare du Nord",
      destination: "Londres",
      duration: 60 * 2,
      boardingCondition: {
        minDelayBeforeDeparture: 30,
      },
    },
  ];
  return <TravelDetails segments={segments} />;
};
