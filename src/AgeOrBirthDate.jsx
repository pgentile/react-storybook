import PropTypes from "prop-types";
import { useCallback, useMemo, useState, useEffect } from "react";
import { addMonths, set, parse, differenceInYears } from "date-fns";

import FieldContainer from "./forms/FieldContainer";
import InputField from "./forms/InputField";
import NumberInput from "./forms/NumberInput";

import "./AgeOrBirthDate.scss";

export default function AgeOrBirthDate({ maxAge = 120, onChange }) {
  const travelDate = useMemo(() => {
    return set(addMonths(new Date(), 2), { seconds: 0, milliseconds: 0 });
  }, []);

  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const parsedAge = useMemo(() => parseValidAge(age, maxAge), [age, maxAge]);

  const [parsedBirthDate, ageFromBirthDate] = useMemo(
    () => parseValidBirthDate(birthDate, travelDate, maxAge),
    [birthDate, maxAge, travelDate]
  );

  useEffect(() => {
    if (onChange) {
      onChange({
        age: parsedAge,
        birthDate: parsedBirthDate,
      });
    }
  }, [onChange, parsedAge, parsedBirthDate]);

  const [lastField, setLastField] = useState(null);

  const handleAgeChange = useCallback((event) => {
    setAge(event.currentTarget.value);
    setLastField("age");
  }, []);

  const handleBirthDateChange = useCallback((event) => {
    setBirthDate(event.currentTarget.value);
    setLastField("birthDate");
  }, []);

  useEffect(() => {
    if (lastField === "birthDate") {
      if (ageFromBirthDate !== parsedAge) {
        setAge(ageFromBirthDate ? ageFromBirthDate.toString() : "");
      }
    } else if (lastField === "age") {
      if (parsedAge !== ageFromBirthDate) {
        setBirthDate("");
      }
    }
  }, [ageFromBirthDate, lastField, parsedAge]);

  return (
    <div className="age-or-birth-date">
      <FieldContainer
        className="age-or-birth-date__age"
        label="Âge"
        render={(fieldProps) => <InputField as={NumberInput} {...fieldProps} value={age} onChange={handleAgeChange} />}
      />
      <div className="age-or-birth-date__separator">ou</div>
      <FieldContainer
        className="age-or-birth-date__birthdate"
        label="Date de naissance"
        render={(fieldProps) => <InputField {...fieldProps} value={birthDate} onChange={handleBirthDateChange} />}
      />
    </div>
  );
}

AgeOrBirthDate.propTypes = {
  maxAge: PropTypes.number,
  onChange: PropTypes.func,
};

function parseValidAge(value, maxAge) {
  if (!value) {
    return null;
  }
  const parsed = Number.parseInt(value);
  return parsed <= maxAge ? parsed : null;
}

function parseValidBirthDate(value, travelDate, maxAge) {
  let parsed = parseBirthDate(value);
  if (!parsed) {
    return [null, null];
  }

  const ageAtTravelDay = differenceInYears(travelDate, parsed);
  if (ageAtTravelDay > maxAge) {
    return [null, null];
  }

  return [parsed, ageAtTravelDay];
}

function parseBirthDate(value) {
  const parsed = parse(value, "dd/MM/yyyy", new Date());
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
