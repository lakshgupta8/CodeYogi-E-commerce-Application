import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const mockCartContextValue = {
    cartItemsData: [],
    loading: false,
    count: 5,
    subtotal: 100,
    cartItems: {},
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    updateCart: () => { },
    getItemSubtotal: () => 0,
    resetPendingQuantities: () => { },
};

const mockUserContextValue = {
    user: null,
    token: null,
    isLoggedIn: false,
    loading: false,
    login: () => { },
    logout: () => { },
};

const meta = {
    title: 'Components/Navbar',
    component: Navbar,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <UserContext.Provider value={mockUserContextValue}>
                    <CartContext.Provider value={mockCartContextValue}>
                        <Story />
                    </CartContext.Provider>
                </UserContext.Provider>
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
                <UserContext.Provider value={{ ...mockUserContextValue, isLoggedIn: true }}>
                    <CartContext.Provider value={mockCartContextValue}>
                        <Story />
                    </CartContext.Provider>
                </UserContext.Provider>
            </MemoryRouter>
        ),
    ]
};
