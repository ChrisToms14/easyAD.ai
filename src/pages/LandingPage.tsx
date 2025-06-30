import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Zap, 
  Target, 
  TrendingUp, 
  Image, 
  Type, 
  BarChart3,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

const LandingPage = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const features = [
    {
      icon: <Type className="h-8 w-8" />,
      title: "AI-Powered Copy",
      description: "Generate compelling ad copy that converts using advanced GPT-4 technology"
    },
    {
      icon: <Image className="h-8 w-8" />,
      title: "Visual Generation",
      description: "Create stunning visuals with DALL·E 3 and Replicate's advanced AI models"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Market Insights",
      description: "Leverage real-time trend data to optimize your ad performance"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Multi-Platform",
      description: "Generate ads optimized for Instagram, Facebook, LinkedIn, and more"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Performance Tracking",
      description: "Monitor and analyze your ad performance with built-in analytics"
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Smart Templates",
      description: "Choose from professionally designed templates that adapt to your brand"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary-500/30 to-violet-500/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/30 to-sky-500/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-sky-500/30 to-primary-500/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500/20 to-violet-500/20 backdrop-blur-sm border border-primary-500/30 rounded-full text-sm font-medium mb-8"
            >
              <Zap className="h-4 w-4 mr-2 text-primary-500" />
              AI-Powered Advertisement Generation
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-white via-primary-100 to-violet-200 bg-clip-text text-transparent leading-tight">
              Effortless Ads,
              <br />
              <span className="bg-gradient-to-r from-primary-500 to-violet-500 bg-clip-text text-transparent">
                Intelligently Generated
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business with AI-powered advertisements. Generate compelling copy, 
              stunning visuals, and strategic insights in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/generate">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-full shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Start Generating</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/templates">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  View Templates
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-gray-400"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful AI Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to create professional advertisements that drive results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="h-full p-8 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl hover:border-primary-500/30 transition-all duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500/20 to-violet-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-primary-500">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary-500 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-violet-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of businesses already using easyAD.ai to create compelling advertisements that convert.
            </p>
            
            <Link to="/generate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-full shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>Get Started Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;