import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import userReducer from '../store/userSlice';

const makeStore = (isLoggedIn = false) => configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
    preloadedState: {
        cart: {
            cartItems: { '1': 5 },
            pendingQuantities: {},
            cartItemsData: [],
            loading: false,
            fetched: false,
        },
        user: {
            user: isLoggedIn ? { firstName: 'Test', email: 'test@example.com' } as any : null,
            token: isLoggedIn ? 'mock-token' : null,
            loading: false,
        }
    }
});

const meta = {
    title: 'Components/Navbar',
    component: Navbar,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Provider store={makeStore(false)}>
                    <Story />
                </Provider>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};

export const LoggedIn: Story = {
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Provider store={makeStore(true)}>
                    <Story />
                </Provider>
            </MemoryRouter>
        ),
    ]
};
