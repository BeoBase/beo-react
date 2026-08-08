import AppLink from "../ui/AppLink.tsx";

export default function NavbarMain() {
  
  return (
    <>
      <nav className="flex items-center justify-between border-b px-4 py-3">
        
        {/* Left - Brand and Logo */}
        <AppLink to="/" className="text-2xl font-bold tracking-wide">
          Beo Base
        </AppLink>
        
        {/* Middle - Main Navigation */}
        <div className="flex items-center gap-6">
          <AppLink to="/">Home</AppLink>
          <AppLink to="/portfolio">Portfolio</AppLink>
        </div>
        
        {/* Right - Actions */}
        <div className="flex items-center gap-6">
          <AppLink to="/login">Log In / Profile</AppLink>
        </div>
      </nav>
    </>
  );
  
}