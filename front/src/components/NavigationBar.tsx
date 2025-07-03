import {Brain, Menu, X} from "lucide-react";
import {useState} from "react";

const NavigationBar = ({
        currentPage,
        setCurrentPage
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div
                            className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                            <Brain className="w-6 h-6 text-white"/>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Cancerna Lab Ecosystem</h1>
                            <p className="text-cyan-300 text-xs">iGEM NU KAZAKHSTAN 2025</p>
                        </div>
                    </div>

                    {/* Desktop NavigationBar */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => setCurrentPage('home')}
                            className={`text-white hover:text-cyan-400 transition-colors ${currentPage === 'home' ? 'text-cyan-400' : ''}`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => setCurrentPage('about')}
                            className={`text-white hover:text-cyan-400 transition-colors ${currentPage === 'about' ? 'text-cyan-400' : ''}`}
                        >
                            Technology
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage('trial');
                            }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                        >
                            Try Demo
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 space-y-4">
                        <button
                            onClick={() => {
                                setCurrentPage('home');
                                setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-white hover:text-cyan-400 transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage('about');
                                setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left text-white hover:text-cyan-400 transition-colors"
                        >
                            Technology
                        </button>
                        <button
                            onClick={() => {
                                setCurrentPage('trial');
                                setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                        >
                            Try Demo
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavigationBar;