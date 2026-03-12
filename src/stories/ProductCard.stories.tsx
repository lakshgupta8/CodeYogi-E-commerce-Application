import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const meta = {
    title: 'Components/ProductCard',
    component: ProductCard,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ maxWidth: '300px' }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 1,
        title: 'Essence Mascara Lash Princess',
        category: 'beauty',
        price: 9.99,
        discountPercentage: 7.17,
        rating: 4.94,
        thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
        contextIdList: [{ id: 1 }, { id: 2 }, { id: 3 }],
    },
};
