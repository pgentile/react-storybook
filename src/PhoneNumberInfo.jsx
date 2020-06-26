import React, { useState, useMemo } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js/max";

import InputField from "./forms/InputField";
import FieldContainer from "./forms/FieldContainer";

import "./PhoneNumberInfo.scss";

export default function PhoneNumberInfo() {
  const [baseCountry, setBaseCountry] = useState("FR");
  const [phone, setPhone] = useState("0688776609");

  const parsedPhone = useMemo(() => {
    return parsePhoneNumberFromString(phone, {
      defaultCountry: baseCountry ? baseCountry : undefined,
    });
  }, [baseCountry, phone]);

  return (
    <>
      <div>
        <FieldContainer label="Pays de base">
          {({ id }) => (
            <InputField id={id} value={baseCountry} onChange={(event) => setBaseCountry(event.target.value)} />
          )}
        </FieldContainer>
        <FieldContainer label="Numéro de téléphone">
          {({ id }) => <InputField id={id} value={phone} onChange={(event) => setPhone(event.target.value)} />}
        </FieldContainer>
      </div>
      <div>
        <p>
          <b>Valide ?</b> <code>{parsedPhone?.isValid() ? "Oui" : "Non"}</code>
        </p>
        <p>
          <b>Possible ?</b> <code>{parsedPhone?.isPossible() ? "Oui" : "Non"}</code>
        </p>
        <p>
          <b>Type :</b> <code>{parsedPhone?.getType() ?? "N/A"}</code>
        </p>
        <p>
          <b>N° stantardisé:</b> <code>{parsedPhone?.number ?? "N/A"}</code>
        </p>
        <p>
          <b>N° national:</b> <code>{parsedPhone?.nationalNumber ?? "N/A"}</code>
        </p>
        <p>
          <b>Pays :</b> <code>{parsedPhone?.country ?? "N/A"}</code>
        </p>
        <p>
          <b>Préfixe international :</b> <code>{parsedPhone?.countryCallingCode ?? "N/A"}</code>
        </p>
        <p>
          <b>URI :</b> <code>{parsedPhone?.getURI() ?? "N/A"}</code>
        </p>
      </div>
    </>
  );
}

PhoneNumberInfo.propTypes = {};
