import { API, OrderRepository } from "@/Infrastructure";
import { OrderDomainService } from "@/Domain";
import { OrderService } from "@/Application";

const apiInstance = new API();
const orderRepositoryInstance = new OrderRepository(apiInstance);
const orderDomainServiceInstance = new OrderDomainService(orderRepositoryInstance);

export const orderServiceInstance = new OrderService(orderDomainServiceInstance);