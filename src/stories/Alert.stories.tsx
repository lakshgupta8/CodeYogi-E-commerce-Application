import type { Meta, StoryObj } from '@storybook/react-vite';
import Alert from '../components/Alert';

const meta = {
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        type: 'info',
        message: 'This is an informative message.',
        fading: false,
    },
};

export const Success: Story = {
    args: {
        type: 'success',
        message: 'Operation completed successfully!',
        fading: false,
    },
};

export const Warning: Story = {
    args: {
        type: 'warning',
        message: 'Please proceed with caution.',
        fading: false,
    },
};

export const Error: Story = {
    args: {
        type: 'error',
        message: 'An error occurred during the operation.',
        fading: false,
    },
};

export const Fading: Story = {
    args: {
        type: 'info',
        message: 'This message will fade out.',
        fading: true,
    },
};
