import type { Meta, StoryObj } from '@storybook/react-vite';
import Input from '../components/Input';

const meta = {
    title: 'Components/Input',
    component: Input,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {
    args: {
        id: 'email',
        name: 'email',
        placeholder: 'Email address',
        type: 'email',
    },
};

export const Password: Story = {
    args: {
        id: 'password',
        name: 'password',
        placeholder: 'Password',
        type: 'password',
    },
};

export const Search: Story = {
    args: {
        id: 'search',
        name: 'search',
        placeholder: 'Search products',
        type: 'text',
    },
};

export const WithError: Story = {
    args: {
        id: 'name',
        name: 'Name',
        placeholder: 'Full Name',
        type: 'text',
        touched: true,
        error: 'Name is required',
    },
};
