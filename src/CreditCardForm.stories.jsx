import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("CreditCardForm", module).add("main", () => {
  return (
    <form>
      <fieldset>
        <legend>Carte de paiement</legend>
        <div>
          <label>
            Numéro de carte
            <input type="text" autoComplete="cc-number" inputMode="numeric" maxLength={19} />
          </label>
        </div>
        <div>
          <label>
            Code de sécurité
            <input type="text" autoComplete="cc-csc" inputMode="numeric" maxLength={4} />
          </label>
        </div>
        <div>
          <label>
            Date d&apos;expiration
            <input type="text" autoComplete="cc-exp-month" inputMode="numeric" placeholder="MM" />
            <input type="text" autoComplete="cc-exp-year" inputMode="numeric" placeholder="AA" />
          </label>
        </div>
        <div>
          <label>
            Prénom
            <input type="text" autoComplete="cc-given-name" spellCheck={false} />
          </label>
          <label>
            Nom
            <input type="text" autoComplete="cc-family-name" spellCheck={false} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Livraison</legend>
        <div>
          <label>
            Prénom
            <input type="text" autoComplete="shipping given-name" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Nom
            <input type="text" autoComplete="shipping family-name" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Adresse (ligne 1)
            <input type="text" autoComplete="shipping address-line1" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Adresse (ligne 2)
            <input type="text" autoComplete="shipping address-line2" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Code postal
            <input type="text" autoComplete="shipping postal-code" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Ville
            <input type="text" autoComplete="shipping address-level2" spellCheck={false} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Facturation</legend>
        <div>
          <label>
            Prénom
            <input type="text" autoComplete="billing given-name" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Nom
            <input type="text" autoComplete="billing family-name" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Adresse (ligne 1)
            <input type="text" autoComplete="billing address-line1" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Adresse (ligne 2)
            <input type="text" autoComplete="billing address-line2" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Code postal
            <input type="text" autoComplete="billing postal-code" spellCheck={false} />
          </label>
        </div>
        <div>
          <label>
            Ville
            <input type="text" autoComplete="billing address-level2" spellCheck={false} />
          </label>
        </div>
      </fieldset>
    </form>
  );
});
