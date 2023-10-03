import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock" }
  }
});

describe("calculator tests", () => {

  it("Should generate a protocol", () => {
    const value = generateProtocolForPacient("Juliana", "Costa", true);
    expect(value.protocol).toBe("valor simulado no mock");
  });
});