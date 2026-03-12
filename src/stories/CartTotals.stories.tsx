import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import CartTotals from '../components/CartTotals';
import { CartContext } from '../context/CartContext';

const mockCartContextValue = {
    cartItemsData: [],
    loading: false,
    count: 2,
    subtotal: 19.98,
    cartItems: { '1': 2 },
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    updateCart: () => { },
    getItemSubtotal: (price: number, quantity: number) => price * quantity,
    resetPendingQuantities: () => { },
};

const meta = {
    title: 'Components/Cart/CartTotals',
    component: CartTotals,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <CartContext.Provider value={mockCartContextValue}>
                    <Story />
                </CartContext.Provider>
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
