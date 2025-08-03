import { ArrowUpRight } from 'lucide-react'

interface SectionHeaderProps {
  title: string
  linkText?: string
  onLinkClick?: () => void
}

export default function HomeSectionHeader({
  title,
  linkText = 'Voir plus',
  onLinkClick,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 py-10">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <button
        onClick={onLinkClick}
        className="flex items-center text-sm font-semibold text-blue-700 hover:underline"
      >
        {linkText}
        <ArrowUpRight className="ml-1 w-4 h-4" />
      </button>
    </div>
  )
}
