import { User } from "@prisma/client";
import * as usersRepository from "../../src/users-repository";
import * as infractionsRepository from "../../src/infractions-repository";
import { getInfractionsFrom } from "../../src/infractions-service";

export type UserInput = {
  firstName: string,
  lastName: string,
  licenseId: string
}


beforeEach(() => {
  jest.clearAllMocks();
});


describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    jest.spyOn(usersRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    jest.spyOn(usersRepository, "getUser").mockImplementationOnce((): any => {
      return {
        id: 1,
        firstName: "Fake",
        lastName: "User",
        licenseId: "12345678"
      };
    });

    const infractionsMock = jest.spyOn(infractionsRepository, "getInfractionsFrom");
    infractionsMock.mockImplementationOnce((userId: number): any => {
      return [
        {
          id: 1,
          date: new Date().toString(),
          description: "Fake Description",
          cost: 9999,
          level: "SEVERE",
          userId: 1
        }
      ]
    });

    const userInfractions = await getInfractionsFrom("12345678");
    expect(userInfractions).toMatchObject({
      id: 1,
      firstName: "Fake",
      lastName: "User",
      licenseId: "12345678"
    });

    const { infractions } = userInfractions;
    expect(infractions).toHaveLength(1);
    expect(infractions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          date: expect.any(String),
          description: expect.any(String),
          cost: expect.any(Number),
          level: expect.any(String)
        })
      ])
    );
  });




  it("should throw an error when driver license does not exists", () => {
    const usersMock = jest.spyOn(usersRepository, "getUserByDocument").mockImplementation((): any => {
      return undefined;
    });

    const userInfractions = getInfractionsFrom("invalid");
    expect(usersMock).toBeCalledTimes(1);
    expect(userInfractions).rejects.toEqual({
      type: "NOT_FOUND",
      message: "Driver not found."
    });
  })

 
});