import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import CartTotals from '../components/CartTotals';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: {
        cart: {
            cartItems: { '1': 2 },
            pendingQuantities: {},
            cartItemsData: [{ id: 1, price: 9.99 } as any],
            loading: false,
            fetched: false,
        }
    }
});

const meta = {
    title: 'Components/Cart/CartTotals',
    component: CartTotals,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Provider store={store}>
                    <Story />
                </Provider>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CartTotals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
