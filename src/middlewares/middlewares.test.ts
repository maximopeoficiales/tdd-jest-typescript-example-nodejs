import { authenticate } from "./authenticate"

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
      expect(res.sendStatus.mock.calls.length).toEqual(0)
      // the function next was called
      expect(next.mock.calls.length).toEqual(1)
    })
  })
})