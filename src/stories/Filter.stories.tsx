import type { Meta, StoryObj } from '@storybook/react-vite';
import Filter from '../components/Filter';

const meta = {
    title: 'Components/Filter',
    component: Filter,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        onSearch: () => { },
        onSort: () => { },
    },
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        query: '',
        sort: 'default',
    },
};

export const WithQuery: Story = {
    args: {
        query: 'Coffee',
        sort: 'price-asc',
    },
};
