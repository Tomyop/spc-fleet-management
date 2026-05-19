import Image from 'next/image'

export default function Logo({ size = 'md', showText = false }: { size?: 'sm' | 'md' | 'lg' | 'xl'; showText?: boolean }) {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 60, height: 60 },
    lg: { width: 80, height: 80 },
    xl: { width: 144, height: 144 }
  }

  const textSize = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative transition-transform duration-300 group-hover:scale-110">
        <Image
          src="/logo/logo.png"
          alt="SPC Logo"
          width={sizes[size].width}
          height={sizes[size].height}
          className="object-contain"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-blue-400 ${textSize[size]}`}>شركة الوقاية الأمنية</span>
          <span className={`font-semibold text-white ${textSize[size]}`}>SPC</span>
        </div>
      )}
    </div>
  )
}
