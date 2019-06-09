import { Request, Response } from "servie/dist/node";
import { compose } from "throwback";
import { status } from "./index";

describe("popsicle status", () => {
  const req = new Request("/");

  describe("2xx", () => {
    const transport = async () => new Response(null, { status: 200 });

    it("should resolve by default", async () => {
      const send = status();

      const res = await send(req, transport);

      expect(res.status).toEqual(200);
    });

    it("should reject out of bounds responses", async () => {
      const send = status(100, 200);

      try {
        const res = await send(req, transport);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.status).toEqual(200);
        expect(e.code).toEqual("EINVALIDSTATUS");
      }

      expect.hasAssertions();
    });
  });

  describe("5xx", () => {
    const transport = async () => new Response(null, { status: 500 });

    it("should reject by default", async () => {
      try {
        await status()(req, transport);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e.status).toEqual(500);
        expect(e.code).toEqual("EINVALIDSTATUS");
      }

      expect.hasAssertions();
    });

    it("should be accepted when within range", async () => {
      const res = await status(200, 600)(req, transport);

      expect(res.status).toEqual(500);
    });
  });
});
