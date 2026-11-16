const START_YEAR = 2025;

export default function FooterMain() {
    const year = new Date().getFullYear();
    const years = year > START_YEAR ? `${START_YEAR}-${year}` : `${START_YEAR}`;

    return (
        <footer className="mt-auto border-t border-white/20 bg-black/30 py-5 text-center backdrop-blur-md">
            <div className="text-sm font-medium text-gray-200 drop-shadow-md">
                <p>© {years} BeoBase.com. All rights reserved.</p>
                <p>Dev Lead: Bellamy Tran</p>
            </div>
        </footer>
    );
}