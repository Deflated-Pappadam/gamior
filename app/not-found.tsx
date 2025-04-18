import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#f8f5f2]">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center text-center min-h-screen ">
        <h1 className="text-lg font-semibold text-gray-600">OH THIS IS AWKWARD!</h1>
        <h2 className="mt-2 text-4xl font-bold text-gray-800">Page Not Found</h2>

        <div className="relative mt-8 pointer-events-none select-none">
          <div className="text-[20vw] font-extrabold text-gray-200 leading-none">
            <span className=" bg-cover bg-center text-transparent bg-clip-text" style={{ backgroundImage: 'url(/carousal.jpg)' }}>
              404
            </span>
          </div>
        </div>

        <p className="mt-4 text-base text-gray-600">
          Oops! Looks like you`ve taken a wrong turn.
        </p>

        <a href="/">
          <a className="mt-6 inline-block rounded-md bg-gray-800 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-gray-700">
            Navigate back to our homepage
          </a>
        </a>
      </main>

      <Footer />
    </div>
  );
}
