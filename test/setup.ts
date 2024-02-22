import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  cleanup();
});

const matchMediaMock = (query: any) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
});

vi.stubGlobal('matchMedia', matchMediaMock);

const googleMock = {
  maps: {
    event: {
      clearListeners: vi.fn(),
    },
    Marker: vi.fn().mockImplementation(() => ({
      setMap: vi.fn(),
      setOptions: vi.fn(),
      addListener: vi.fn(),
    })),
    Map: vi.fn().mockImplementation(() => ({
      addListener: vi.fn(),
    })),
  },
};

vi.stubGlobal('google', googleMock);

const { getComputedStyle } = window;
const getComputedStyleMock = (elt: any) => getComputedStyle(elt);

vi.stubGlobal('getComputedStyle', getComputedStyleMock);
