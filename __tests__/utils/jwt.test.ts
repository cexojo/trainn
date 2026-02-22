import { decodeJWTPayload } from "../../src/app/utils/jwt";

describe("decodeJWTPayload", () => {
  it("returns null for invalid JWT string", () => {
    expect(decodeJWTPayload("not.a.jwt")).toBeNull();
    expect(decodeJWTPayload("")).toBeNull();
    expect(decodeJWTPayload("a.b")).toBeNull();
  });

  it("decodes a valid JWT payload", () => {
    // { "username": "test", "role": "athlete", "exp": 1999999999 }
    const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
    const payloadObj = { username: "test", role: "athlete", exp: 1999999999 };
    const payload = Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
    const token = [header, payload, "signature"].join(".");
    expect(decodeJWTPayload(token)).toMatchObject(payloadObj);
  });

  it("returns null if payload JSON is malformed", () => {
    // Base64 encode a string that's not valid JSON
    const badPayload = Buffer.from("not json!").toString("base64url");
    const token = "header." + badPayload + ".signature";
    expect(decodeJWTPayload(token)).toBeNull();
  });
});
