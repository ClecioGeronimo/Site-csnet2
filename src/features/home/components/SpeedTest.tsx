import React, { useState } from 'react';
import { Gauge, Download, Upload, RefreshCw, Globe, Wifi } from 'lucide-react';

function SpeedTest() {
  const [activeTest, setActiveTest] = useState<'minha-conexao' | 'speed-test' | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [progress, setProgress] = useState(0);

  const runSpeedTest = () => {
    setIsRunning(true);
    setProgress(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPing(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      // Simulate network metrics
      setDownloadSpeed(Math.random() * 100 + 50);
      setUploadSpeed(Math.random() * 50 + 25);
      setPing(Math.random() * 20 + 5);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setIsRunning(false);
        // Final results
        setDownloadSpeed(85.5);
        setUploadSpeed(42.3);
        setPing(12);
      }
    }, 100);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white" id="teste-velocidade">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Teste sua Velocidade</h2>
          <p className="text-gray-600 text-lg">
            Escolha uma das ferramentas abaixo para verificar sua conexão
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Minha Conexão */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
            activeTest === 'minha-conexao' ? 'ring-4 ring-orange-500' : 'hover:shadow-2xl'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Wifi className="w-8 h-8 text-orange-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Minha Conexão</h3>
                <p className="text-gray-600">Teste otimizado para clientes CSNET</p>
              </div>
            </div>

            {activeTest === 'minha-conexao' ? (
              <div className="space-y-6">
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="62"
                      cx="80"
                      cy="80"
                    />
                    <circle
                      className="text-orange-500 transition-all duration-300"
                      strokeWidth="8"
                      strokeDasharray={390}
                      strokeDashoffset={390 - (390 * progress) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="62"
                      cx="80"
                      cy="80"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-2xl font-bold text-gray-800">{progress}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Download</div>
                    <div className="text-xl font-bold text-gray-800">
                      {downloadSpeed.toFixed(1)}
                      <span className="text-sm text-gray-600 ml-1">Mbps</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Upload</div>
                    <div className="text-xl font-bold text-gray-800">
                      {uploadSpeed.toFixed(1)}
                      <span className="text-sm text-gray-600 ml-1">Mbps</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Ping</div>
                    <div className="text-xl font-bold text-gray-800">
                      {ping.toFixed(0)}
                      <span className="text-sm text-gray-600 ml-1">ms</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runSpeedTest}
                  disabled={isRunning}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all ${
                    isRunning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? 'Testando...' : 'Iniciar Teste'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTest('minha-conexao')}
                className="w-full py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
              >
                Selecionar
              </button>
            )}
          </div>

          {/* Speed Test */}
          <div className={`bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 ${
            activeTest === 'speed-test' ? 'ring-4 ring-blue-500' : 'hover:shadow-2xl'
          }`}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Globe className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Speed Test</h3>
                <p className="text-gray-600">Teste com servidores globais</p>
              </div>
            </div>

            {activeTest === 'speed-test' ? (
              <div className="space-y-6">
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-gray-200"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="62"
                      cx="80"
                      cy="80"
                    />
                    <circle
                      className="text-blue-500 transition-all duration-300"
                      strokeWidth="8"
                      strokeDasharray={390}
                      strokeDashoffset={390 - (390 * progress) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="62"
                      cx="80"
                      cy="80"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-2xl font-bold text-gray-800">{progress}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Download</div>
                    <div className="text-xl font-bold text-gray-800">
                      {downloadSpeed.toFixed(1)}
                      <span className="text-sm text-gray-600 ml-1">Mbps</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Upload</div>
                    <div className="text-xl font-bold text-gray-800">
                      {uploadSpeed.toFixed(1)}
                      <span className="text-sm text-gray-600 ml-1">Mbps</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Ping</div>
                    <div className="text-xl font-bold text-gray-800">
                      {ping.toFixed(0)}
                      <span className="text-sm text-gray-600 ml-1">ms</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={runSpeedTest}
                  disabled={isRunning}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white font-semibold transition-all ${
                    isRunning
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <RefreshCw className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
                  {isRunning ? 'Testando...' : 'Iniciar Teste'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTest('speed-test')}
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
              >
                Selecionar
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          * Os resultados podem variar dependendo de diversos fatores como: servidor escolhido, 
          horário do teste, dispositivo utilizado e outros fatores externos.
        </p>
      </div>
    </div>
  );
}

export default SpeedTest;