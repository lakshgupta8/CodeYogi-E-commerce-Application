import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import CartRow from '../components/CartRow';
import { CartContext } from '../context/CartContext';
import { type Product } from '../types';

const mockProduct: Product = {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 7.17,
    rating: 4.94,
    stock: 5,
    tags: ['beauty', 'mascara'],
    brand: 'Essence',
    sku: 'RCH45Q1A',
    weight: 2,
    dimensions: { width: 23.17, height: 14.43, depth: 28.01 },
    warrantyInformation: '1 month warranty',
    shippingInformation: 'Ships in 1 month',
    availabilityStatus: 'Low Stock',
    reviews: [],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 24,
    meta: { createdAt: '2024-05-23T08:56:21.618Z', updatedAt: '2024-05-23T08:56:21.618Z', barcode: '9164035109868', qrCode: 'https://assets.dummyjson.com/public/qr-code.png' },
    images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'],
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    quantity: 2,
};

const mockCartContextValue = {
    cartItemsData: [mockProduct],
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
    title: 'Components/Cart/CartRow',
    component: CartRow,
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
} satisfies Meta<typeof CartRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        item: mockProduct,
    },
};
