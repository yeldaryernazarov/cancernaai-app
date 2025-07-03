import {Shield, TrendingUp, Zap} from "lucide-react";

const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
        <section className="pt-24 pb-12 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-white mb-6">Technology Overview</h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Deep dive into the advanced AI architecture powering Cancerna Lab Ecosystem
                    </p>
                </div>

                {/* Architecture Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">3D U-Net Architecture</h2>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Encoder-Decoder Design</h3>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Our 3D U-Net implements a sophisticated encoder-decoder architecture with skip connections,
                                    enabling precise volumetric segmentation of lung nodules from CT scans.
                                </p>
                                <ul className="space-y-2 list-disc list-inside">
                                    <li>Contracting path: 4 encoder blocks with 3D convolutions</li>
                                    <li>Expanding path: 4 decoder blocks with transposed convolutions</li>
                                    <li>Skip connections: Feature preservation across scales</li>
                                    <li>Attention mechanisms: Focus on relevant anatomical regions</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-white mb-4">Network Specifications</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Input Dimensions:</span>
                                    <span className="text-white">128×128×64 voxels</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Feature Channels:</span>
                                    <span className="text-white">32→64→128→256→512</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Parameters:</span>
                                    <span className="text-white">~31M trainable</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Activation:</span>
                                    <span className="text-white">ReLU + Batch Norm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Output:</span>
                                    <span className="text-white">Segmentation Mask</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fuzzy Logic Section */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Fuzzy Logic Integration</h2>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <div className="bg-purple-500/20 border border-purple-400 rounded-lg p-6">
                            <Zap className="w-8 h-8 text-purple-400 mb-3" />
                            <h3 className="text-xl font-semibold text-white mb-3">Membership Functions</h3>
                            <p className="text-gray-300 text-sm">
                                Triangular and trapezoidal functions define nodule characteristics:
                                size (5-30mm), density (-200 to +200 HU), and shape irregularity.
                            </p>
                        </div>

                        <div className="bg-cyan-500/20 border border-cyan-400 rounded-lg p-6">
                            <Shield className="w-8 h-8 text-cyan-400 mb-3" />
                            <h3 className="text-xl font-semibold text-white mb-3">Uncertainty Handling</h3>
                            <p className="text-gray-300 text-sm">
                                Confidence scoring and risk stratification with uncertainty bounds
                                for reliable clinical decision support.
                            </p>
                        </div>

                        <div className="bg-green-500/20 border border-green-400 rounded-lg p-6">
                            <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
                            <h3 className="text-xl font-semibold text-white mb-3">Risk Assessment</h3>
                            <p className="text-gray-300 text-sm">
                                Multi-factor fuzzy inference system combining imaging features
                                with clinical parameters for comprehensive risk evaluation.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Clinical Workflow */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Clinical Workflow Integration</h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">Automated Documentation</h3>
                                <p className="text-gray-300">Generate structured radiology reports with standardized terminology and quantitative measurements.</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">Treatment Recommendations</h3>
                                <p className="text-gray-300">AI-powered therapy selection based on nodule characteristics, staging, and patient factors.</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">Drug Compatibility Analysis</h3>
                                <p className="text-gray-300">Monitor medication interactions, dosage optimization, and side effect prediction.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Competition Advantages */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400 rounded-2xl p-8">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Competitive Advantages</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-yellow-400">Technical Innovation</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• First 3D U-Net with fuzzy logic in lung cancer detection</li>
                                <li>• Volumetric analysis vs traditional 2D approaches</li>
                                <li>• Real-time uncertainty quantification</li>
                                <li>• Temporal progression modeling</li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-orange-400">Clinical Impact</h3>
                            <ul className="space-y-2 text-gray-300">
                                <li>• 50% reduction in radiologist workload</li>
                                <li>• Early-stage detection improvement</li>
                                <li>• Global accessibility for underserved regions</li>
                                <li>• Integrated workflow automation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
);

export default AboutPage;