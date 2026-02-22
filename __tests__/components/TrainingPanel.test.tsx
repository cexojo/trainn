import React from "react";
import { render, screen } from "@testing-library/react";
import TrainingPanel from "../../src/app/components/TrainingPanel";

// Helper to mock fetch with desired responses for specific URLs
const fetchMock = (url: string) => {
  if (url.startsWith("/api/me")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({ username: "testuser" }),
    });
  }
  if (url.startsWith("/api/get-user-id")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({
        id: "u1",
        firstName: "Test",
        lastName: "User",
        isocode: "es",
      }),
    });
  }
  if (url.startsWith("/api/training-data")) {
    return Promise.resolve({
      ok: true,
      json: async () => ({
        blocks: [
          { id: 1, blockNumber: 1, weeks: [{ id: 1, weekNumber: 1 }] },
        ],
        selectedBlock: { id: 1, blockNumber: 1, weeks: [{ id: 1, weekNumber: 1 }] },
        selectedWeek: { id: 1, weekNumber: 1 },
        exerciseDefs: [],
        trainingDays: [],
      }),
    });
  }
  return Promise.resolve({
    ok: true,
    json: async () => ({}),
  });
};

describe("TrainingPanel", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(fetchMock as any);
  });
  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("renders without crashing", async () => {
    // Use real state to allow TrainingPanel to manage selection as the real app would
    const React = require("react");
    const { useState } = React;
    const Wrapper = () => {
      const [selectedBlock, setSelectedBlock] = useState({ id: 1, blockNumber: 1, weeks: [{ id: 1, weekNumber: 1 }] });
      const [selectedWeek, setSelectedWeek] = useState({ id: 1, weekNumber: 1 });
      const [exerciseDefs, setExerciseDefs] = useState([]);
      return (
        <TrainingPanel
          selectedBlock={selectedBlock}
          setSelectedBlock={setSelectedBlock}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          exerciseDefs={exerciseDefs}
          setExerciseDefs={setExerciseDefs}
        />
      );
    };

    render(<Wrapper />);
    // Wait for any "Bloque" label/value to appear
    expect((await screen.findAllByText(/bloque/i)).length).toBeGreaterThan(0);
  });
});
