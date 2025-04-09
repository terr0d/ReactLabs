// src/test/setup.js
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Расширяем матчеры Vitest матчерами testing-library
expect.extend(matchers);

// Очищаем после каждого теста
afterEach(() => {
  cleanup();
});