import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { IconCart, IconMapPin, IconPhone, IconMail, IconWhatsApp } from './Icons';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, role, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    toast.success('Sessão terminada.');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-cream-50/80 border-b border-brand-100/70">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2.5">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Morais Comercial LDA"
              className="w-14 h-14 md:w-16 md:h-16 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <span className="hidden md:block font-display font-bold text-brand-800 leading-tight">
              <span className="block text-lg">Morais</span>
              <span className="block text-xs text-gold-600 font-semibold tracking-wider uppercase">Comercial Lda</span>
            </span>
          </Link>

          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-ink-800">
            <a href="/#sobre" className="relative hover:text-brand-700 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">
              Sobre
            </a>
            <a href="/#produtos" className="relative hover:text-brand-700 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">
              Produtos
            </a>
            <a href="/#servicos" className="relative hover:text-brand-700 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">
              Serviços
            </a>
            <a href="/#lojas" className="relative hover:text-brand-700 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">
              Lojas
            </a>
            <a href="/#contactos" className="relative hover:text-brand-700 transition-colors py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-600 after:transition-all hover:after:w-full">
              Contactos
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/checkout" className="relative p-2.5 hover:bg-brand-100 rounded-full transition-all duration-300 hover:scale-110">
              <IconCart className="w-5 h-5 text-ink-800" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md ring-2 ring-cream-50">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <>
                {role === 'admin' && (
                  <Link to="/admin" className="bg-gold-400 hover:bg-gold-500 text-ink-900 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg">
                    Painel
                  </Link>
                )}
                <button onClick={handleLogout} className="bg-clay-500 hover:bg-clay-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                  Sair
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-700/30">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 relative">{children}</main>

      <footer className="relative bg-brand-900 text-cream-100 overflow-hidden">
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white rounded-xl p-2 shadow-lg">
                <img src="/logo.png" alt="Morais Comercial" className="w-12 h-12 object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-cream-50 font-display text-xl">Morais Comercial Lda</h3>
                <p className="text-xs text-gold-300 tracking-wider uppercase font-semibold">
                  Agronegócio · Sementes · Insumos
                </p>
              </div>
            </div>
            <p className="text-cream-200/75 leading-relaxed max-w-md">
              Empresa moçambicana de agronegócio com mais de 15 anos de experiência,
              especializada em sementes melhoradas, insumos agrícolas e assistência técnica.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gold-300 mb-4 tracking-wider uppercase text-xs">
              Lojas
            </h4>
            <ul className="space-y-3 text-cream-200/80">
              <li className="flex items-start gap-2">
                <IconMapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Av. Do Trabalho nº 3250, Nampula</span>
              </li>
              <li className="flex items-start gap-2">
                <IconMapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Pemba</span>
              </li>
              <li className="flex items-start gap-2">
                <IconMapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Chimoio</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gold-300 mb-4 tracking-wider uppercase text-xs">
              Contactos
            </h4>
            <ul className="space-y-3 text-cream-200/80">
              <li className="flex items-center gap-2">
                <IconPhone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>+258 84 000 0000</span>
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>geral@morais.co.mz</span>
              </li>
              <li className="flex items-center gap-2">
                <IconWhatsApp className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>WhatsApp disponível</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-brand-800 text-center py-5 text-xs text-cream-200/50 tracking-wide">
          © {new Date().getFullYear()} Morais Comercial Lda — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}