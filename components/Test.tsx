"use client";

import { Button } from "./Button/Button";
import { Checkbox } from "./Checkbox/Checkbox";

export const Test: React.FC = () => {
  return (
    <>
      <Checkbox>Contenu marketing et offres exclusives en rapport avec nos produits</Checkbox>
      <Button
        onPress={() => console.log("pressed")}
        showArrow={true}
        isLoading={false}
        isSuccess={false}
        isDisabled={false}
      >
        Créer un compte
      </Button>
    </>
  );
};

Test.displayName = "Test";
