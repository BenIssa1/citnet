interface TagProps {
    children: React.ReactNode;
    variant?: 'design' | 'research' | 'presentation' | 'mindset' | 'technology';
    className?: string;
}

export default function Tag({ children, variant = 'design', className = '' }: TagProps) {
    const getTagClasses = () => {
        const baseClasses = 'px-4 py-1 rounded-full text-sm font-medium';
        
        switch (variant) {
            case 'design':
                return `${baseClasses} bg-red-100 text-red-600`;
            case 'research':
                return `${baseClasses} bg-green-100 text-green-700`;
            case 'presentation':
                return `${baseClasses} bg-yellow-100 text-yellow-700`;
            case 'mindset':
                return `${baseClasses} bg-purple-100 text-purple-700`;
            case 'technology':
                return `${baseClasses} bg-blue-100 text-blue-800`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-700`;
        }
    };

    return (
        <span className={`${getTagClasses()} ${className}`}>
            {children}
        </span>
    );
} 