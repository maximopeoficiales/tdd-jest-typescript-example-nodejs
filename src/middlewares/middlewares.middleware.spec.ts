import { authenticate } from "./authenticate.middleware"

describe("Middleware", () => {
  describe('Authenticate', () => {
    it("Should have id 1", async () => {
      const req = {
        header: jest.fn().mockReturnValue(1)
      };
      const res = {
        sendStatus: jest.fn()
      };
      const next = jest.fn();
      await authenticate(req as any, res as any, next as any);
      expect(req.header.mock.calls).toEqual([["user_id"]])
      // sendStatus has not been called
      expect(res.sendStatus).not.toBeCalled();
      // the function next was called
      expect(next).toBeCalled();
    })
  })
})