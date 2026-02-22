import "@testing-library/jest-dom";

// Provide a global fetch mock for jsdom/Jest (prevents 'fetch is not defined' error)
if (!global.fetch) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({}),
    text: async () => "",
    // Optionally add more fields if needed (headers, etc.)
  } as any);
}

// You can add global mocks or custom matchers here
