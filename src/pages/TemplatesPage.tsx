import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  Twitter, 
  Search,
  Filter,
  ArrowRight,
  Eye,
  Download
} from 'lucide-react';

const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = ['All', 'Instagram', 'Facebook', 'LinkedIn', 'Twitter', 'Google Ads'];

  const templates = [
    {
      id: 1,
      name: 'Modern Product Showcase',
      category: 'Instagram',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Instagram className="h-5 w-5" />,
      color: 'from-pink-500 to-purple-500',
      description: 'Perfect for showcasing products with modern aesthetics'
    },
    {
      id: 2,
      name: 'Professional Service Ad',
      category: 'LinkedIn',
      platform: 'LinkedIn',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'from-blue-600 to-blue-700',
      description: 'Ideal for B2B services and professional offerings'
    },
    {
      id: 3,
      name: 'Event Promotion',
      category: 'Facebook',
      platform: 'Facebook',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Facebook className="h-5 w-5" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Great for promoting events and gatherings'
    },
    {
      id: 4,
      name: 'Quick Announcement',
      category: 'Twitter',
      platform: 'Twitter',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Twitter className="h-5 w-5" />,
      color: 'from-sky-400 to-sky-500',
      description: 'Perfect for quick updates and announcements'
    },
    {
      id: 5,
      name: 'Luxury Brand Campaign',
      category: 'Instagram',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Instagram className="h-5 w-5" />,
      color: 'from-pink-500 to-purple-500',
      description: 'Sophisticated design for premium brands'
    },
    {
      id: 6,
      name: 'Tech Startup Pitch',
      category: 'LinkedIn',
      platform: 'LinkedIn',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Linkedin className="h-5 w-5" />,
      color: 'from-blue-600 to-blue-700',
      description: 'Modern template for tech companies and startups'
    },
    {
      id: 7,
      name: 'Community Engagement',
      category: 'Facebook',
      platform: 'Facebook',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Facebook className="h-5 w-5" />,
      color: 'from-blue-500 to-blue-600',
      description: 'Designed to boost community interaction'
    },
    {
      id: 8,
      name: 'Trending Topic',
      category: 'Twitter',
      platform: 'Twitter',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Twitter className="h-5 w-5" />,
      color: 'from-sky-400 to-sky-500',
      description: 'Jump on trending topics with style'
    },
    {
      id: 9,
      name: 'Food & Restaurant',
      category: 'Instagram',
      platform: 'Instagram',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: <Instagram className="h-5 w-5" />,
      color: 'from-pink-500 to-purple-500',
      description: 'Appetizing designs for food businesses'
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ad Templates Gallery
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from professionally designed templates optimized for different platforms and industries
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-violet-500 text-white'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Templates Grid */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden hover:border-primary-500/30 transition-all duration-300">
                {/* Template Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <button className="flex items-center space-x-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-white/30 transition-colors">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 bg-primary-500/80 backdrop-blur-sm rounded-lg text-white text-sm hover:bg-primary-500 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Use</span>
                      </button>
                    </div>
                  </div>

                  {/* Platform Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`flex items-center space-x-2 px-3 py-1 bg-gradient-to-r ${template.color} rounded-full text-white text-sm`}>
                      {template.icon}
                      <span>{template.platform}</span>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-500 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>
                  
                  <Link to="/generate">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-violet-500/20 border border-primary-500/30 text-primary-500 rounded-lg hover:bg-gradient-to-r hover:from-primary-500 hover:to-violet-500 hover:text-white transition-all duration-300 group">
                      <span>Generate With This Layout</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-violet-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2 text-white">No templates found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Don't See What You Need?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Our AI can create custom templates based on your specific requirements and brand guidelines
            </p>
            
            <Link to="/generate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-full shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <span>Create Custom Template</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplatesPage;