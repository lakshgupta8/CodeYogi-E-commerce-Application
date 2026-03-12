import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import EmptyCart from '../components/EmptyCart';

const meta = {
    title: 'Components/Cart/EmptyCart',
    component: EmptyCart,
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
} satisfies Meta<typeof EmptyCart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
