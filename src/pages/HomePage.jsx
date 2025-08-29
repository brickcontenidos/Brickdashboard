import React from 'react';

        const HomePage = () => (
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-800 text-white font-sans flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                BRICK
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light mb-2">
                Constructora Audiovisual
              </p>
              <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
                Herramientas de gestión y producción para el equipo de BRICK.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <button
                  className="group bg-gradient-to-r from-[#E63946] to-red-600 text-white font-bold py-6 px-6 rounded-2xl text-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">📅</span>
                    <span>Calendario</span>
                  </div>
                </button>
                <button
                  className="group bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-6 px-6 rounded-2xl text-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">📦</span>
                    <span>Paquetes</span>
                  </div>
                </button>
                <button
                  className="group bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-6 px-6 rounded-2xl text-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">🏢</span>
                    <span>Marcas</span>
                  </div>
                </button>
                <button
                  className="group bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-6 px-6 rounded-2xl text-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-2xl">❓</span>
                    <span>Quiz</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        );

        export default HomePage;
        
