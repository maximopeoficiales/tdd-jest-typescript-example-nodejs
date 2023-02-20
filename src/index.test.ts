import axios from 'axios';
import { userController } from './controllers/users';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Endpoint User", () => {
  it("return user json", async () => {
    mockedAxios.get.mockResolvedValue({ data: 1 });
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await userController.get({} as any, res as any, {} as any);
    console.log(res.send.mock.calls);

    expect(res.status.mock.calls).toEqual([[200]]);
    expect(res.send.mock.calls).toEqual([[1]]);
  })
})