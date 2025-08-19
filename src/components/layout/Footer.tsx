

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="text-sm text-neutral-400">
          © {new Date().getFullYear()} Stampinator. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <a href="#" className="hover:text-neutral-200">Terms</a>
          <a href="#" className="hover:text-neutral-200">Privacy</a>
          <a href="#" className="hover:text-neutral-200">Support</a>
        </div>
      </div>
    </footer>
  );
}
