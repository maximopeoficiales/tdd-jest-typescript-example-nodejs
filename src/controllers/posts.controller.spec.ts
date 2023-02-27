import { PostController } from './posts.controller';

describe("Endpoint Post", () => {
  const axiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
  const postController = new PostController(axiosInstance as any);

  it("POST: create Post", async () => {
    const mockUsers = [{ id: 1 }, { id: 2 }];
    const post = { userId: 1, title: "Titulo", body: "Cuerpo del post" }
    const req = { body: post }
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    }
    axiosInstance.get.mockResolvedValue({
      data: mockUsers
    });
    axiosInstance.post.mockResolvedValue({
      data: { id: 10000 }
    });
    await postController.post(req as any, res as any, () => { });

    expect(res.status.mock.calls).toEqual([[201]]);
    expect(res.send.mock.calls).toEqual([[{ id: 10000 }]]);
    expect(axiosInstance.get.mock.calls).toEqual([["/users"]])
    expect(axiosInstance.post.mock.calls).toEqual([["/posts", post]])
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
    axiosInstance.get.mockResolvedValue({
      data: mockUsers
    });
    axiosInstance.post.mockClear();

    await postController.post(req as any, res as any, () => { });
    // no crea un usuario porque no existe el id
    expect(axiosInstance.post).not.toBeCalled();
    // devuelve un error 500
    expect(res.sendStatus.mock.calls).toEqual([[400]]);
  })

})