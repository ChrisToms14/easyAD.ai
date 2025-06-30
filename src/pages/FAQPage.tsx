import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ChevronDown, 
  Search, 
  HelpCircle,
  Zap,
  Shield,
  CreditCard,
  Settings,
  Users,
  BarChart3
} from 'lucide-react';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categories = [
    { name: 'All', icon: <HelpCircle className="h-5 w-5" /> },
    { name: 'Getting Started', icon: <Zap className="h-5 w-5" /> },
    { name: 'Billing', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Features', icon: <Settings className="h-5 w-5" /> },
    { name: 'Privacy', icon: <Shield className="h-5 w-5" /> },
    { name: 'Teams', icon: <Users className="h-5 w-5" /> },
    { name: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> }
  ];

  const faqs = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How does easyAD.ai work?',
      answer: 'easyAD.ai uses advanced AI models including GPT-4 for copywriting and DALL·E 3 for image generation. Simply provide information about your business and product, select your target platform, and our AI will generate compelling ad copy and visuals tailored to your needs.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'What platforms are supported?',
      answer: 'We support all major advertising platforms including Instagram, Facebook, LinkedIn, Twitter, Google Ads, and TikTok. Each platform has optimized templates and sizing to ensure your ads look perfect wherever they\'re displayed.'
    },
    {
      id: 3,
      category: 'Features',
      question: 'Can I customize the generated ads?',
      answer: 'Absolutely! While our AI generates high-quality ads automatically, you can edit the copy, adjust the tone, modify colors, and even regenerate specific elements until you\'re completely satisfied with the result.'
    },
    {
      id: 4,
      category: 'Features',
      question: 'What types of businesses can use easyAD.ai?',
      answer: 'easyAD.ai works for businesses of all sizes and industries - from e-commerce stores and SaaS companies to restaurants, fitness centers, and professional services. Our AI adapts to your specific industry and target audience.'
    },
    {
      id: 5,
      category: 'Billing',
      question: 'What\'s included in the free plan?',
      answer: 'The free plan includes 5 AI-generated ads per month, access to basic templates, standard image generation, and email support. It\'s perfect for trying out our platform and seeing the quality of our AI-generated content.'
    },
    {
      id: 6,
      category: 'Billing',
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades will take effect at the start of your next billing cycle. You\'ll always have access to your previously generated ads.'
    },
    {
      id: 7,
      category: 'Billing',
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied with easyAD.ai for any reason, contact our support team within 30 days of your purchase for a full refund.'
    },
    {
      id: 8,
      category: 'Privacy',
      question: 'How do you handle my business data?',
      answer: 'We take data privacy seriously. Your business information is encrypted and stored securely. We never share your data with third parties, and you can delete your account and all associated data at any time.'
    },
    {
      id: 9,
      category: 'Privacy',
      question: 'Who owns the generated ads?',
      answer: 'You own all the ads generated using easyAD.ai. Once created, you have full commercial rights to use, modify, and distribute the content however you see fit for your business.'
    },
    {
      id: 10,
      category: 'Teams',
      question: 'Can multiple team members use one account?',
      answer: 'Yes! Pro and Agency plans support team collaboration. You can invite team members, assign roles, and work together on ad campaigns. The Agency plan includes advanced team management features.'
    },
    {
      id: 11,
      category: 'Teams',
      question: 'Is there a limit to team members?',
      answer: 'The Pro plan supports up to 5 team members, while the Agency plan supports unlimited team members. Each team member gets their own login and can be assigned specific permissions.'
    },
    {
      id: 12,
      category: 'Analytics',
      question: 'Do you provide performance analytics?',
      answer: 'Yes! We provide detailed analytics including predicted engagement rates, click-through rates, and trending keywords. Pro and Agency plans include advanced reporting and A/B testing capabilities.'
    },
    {
      id: 13,
      category: 'Analytics',
      question: 'How accurate are the performance predictions?',
      answer: 'Our AI analyzes millions of successful ads and current market trends to provide predictions. While results can vary, our predictions typically have an 80-85% accuracy rate for engagement metrics.'
    },
    {
      id: 14,
      category: 'Features',
      question: 'Can I use my own brand colors and fonts?',
      answer: 'Yes! Pro and Agency plans allow you to upload your brand guidelines, including colors, fonts, and logos. Our AI will automatically incorporate your branding into all generated ads.'
    },
    {
      id: 15,
      category: 'Getting Started',
      question: 'How long does it take to generate an ad?',
      answer: 'Most ads are generated within 30-60 seconds. Complex requests with custom imagery might take up to 2-3 minutes. We\'ll show you a real-time progress indicator during generation.'
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about easyAD.ai and get the help you need
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-primary-500 to-violet-500 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="space-y-4"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:border-primary-500/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="px-2 py-1 bg-primary-500/20 text-primary-500 text-xs font-medium rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 border-t border-white/10">
                      <p className="text-gray-300 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-semibold mb-2 text-white">No results found</h3>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or browse different categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
            >
              Clear Search
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-violet-500 rounded-2xl mb-6">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our support team is here to help you get the most out of easyAD.ai.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-violet-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
              >
                Contact Support
              </motion.button>
              
              <button className="px-8 py-3 bg-white/5 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;