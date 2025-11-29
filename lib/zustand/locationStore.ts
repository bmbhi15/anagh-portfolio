import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Location, ROOT_LOCATION } from "../constants";

const DEFAULT_LOCATION = ROOT_LOCATION[1];

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
