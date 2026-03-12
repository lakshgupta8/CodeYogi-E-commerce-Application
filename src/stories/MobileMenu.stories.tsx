import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import MobileMenu from '../components/MobileMenu';

const meta = {
    title: 'Components/MobileMenu',
    component: MobileMenu,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        isOpen: true,
        onClose: () => console.log('Close clicked'),
        navLinks: [
            { name: 'HOME', to: '/home' },
            { name: 'ALL PRODUCTS', to: '/' },
            { name: 'ABOUT', to: '/about' },
            { name: 'CONTACT', to: '/contact' },
        ],
        location: {
            key: 'default',
            pathname: '/',
            search: '',
            hash: '',
            state: null,
        },
        count: 3,
    },
};
