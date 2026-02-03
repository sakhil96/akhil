import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 600 }}>
          404
        </div>
        <h1 className="heading-md" style={{ marginTop: '1rem' }}>
          Page not found
        </h1>
        <p className="text-muted text-small" style={{ marginTop: '0.5rem' }}>
          The signal trail ends here. Head back to the control room.
        </p>
        <Link
          href="/"
          className="btn btn--ghost"
          style={{ marginTop: '1.5rem' }}
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

