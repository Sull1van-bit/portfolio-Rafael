export const Home = () =>  {
    return <section id="home" className="min-h-screen flex items-center justify-center relative">
        <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent leading-right">Hi, I'm Rafael!</h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">I'm an enthusiastic 1st-year Computer Science student at Universitas Multimedia Nusantara with a keen interest in AI, machine learning, deep learning, and reinforcement learning. Eager to leverage theoretical knowledge and hands-on projects to contribute to innovative AI solutions.</p>
            <div className="flex justify-center space-x-4">
                <a href="#projects" className="bg-blue-500 text-white py-4 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow[0_0_15px_rgba(59, 130, 246, 0.4)]">View projects</a>
                <a href="#contact" className="border border-blue-500/50 text-blue-500 py-4 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10">Contact me</a>
            </div>
        </div>
    </section>
}