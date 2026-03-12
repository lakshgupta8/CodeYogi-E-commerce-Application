import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
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
    meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
    images: ['https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png'],
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
};

const mockProduct2: Product = {
    ...mockProduct,
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    price: 19.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png',
};

const mockProduct3: Product = {
    ...mockProduct,
    id: 3,
    title: 'Powder Canister',
    price: 14.99,
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png',
};

const mockProducts = [mockProduct, mockProduct2, mockProduct3];
const idList = mockProducts.map(p => ({ id: p.id }));

const meta = {
    title: 'Components/ProductGrid',
    component: ProductGrid,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProductGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        products: mockProducts,
        idList,
    },
};

export const Empty: Story = {
    args: {
        products: [],
        idList: [],
    },
};
