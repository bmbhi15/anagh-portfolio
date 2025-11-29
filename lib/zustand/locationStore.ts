import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Location, locations } from "../constants";

const DEFAULT_LOCATION = locations.about;

type State = {
  currentLocation: Location;
};

type Actions = {
  setLocation: (location: Location) => void;
};

export const useLocationStore = create<State & Actions>()(
  immer((set) => ({
    currentLocation: DEFAULT_LOCATION,
    setLocation: (location: Location) =>
      set((state) => {
        state.currentLocation = location;
      }),
  }))
);
