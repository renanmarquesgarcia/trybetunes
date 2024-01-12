import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import './Layout.css';

function Layout() {
  return (
    <section className="layout__container">
      <Header />
      <Outlet />
    </section>
  );
}

export default Layout;
