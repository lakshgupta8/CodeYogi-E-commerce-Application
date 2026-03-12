import type { Meta, StoryObj } from '@storybook/react-vite';
import NoMatch from '../components/NoMatch';

const meta = {
    title: 'Components/NoMatch',
    component: NoMatch,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof NoMatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        searchQuery: 'Unknown Product',
        onClearSearch: () => console.log('Clear search clicked'),
    },
};
