import axios from 'axios';
import { userController } from './users';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Endpoint User", () => {
  it("GET: return user json", async () => {
    mockedAxios.get.mockResolvedValue({ data: 1 });
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userController.get({} as any, res as any, {} as any);

    expect(res.status.mock.calls).toEqual([[200]]);
    expect(res.send.mock.calls).toEqual([[1]]);
  })


  it("POST: create one user return status 201", async () => {
    mockedAxios.post.mockResolvedValue({ data: 1 });
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const req = {
      body: "request body",
    };

    await userController.post(req as any, res as any, {} as any);

    expect(res.status.mock.calls).toEqual([[201]]);
    expect(res.send.mock.calls).toEqual([[1]]);
  })

  it("PUT: create one user return status 204", async () => {
    mockedAxios.put.mockResolvedValue({ data: 1 });
    const res = {
      sendStatus: jest.fn(),
    };
    const req = {
      body: "request body",
      params: { id: 1 }
    };

    await userController.put(req as any, res as any, {} as any);

    expect(res.sendStatus.mock.calls).toEqual([[204]]);
  })

  it("DELETE: delete one user return status 204", async () => {
    mockedAxios.delete.mockResolvedValue({ data: 1 });
    const res = {
      sendStatus: jest.fn(),
    };
    const req = {
      params: { id: 1 }
    };

    await userController.delete(req as any, res as any, {} as any);

    expect(res.sendStatus.mock.calls).toEqual([[204]]);
  })
})