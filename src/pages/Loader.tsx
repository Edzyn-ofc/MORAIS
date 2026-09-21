interface Props {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function Loader({ size = 'md', fullScreen = false }: Props) {
  const sizes = {
    sm: { wrapper: 'w-6 h-6', ring: 'w-6 h-6 border-2', icon: 'text-sm' },
    md: { wrapper: 'w-12 h-12', ring: 'w-12 h-12 border-4', icon: 'text-2xl' },
    lg: { wrapper: 'w-20 h-20', ring: 'w-20 h-20 border-4', icon: 'text-4xl' },
  }[size];

  const content = (
    <div className={`relative ${sizes.wrapper} flex items-center justify-center`}>
      {/* Anel giratório */}
      <div
        className={`absolute ${sizes.ring} rounded-full border-brand-500 border-t-transparent animate-spin`}
      />
      {/* Ícone no centro */}
      <span className={`${sizes.icon} z-10`}>🌱</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center gap-4">
        <Loader size="lg" />
        <p className="text-white text-sm animate-pulse">A processar...</p>
      </div>
    );
  }

  return content;
}