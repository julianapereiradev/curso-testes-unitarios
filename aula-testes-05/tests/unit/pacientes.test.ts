import { faker } from "@faker-js/faker";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid", () => {
  return {
    v4: () => { return "valor simulado no mock" }
  }
});

describe("calculator tests", () => {

  it("Should generate a protocol", () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const priority = faker.datatype.boolean()

    const result = generateProtocolForPacient(firstName, lastName, priority);
    expect(result).toEqual({
      priority,
      date: expect.any(Date),
      pacient: `${firstName} ${lastName}`,
      protocol: "valor simulado no mock"
    });
  });
});