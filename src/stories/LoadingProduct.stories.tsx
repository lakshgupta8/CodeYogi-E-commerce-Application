import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import LoadingProduct from '../components/LoadingProduct';

const meta = {
    title: 'Components/LoadingProduct',
    component: LoadingProduct,
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
} satisfies Meta<typeof LoadingProduct>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
