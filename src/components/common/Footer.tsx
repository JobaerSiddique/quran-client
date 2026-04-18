export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-12">
      <div className="grid grid-flow-col gap-4">
        <a className="link link-hover">About</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Privacy Policy</a>
        <a className="link link-hover">API</a>
      </div>
      <div>
        <p>Copyright © {new Date().getFullYear()} - Quran App</p>
        <p className="text-xs text-base-content/50 mt-2">
          Quran data provided by AlQuran Cloud API
        </p>
      </div>
    </footer>
  );
}
