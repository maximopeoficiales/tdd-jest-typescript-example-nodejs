import axios from 'axios';
import { postController } from './posts';
import { userController } from './users';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Endpoint Post", () => {

  it("POST: create Post", async () => {
    const mockUsers = [{ id: 1 }, { id: 2 }];
    const post = { userId: 1, title: "Titulo", body: "Cuerpo del post" }
    const req = { body: post }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    mockedAxios.get.mockResolvedValue({
      data: mockUsers
    });
    mockedAxios.post.mockResolvedValue({
      data: { id: 10000 }
    });
    await postController.post(req as any, res as any, () => { });

    expect(res.status.mock.calls).toEqual([[201]]);
    expect(res.send.mock.calls).toEqual([[{ id: 10000 }]]);
    expect(mockedAxios.get.mock.calls).toEqual([["https://jsonplaceholder.typicode.com/users"]])
    expect(mockedAxios.post.mock.calls).toEqual([["https://jsonplaceholder.typicode.com/posts", post]])
  })

  it("POST: should not create if userId doesNotExist", async () => {
    const mockUsers = [{ id: 1 }, { id: 2 }];
    const post = { userId: 3, title: "Titulo", body: "Cuerpo del post" }
    const req = { body: post }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      sendStatus: jest.fn()
    }
    mockedAxios.get.mockResolvedValue({
      data: mockUsers
    });
    mockedAxios.post.mockClear();

    await postController.post(req as any, res as any, () => { });
    // no crea un usuario porque no existe el id
    console.log("parms", mockedAxios.post.mock.calls);

    expect(mockedAxios.post.mock.calls.length).toEqual(0);
    // devuelve un error 500
    expect(res.sendStatus.mock.calls).toEqual([[400]]);
  })

})