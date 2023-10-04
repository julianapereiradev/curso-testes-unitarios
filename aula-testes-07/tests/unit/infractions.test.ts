import { User } from "@prisma/client";
import * as usersRepository from "../../src/users-repository";
import * as infractionRepository from "../../src/infractions-repository";
import { getInfractionsFrom } from "../../src/infractions-service";

export type UserInput = {
  firstName: string,
  lastName: string,
  licenseId: string
}

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const userDocument: User = {
      id: 1,
      firstName: "Juliana",
      lastName: "Costa",
      licenseId: "123456"
    };
    jest.spyOn(usersRepository, "getUserByDocument").mockImplementationOnce((): any => {
      return { 
        userDocument 
      };
    });

    const userInfractions = await getInfractionsFrom("123456");
    expect(userInfractions).toEqual({
      userDocument, 
      infractions: []
    })
  });

  it("should throw an error when driver license does not exists", () => {
    const userDocument: UserInput = {
      firstName: "Juliana",
      lastName: "Costa",
      licenseId: '123456'
    }

    jest.spyOn(infractionRepository, "getInfractionsFrom").mockImplementationOnce((): any => {
      return undefined
    })

    const promise = getInfractionsFrom(userDocument.licenseId)

    expect(promise).rejects.toEqual({ 
      type: 'NOT_FOUND', 
      message: 'Driver not found.' 
    })

  })

 
});