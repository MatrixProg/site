import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  category: string;
}

export default function ToolCard({ title, description, icon, href, category }: ToolCardProps) {
  return (
    <div className="group hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-blue-300 rounded-lg bg-white">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {category}
              </span>
              <Link 
                href={href}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-transform"
              >
                Try it
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}