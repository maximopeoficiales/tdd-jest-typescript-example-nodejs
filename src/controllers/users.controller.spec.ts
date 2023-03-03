import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http';

describe("Endpoint User", () => {
  const axiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
  const userController = new UserController(axiosInstance as any);

  it("GET: return user json", async () => {
    axiosInstance.get.mockResolvedValue({ data: 1 });
    const res = httpMocks.createResponse();
    await userController.get({} as any, res, {} as any);

    expect(res.statusCode).toEqual(200);
    expect(res._isEndCalled()).toBeTruthy();
  })


  it("POST: create one user return status 201", async () => {
    axiosInstance.post.mockResolvedValue({ data: 1 });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.body = "request body";
    await userController.post(req as any, res, {} as any);

    expect(res.statusCode).toEqual(201);
    expect(res._isEndCalled()).toBeTruthy();
  })

  it("PUT: create one user return status 204", async () => {
    axiosInstance.put.mockResolvedValue({ data: 1 });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    req.body = "request body";
    req.params = { "id": "1" }

    await userController.put(req, res, {} as any);
    expect(res.statusCode).toEqual(204);
  })

  it("DELETE: delete one user return status 204", async () => {
    axiosInstance.delete.mockResolvedValue({ data: 1 });
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();
    req.params = { "id": "1" }

    await userController.delete(req as any, res, {} as any);

    expect(res.statusCode).toEqual(204);
  })
})