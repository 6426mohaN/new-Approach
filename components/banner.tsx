import React from 'react'
import { AlertTriangle, CheckCircleIcon } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const bannerVariants = cva(
    'flex items-center w-full p-4 text-center border',
    {
        variants: {
            variant: {
                //default: 'bg-slate-100 border-slate-200 text-slate-700',
                success: 'bg-emerald-100 border-emerald-200 text-emerald-700',
                warning: 'bg-rose-100 border-rose-200 text-rose-700',
            },
    },
    defaultVariants: {
        variant: 'warning',
    },
    
}
)

interface BannerProps extends VariantProps<typeof bannerVariants> {
    label: string
};

const iconMap = {
    success: CheckCircleIcon,
    warning: AlertTriangle ,
}

const banner = ({
    label,
    variant

}: BannerProps) => {
    const Icon = iconMap[variant || "warning"]


  return (
    <div className={cn(bannerVariants({variant}))}>
        <Icon className=' h-4 w-4 mr-2' />
        {label}
      
    </div>
  )
}

export default banner
