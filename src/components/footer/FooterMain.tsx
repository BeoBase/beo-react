
export default function FooterMain() {
  return (
    <footer className="w-full border-t border-gray-200 py-5 text-center mt-auto backdrop-blur-xs">
      <p className="text-sm font-medium text-gray-200 drop-shadow-md">
        © {new Date().getFullYear()} BeoBase.com. All rights reserved.
        <br />
        Author: Bellamy Phan
      </p>
    </footer>
  );
}