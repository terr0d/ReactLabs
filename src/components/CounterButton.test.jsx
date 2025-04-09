import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CounterButton from './CounterButton';

// Создаем мок для модуля counterSlice
vi.mock('../store/counterSlice', () => {
  return {
    increment: vi.fn(() => ({ type: 'counter/increment' })),
    decrement: vi.fn(() => ({ type: 'counter/decrement' }))
  };
});

const mockStore = configureStore([]);

describe('CounterButton Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      counter: { value: 5 }
    });
    store.dispatch = vi.fn();
    
    // Очищаем моки перед каждым тестом
    vi.clearAllMocks();
  });
  
  it('отображает текущее значение счетчика из стора', () => {
    render(
      <Provider store={store}>
        <CounterButton />
      </Provider>
    );
    
    expect(screen.getByTestId('counter-value')).toHaveTextContent('Счетчик: 5');
  });
  
  it('диспатчит increment при нажатии на кнопку "Увеличить"', () => {
    render(
      <Provider store={store}>
        <CounterButton />
      </Provider>
    );
    
    fireEvent.click(screen.getByTestId('increment-button'));
    
    // Проверяем, что dispatch был вызван с правильным действием
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'counter/increment' });
  });
  
  it('диспатчит decrement при нажатии на кнопку "Уменьшить"', () => {
    render(
      <Provider store={store}>
        <CounterButton />
      </Provider>
    );
    
    fireEvent.click(screen.getByTestId('decrement-button'));
    
    // Проверяем, что dispatch был вызван с правильным действием
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'counter/decrement' });
  });
  
  it('применяет переданные пропсы для стилизации кнопки', () => {
    render(
      <Provider store={store}>
        <CounterButton variant="outlined" color="success" />
      </Provider>
    );
    
    const incrementButton = screen.getByTestId('increment-button');
    expect(incrementButton).toHaveClass('MuiButton-outlinedSuccess');
  });
});