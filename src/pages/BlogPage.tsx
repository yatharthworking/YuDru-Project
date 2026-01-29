import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User, Tag } from "lucide-react";
import labFacility from "@/assets/lab-facility.jpg";
import trainingSession from "@/assets/training-session.jpg";
import droneSurveillance from "@/assets/drone-surveillance.jpg";
import dronePayload from "@/assets/drone-payload.jpg";
import droneSoccer from "@/assets/drone-soccer.jpg";

const featuredPost = {
  id: "1",
  title: "The Future of Indigenous Drone Technology in India",
  excerpt: "Explore how India is leading the charge in developing self-reliant drone solutions for defense, agriculture, and industrial applications.",
  image: labFacility,
  date: "January 20, 2026",
  readTime: "8 min read",
  author: "YuDru Research Team",
  category: "Innovation",
};

const blogPosts = [
  {
    id: "2",
    title: "5 Key Applications of Surveillance Drones in Industrial Monitoring",
    excerpt: "Discover how monitoring drones are transforming industrial inspection, infrastructure assessment, and environmental surveys.",
    image: droneSurveillance,
    date: "January 15, 2026",
    readTime: "6 min read",
    author: "Technical Team",
    category: "Industry Insights",
  },
  {
    id: "3",
    title: "Drone Pilot Training: What You Need to Know Before Getting Started",
    excerpt: "A comprehensive guide to drone pilot certification, training programs, and the skills required to become a professional drone operator.",
    image: trainingSession,
    date: "January 10, 2026",
    readTime: "7 min read",
    author: "Training Academy",
    category: "Training",
  },
  {
    id: "4",
    title: "Heavy-Lift Logistics Drones: Revolutionizing Last-Mile Delivery",
    excerpt: "Learn how drones with 5kg to 100kg payload capacity are changing logistics, disaster relief, and medical supply chains.",
    image: dronePayload,
    date: "January 5, 2026",
    readTime: "5 min read",
    author: "Logistics Division",
    category: "Technology",
  },
  {
    id: "5",
    title: "Sports Analytics: How Drones Are Changing the Game",
    excerpt: "From live aerial coverage to real-time player tracking, sports drones are providing unprecedented insights for teams and broadcasters.",
    image: droneSoccer,
    date: "December 28, 2025",
    readTime: "4 min read",
    author: "Sports Tech Team",
    category: "Sports",
  },
];

const categories = ["All", "Innovation", "Industry Insights", "Training", "Technology", "Sports"];

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Drone Technology Insights & Updates | YuDru</title>
        <meta 
          name="description" 
          content="Stay updated with the latest in indigenous drone technology, industry insights, training updates, and innovation news from YuDru." 
        />
        <meta name="keywords" content="drone blog, drone technology, drone news, indigenous drones, drone training, drone industry" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24">
          {/* Hero */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 tech-dots opacity-20" />
            <div className="container mx-auto px-4 md:px-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-3xl mx-auto mb-12"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-sm font-display font-medium text-primary mb-6">
                  <Tag className="w-4 h-4" />
                  Insights & Updates
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  YuDru <span className="text-gradient">Blog</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Stay informed with the latest developments in drone technology, industry trends, 
                  and insights from our research and development team.
                </p>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 md:gap-3"
              >
                {categories.map((category, index) => (
                  <button
                    key={category}
                    className={`px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      index === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Featured Post */}
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card overflow-hidden group"
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent lg:bg-gradient-to-r" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4 w-fit">
                      {featuredPost.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        {featuredPost.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <Button variant="hero" size="lg" className="w-fit" asChild>
                      <Link to="/contact">
                        Read Article
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>

          {/* Blog Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between mb-12"
              >
                <h2 className="font-display text-2xl md:text-3xl font-bold">
                  Latest Articles
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card overflow-hidden group hover-glow"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Load More */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Button variant="heroOutline" size="lg">
                  Load More Articles
                </Button>
              </motion.div>
            </div>
          </section>

          {/* Newsletter CTA */}
          <section className="py-24 bg-card">
            <div className="container mx-auto px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Subscribe to receive the latest drone technology insights, product updates, 
                  and industry news directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <Button variant="hero" size="lg">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPage;
