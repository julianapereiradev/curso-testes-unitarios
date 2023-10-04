import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";
import httpStatus from "http-status";

describe("Order Service Tests", () => {
  it("should create an order", async () => {

    const orderClient: OrderInput = {
      client: faker.person.firstName(),
      description: faker.lorem.lines()
    }

   const order = await createOrder(orderClient)
   
    expect(order).toEqual({
      protocol: expect.any(String),
      status: "IN_PREPARATION"
    })
  });

  it("should return an order based on the protocol", async () => {
    
    const resultOrderClient = {
      protocol: new Date().getTime().toString(),
      status: "IN_PREPARATION"
    }

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return {
        protocol: resultOrderClient.protocol,
        status: resultOrderClient.status
      }
    })

   const order = await getOrderByProtocol(resultOrderClient.protocol)
  
   expect(order.protocol).toBe(resultOrderClient.protocol)

  });

  it("should return status INVALID when protocol doesn't exists", async () => {

    jest.spyOn(orderRepository, "getByProtocol").mockImplementationOnce((): any => {
      return undefined
    })

   const order = await getOrderByProtocol('0')
  
   expect(order.status).toEqual("INVALID")
  });
});