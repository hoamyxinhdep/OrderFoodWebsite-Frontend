
import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

export default function Header() {
  
    return (
        <div className="border-b-2 border-b-orange-500 py-6">
          <div className="mx-auto flex justify-between ml-7">
            <Link
              to="/"
              className="text-3xl font-bold tracking-tight text-orange-500 "
            >
              OrderFood
            </Link>
            <div className="md:hidden">
              <MobileNav />
          </div>
            <div className="hidden md:block mr-10">
              <MainNav />
            </div>
          </div>
        </div>
      );
  
}
