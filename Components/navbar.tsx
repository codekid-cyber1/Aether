import { Bell, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <header className="aether-header">
      <div className="aether-logo">
        <span className="aether-logo-icon">⊗</span>
        <span className="aether-logo-text">AETHER</span>
      </div>

      <nav className="aether-nav">
        <a href="#" className="aether-nav-link aether-nav-link--active">Designs</a>
        <a href="#" className="aether-nav-link">Gallery</a>
        <a href="#" className="aether-nav-link">Market</a>
        <a href="#" className="aether-nav-link">Profile</a>
      </nav>

      <div className="aether-header-actions">
        <button className="aether-icon-btn" aria-label="Notifications">
          <Bell size={14} />
        </button>
        <button className="aether-icon-btn" aria-label="Cart">
          <ShoppingCart size={14} />
        </button>
        <div className="aether-avatar" aria-label="User avatar" />
      </div>
    </header>
  );
}