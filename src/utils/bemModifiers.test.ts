import bemModifiers from "./bemModifiers";

describe("BEM modifiers class name generator", () => {
  test("Class without any modifier", () => {
    const className = bemModifiers("toto", {});

    expect(className).toEqual("toto");
  });

  test("Class with some modifiers", () => {
    const className = bemModifiers("toto", {
      tutu: true,
      tata: false,
      tete: true,
    });

    expect(className).toEqual("toto toto--tutu toto--tete");
  });
});
