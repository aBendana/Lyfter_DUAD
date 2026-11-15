import './AdminPageHeader.css';

interface AdminPageHeaderProps {
  title: string;
  description: string;
}

// same header for every admin sub-route
export function AdminPageHeader({ title, description }: AdminPageHeaderProps) {
  return (
    <header className="admin-page-header">
      <p className="admin-page-header__eyebrow">---Admin---</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
