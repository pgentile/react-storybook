import { Fragment } from "react";
import PropTypes from "prop-types";

import "./TravelDetails.scss";

export default function TravelDetails({ segments }) {
  const segmentElements = segments.map((segment, index) => {
    switch (segment.type) {
      case "train":
        return <TrainSegment key={index} {...segment} />;
      case "connection":
        return <ConnectionSegment key={index} {...segment} />;
      default:
        throw new Error(`Unknown segment type: ${segment.type}`);
    }
  });

  return <div className="travel-details">{segmentElements}</div>;
}

TravelDetails.propTypes = {
  segments: PropTypes.array.isRequired,
};

const segmentProps = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

function TrainSegment({ transporter, equipment, origin, destination, duration, boardingCondition }) {
  return (
    <Fragment>
      {boardingCondition && <BoardingCondition {...boardingCondition} />}
      <div className="travel-details__segment travel-details__segment--train">
        <p>{origin}</p>
        <p className="travel-details__segment-details">
          <span>{transporter}</span> <span>{equipment}</span> <span>{niceDuration(duration)}</span>
        </p>
        <p>{destination}</p>
      </div>
    </Fragment>
  );
}

TrainSegment.propTypes = {
  ...segmentProps,
  transporter: PropTypes.string.isRequired,
  equipment: PropTypes.string.isRequired,
  boardingCondition: PropTypes.object,
};

function BoardingCondition({ minDelayBeforeDeparture }) {
  return (
    <div className="travel-details__segment travel-details__segment--boarding">
      <p>Embarquement prévu {niceDuration(minDelayBeforeDeparture)} avant le départ du train</p>
    </div>
  );
}

BoardingCondition.propTypes = {
  minDelayBeforeDeparture: PropTypes.number.isRequired,
};

function ConnectionSegment({ origin, destination, duration }) {
  const sameStation = origin === destination;
  return (
    <div className="travel-details__segment travel-details__segment--connection">
      <p className="travel-details__segment-connection-title">Correspondance &mdash; {niceDuration(duration)}</p>
      {!sameStation && (
        <p className="travel-details__segment-station-change-warning">
          Vous devez changer de gare pour aller à {destination}
        </p>
      )}
    </div>
  );
}

ConnectionSegment.propTypes = {
  ...segmentProps,
};

function niceDuration(duration) {
  let hours = 0;
  let remaining = duration;
  while (remaining >= 60) {
    hours++;
    remaining -= 60;
  }

  if (hours) {
    return `${hours} ${plural(hours, "heure", "s")} ${remaining} ${plural(remaining, "minute", "s")}`;
  }

  return `${remaining} ${plural(remaining, "minute", "s")}`;
}

function plural(count, name, suffix) {
  return count >= 2 ? name + suffix : name;
}
