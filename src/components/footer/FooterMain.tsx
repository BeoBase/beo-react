
export default function FooterMain() {
  return (
    <footer className="w-full border-t border-gray-200 py-5 text-center mt-auto">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} BeoBase.com. All rights reserved.
        <br />
        Author: Bellamy Phan
      </p>
    </footer>
  );
}