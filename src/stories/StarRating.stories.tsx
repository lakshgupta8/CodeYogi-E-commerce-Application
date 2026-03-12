import type { Meta, StoryObj } from '@storybook/react-vite';
import StarRating from '../components/StarRating';

const meta = {
    title: 'Components/StarRating',
    component: StarRating,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ZeroStarts: Story = {
    args: {
        rating: 0,
    },
};

export const FullStars: Story = {
    args: {
        rating: 5,
    },
};

export const PartialStars: Story = {
    args: {
        rating: 3.5,
    },
};
