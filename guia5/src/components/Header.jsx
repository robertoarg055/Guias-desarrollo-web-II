import { Link, useLocation } from 'react-router'
import SearchForm from './SearchForm'
export default function Header() {
        const {pathname} = useLocation()
        const isHome = pathname === '/'
    return (
        <header className={isHome? "bg-[url('/bg.jpg')] bg-center bg-cover" : "bg-slate-800"}>
                <div className="mx-auto container px-5 py-16">
                    <div className="flex justify-between items-center">
                        <div>
                            <img src="logo.svg" alt="lonamgotipo" className="w-32" />
                        </div>
                        <nav className='flex gap-4'>
                            <Link to="/" className='text-white uppercase font-bold'>Inicio</Link>
                            <Link to="/favoritos" className='text-white uppercase font-bold'>Favoritos</Link>
                        </nav>
                    </div>
                    {isHome && (
                        <SearchForm />
                    )}
                </div>            
            </header>
        
    )
}
