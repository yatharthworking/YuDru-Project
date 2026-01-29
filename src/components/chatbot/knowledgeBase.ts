// Comprehensive knowledge base for SkyPilot chatbot

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
  priority?: number; // Higher priority = checked first
}

export const knowledgeBase: KnowledgeEntry[] = [
  // Greetings
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"],
    response: "Hello! 👋 I'm SkyPilot, your YuDru drone assistant. How can I help you today? Feel free to ask about our drones, training programs, or any other services!",
    priority: 10
  },
  {
    keywords: ["thanks", "thank you", "appreciate", "helpful"],
    response: "You're welcome! 😊 Is there anything else I can help you with regarding our drone solutions?",
    priority: 10
  },
  {
    keywords: ["bye", "goodbye", "see you", "later"],
    response: "Goodbye! 👋 Thank you for chatting with SkyPilot. Feel free to reach out anytime you need assistance with drone solutions!",
    priority: 10
  },

  // Company Information
  {
    keywords: ["who are you", "what is yudru", "about yudru", "company", "about company", "tell me about"],
    response: "YuDru is India's leading indigenous drone technology company. We design, develop, and manufacture cutting-edge drones for logistics, surveillance, agriculture, defense, and more. All our drones are 100% Made in India with zero Chinese components! 🇮🇳",
    priority: 9
  },
  {
    keywords: ["location", "where", "office", "address", "headquarter", "based"],
    response: "YuDru is headquartered in India. For our exact office locations and visiting hours, please check our Contact page or reach out to us directly through our contact form.",
    priority: 8
  },
  {
    keywords: ["founded", "when", "started", "established", "history"],
    response: "YuDru has been pioneering indigenous drone technology for over 5 years, focusing on R&D and innovation. Our journey started with a vision to make India self-reliant in drone technology.",
    priority: 7
  },

  // Made in India / Indigenous
  {
    keywords: ["india", "indian", "indigenous", "swadeshi", "make in india", "made in india", "chinese", "china", "foreign"],
    response: "Yes! All YuDru drones are 100% indigenous and Made in India 🇮🇳. We use zero Chinese components, ensuring complete self-reliance and national security compliance. Our drones meet all government requirements for indigenous manufacturing.",
    priority: 9
  },
  {
    keywords: ["atmanirbhar", "self reliant", "domestic"],
    response: "YuDru is committed to Atmanirbhar Bharat! All our drones are indigenously designed and manufactured in India with zero dependency on Chinese components. We're proud to contribute to India's self-reliance in drone technology! 🇮🇳",
    priority: 9
  },

  // Products - General
  {
    keywords: ["products", "drones", "offerings", "what do you sell", "catalog", "range"],
    response: "We offer a comprehensive range of drones:\n\n🔹 **Surveillance Drones** - For security & monitoring\n🔹 **Logistics Drones** - For delivery & transportation\n🔹 **Sports Drones** - For events & entertainment\n🔹 **Agricultural Drones** - For crop monitoring & spraying\n🔹 **Industrial Drones** - For inspection & mapping\n\nVisit our Products page for detailed specifications!",
    priority: 9
  },
  {
    keywords: ["surveillance", "security", "monitoring", "patrol", "watch"],
    response: "Our Surveillance Drones are designed for security and monitoring applications. Features include:\n\n✅ HD/4K cameras with night vision\n✅ Real-time video streaming\n✅ Long endurance flights\n✅ AI-powered threat detection\n✅ Weather-resistant design\n\nPerfect for border security, industrial monitoring, and event surveillance!",
    priority: 8
  },
  {
    keywords: ["logistics", "delivery", "transport", "cargo", "shipping", "package"],
    response: "Our Logistics Drones revolutionize delivery and transportation:\n\n📦 Payload capacity: 5kg to 100kg\n📦 Range: Up to 50km per charge\n📦 Autonomous navigation\n📦 Medical & emergency delivery capable\n📦 Last-mile delivery solutions\n\nIdeal for healthcare, e-commerce, and remote area supply!",
    priority: 8
  },
  {
    keywords: ["sports", "entertainment", "event", "show", "light show", "fpv", "racing"],
    response: "Our Sports & Entertainment Drones are perfect for:\n\n🎮 FPV racing and competitions\n🎆 Drone light shows\n📸 Sports event coverage\n🎬 Film and media production\n\nHigh-speed, agile, and camera-ready for spectacular performances!",
    priority: 8
  },
  {
    keywords: ["agriculture", "farming", "crop", "spray", "pesticide", "fertilizer"],
    response: "Our Agricultural Drones transform farming:\n\n🌾 Precision crop spraying\n🌾 Crop health monitoring (NDVI)\n🌾 Field mapping & surveying\n🌾 Seed planting\n🌾 Reduces water & chemical usage by 30%\n\nPerfect for modern, efficient farming!",
    priority: 8
  },
  {
    keywords: ["industrial", "inspection", "infrastructure", "power line", "pipeline", "tower"],
    response: "Our Industrial Drones excel at inspection tasks:\n\n🏭 Power line inspection\n🏭 Pipeline monitoring\n🏭 Tower & wind turbine inspection\n🏭 Construction site surveying\n🏭 Thermal imaging for fault detection\n\nSafe, efficient, and cost-effective industrial monitoring!",
    priority: 8
  },

  // Technical Specifications
  {
    keywords: ["payload", "weight", "capacity", "carry", "lift", "load"],
    response: "Our drones support various payload capacities:\n\n⚖️ Light drones: 2-5 kg\n⚖️ Medium drones: 10-25 kg\n⚖️ Heavy-lift drones: 50-100 kg\n\nPayload depends on the specific model and application. Contact us for custom requirements!",
    priority: 8
  },
  {
    keywords: ["range", "distance", "how far", "fly", "coverage"],
    response: "Flight range varies by model:\n\n📍 Short-range: 5-10 km\n📍 Medium-range: 10-30 km\n📍 Long-range: 30-50+ km\n\nFactors include payload, weather, and altitude. Our team can recommend the best fit for your needs!",
    priority: 8
  },
  {
    keywords: ["battery", "flight time", "endurance", "how long", "duration", "hours", "minutes"],
    response: "Flight endurance depends on the model:\n\n⏱️ Standard drones: 30-45 minutes\n⏱️ High-endurance models: 60-90 minutes\n⏱️ Tethered systems: Unlimited flight time\n\nWe also offer quick-swap battery systems for extended operations!",
    priority: 8
  },
  {
    keywords: ["speed", "fast", "velocity", "maximum speed"],
    response: "Our drones achieve various speeds based on design:\n\n🚀 Survey drones: 40-60 km/h\n🚀 Logistics drones: 60-80 km/h\n🚀 Racing/sports drones: 100-150 km/h\n\nSpeed is optimized for mission requirements and safety!",
    priority: 7
  },
  {
    keywords: ["altitude", "height", "how high", "ceiling"],
    response: "Operating altitudes:\n\n🔺 Standard operations: Up to 400 feet (DGCA compliant)\n🔺 Special permissions: Up to 1000+ feet\n🔺 Mountain operations: Tested at 15,000+ feet\n\nAll operations comply with DGCA regulations.",
    priority: 7
  },
  {
    keywords: ["camera", "video", "photo", "imaging", "resolution", "sensor"],
    response: "Our drones feature advanced imaging:\n\n📷 4K/8K video recording\n📷 Thermal/IR cameras\n📷 Multispectral sensors\n📷 LiDAR integration\n📷 Zoom capabilities up to 30x\n\nCamera systems are customizable based on application!",
    priority: 7
  },
  {
    keywords: ["weather", "rain", "wind", "harsh", "conditions", "waterproof", "temperature"],
    response: "Our drones are built for tough conditions:\n\n🌧️ IP54/IP67 rated models available\n🌧️ Wind resistance: Up to 45 km/h\n🌧️ Temperature range: -10°C to 50°C\n🌧️ Dust and sand resistant\n\nPerfect for all-weather operations in Indian conditions!",
    priority: 8
  },

  // Training
  {
    keywords: ["training", "course", "learn", "pilot", "certification", "dgca", "license"],
    response: "YuDru offers comprehensive drone pilot training:\n\n🎓 **Basic Training** - Fundamentals & controls\n🎓 **Advanced Training** - Mission planning & operations\n🎓 **DGCA Certification** - Remote Pilot License preparation\n🎓 **Specialized Training** - Industry-specific courses\n\nHands-on experience with certified instructors! Visit our Training page for details.",
    priority: 9
  },
  {
    keywords: ["rpl", "remote pilot license", "dgca license"],
    response: "We help you get DGCA Remote Pilot License (RPL):\n\n📜 Complete ground school training\n📜 Practical flight hours\n📜 Exam preparation\n📜 Documentation assistance\n\nOur program has a high success rate for DGCA certification!",
    priority: 8
  },
  {
    keywords: ["training duration", "how long training", "course length"],
    response: "Training program durations:\n\n⏰ Basic course: 3-5 days\n⏰ Advanced course: 7-10 days\n⏰ DGCA RPL preparation: 2-3 weeks\n⏰ Specialized programs: 1-2 weeks\n\nFlexible schedules available for corporate batches!",
    priority: 7
  },
  {
    keywords: ["training cost", "training fee", "course price", "training price"],
    response: "Training fees vary by program. Please contact us for current pricing:\n\n💰 Basic programs start from affordable rates\n💰 Corporate packages available\n💰 EMI options for individuals\n💰 Group discounts offered\n\nReach out via our Contact page for detailed pricing!",
    priority: 7
  },

  // Drone Labs
  {
    keywords: ["lab", "drone lab", "research", "r&d", "development", "innovation"],
    response: "Our Drone Labs offer:\n\n🔬 Cutting-edge R&D facilities\n🔬 Custom drone development\n🔬 Component testing & validation\n🔬 Academic collaborations\n🔬 Prototype development\n\nWe partner with institutions and companies for innovation. Visit our Drone Labs page to learn more!",
    priority: 8
  },
  {
    keywords: ["custom", "customize", "bespoke", "special requirement", "build"],
    response: "Yes! We offer custom drone solutions:\n\n🛠️ Tailored payload integration\n🛠️ Custom flight parameters\n🛠️ Specialized sensors & cameras\n🛠️ Industry-specific modifications\n🛠️ Software customization\n\nShare your requirements, and our engineering team will design the perfect solution!",
    priority: 8
  },

  // Services
  {
    keywords: ["services", "what do you offer", "offerings", "solutions"],
    response: "YuDru offers comprehensive drone solutions:\n\n✨ Drone manufacturing & sales\n✨ Pilot training & certification\n✨ Drone-as-a-Service (DaaS)\n✨ Maintenance & repairs\n✨ Consulting & project planning\n✨ Custom R&D\n\nEnd-to-end support for all your drone needs!",
    priority: 9
  },
  {
    keywords: ["maintenance", "repair", "service", "support", "fix", "broken"],
    response: "We provide complete after-sales support:\n\n🔧 Annual maintenance contracts\n🔧 On-site repair services\n🔧 Spare parts availability\n🔧 Software updates\n🔧 24/7 technical support\n\nOur service network ensures minimal downtime for your operations!",
    priority: 8
  },
  {
    keywords: ["warranty", "guarantee"],
    response: "Our warranty coverage:\n\n📋 Standard warranty: 1 year\n📋 Extended warranty options available\n📋 Covers manufacturing defects\n📋 Free software updates\n📋 Dedicated support team\n\nTerms vary by product. Contact us for specific details!",
    priority: 7
  },

  // Industries & Use Cases
  {
    keywords: ["industries", "sectors", "applications", "use cases", "who uses"],
    response: "We serve multiple industries:\n\n🏢 Defense & Security\n🏢 Agriculture & Farming\n🏢 Logistics & E-commerce\n🏢 Infrastructure & Construction\n🏢 Oil & Gas\n🏢 Disaster Management\n🏢 Media & Entertainment\n🏢 Healthcare & Emergency Services",
    priority: 8
  },
  {
    keywords: ["defense", "military", "army", "security forces", "paramilitary"],
    response: "We provide defense-grade solutions:\n\n🛡️ Surveillance & reconnaissance\n🛡️ Border patrol support\n🛡️ Target tracking systems\n🛡️ Secure communication links\n🛡️ All systems comply with defense standards\n\nPartnering with Indian armed forces for national security!",
    priority: 8
  },
  {
    keywords: ["disaster", "emergency", "rescue", "relief", "flood", "earthquake"],
    response: "Our drones excel in disaster management:\n\n🆘 Search & rescue operations\n🆘 Damage assessment\n🆘 Supply delivery to inaccessible areas\n🆘 Real-time situational awareness\n🆘 Thermal imaging for survivor detection\n\nProven track record in natural disaster response!",
    priority: 8
  },
  {
    keywords: ["medical", "healthcare", "medicine", "blood", "organ", "hospital"],
    response: "Healthcare drone solutions:\n\n🏥 Blood & organ transportation\n🏥 Medicine delivery to remote areas\n🏥 Vaccine distribution\n🏥 Emergency medical supplies\n🏥 Temperature-controlled payload\n\nSaving lives through rapid medical logistics!",
    priority: 8
  },

  // Business & Pricing
  {
    keywords: ["price", "cost", "rate", "how much", "budget", "affordable", "expensive"],
    response: "Pricing depends on the drone model and configuration. We offer:\n\n💵 Competitive pricing\n💵 Flexible payment options\n💵 Leasing & rental available\n💵 Corporate discounts\n💵 Government tender rates\n\nContact us for a customized quote based on your requirements!",
    priority: 8
  },
  {
    keywords: ["demo", "demonstration", "trial", "test", "see", "show"],
    response: "Yes! We offer live demonstrations:\n\n🎯 On-site demos available\n🎯 Virtual demo sessions\n🎯 Test flights arranged\n🎯 POC projects supported\n\nShare your contact details or visit our Contact page to schedule a demo!",
    priority: 9
  },
  {
    keywords: ["quote", "quotation", "proposal", "rfq", "tender"],
    response: "To get a quotation:\n\n📝 Visit our Contact page\n📝 Share your requirements\n📝 Our team will respond within 24-48 hours\n📝 Detailed proposals provided\n📝 Competitive pricing guaranteed\n\nWe also participate in government tenders!",
    priority: 8
  },
  {
    keywords: ["buy", "purchase", "order", "book"],
    response: "To purchase YuDru drones:\n\n🛒 Contact our sales team\n🛒 Share your requirements\n🛒 Get a customized quote\n🛒 Flexible payment options\n🛒 Quick delivery timelines\n\nVisit our Contact page or Products page to get started!",
    priority: 8
  },
  {
    keywords: ["rent", "rental", "lease", "hire", "daas", "drone as a service"],
    response: "We offer Drone-as-a-Service (DaaS):\n\n📅 Short-term rentals\n📅 Long-term leasing\n📅 Includes operator if needed\n📅 Maintenance covered\n📅 Flexible contracts\n\nPerfect for projects without upfront investment!",
    priority: 8
  },

  // Regulations & Compliance
  {
    keywords: ["legal", "regulation", "dgca", "rules", "permission", "license", "compliant", "law"],
    response: "All YuDru drones are DGCA compliant:\n\n⚖️ Registered with Digital Sky\n⚖️ Meet all safety standards\n⚖️ No Permission No Takeoff (NPNT) enabled\n⚖️ We assist with flight permissions\n⚖️ Training for regulatory compliance\n\nWe help you navigate all drone regulations!",
    priority: 8
  },
  {
    keywords: ["uin", "registration", "digital sky", "npnt"],
    response: "Drone registration support:\n\n📋 UIN (Unique Identification Number) assistance\n📋 Digital Sky platform registration\n📋 NPNT compliance built-in\n📋 Documentation guidance\n📋 Operator permit support\n\nWe help with complete regulatory compliance!",
    priority: 7
  },

  // Contact & Support
  {
    keywords: ["contact", "reach", "talk", "call", "phone", "email", "connect"],
    response: "Get in touch with us:\n\n📞 Visit our Contact page for phone & email\n📞 Fill out the contact form\n📞 Schedule a meeting\n📞 Request a callback\n\nOur team typically responds within 24 hours!",
    priority: 9
  },
  {
    keywords: ["career", "job", "hiring", "work", "employment", "vacancy", "openings"],
    response: "Interested in joining YuDru? 🚀\n\nWe're always looking for talented individuals in:\n👨‍💻 Engineering & R&D\n👨‍💻 Operations & Pilots\n👨‍💻 Sales & Marketing\n👨‍💻 Support & Training\n\nSend your resume through our Contact page!",
    priority: 7
  },
  {
    keywords: ["partner", "partnership", "collaborate", "dealer", "distributor", "franchise"],
    response: "Partnership opportunities:\n\n🤝 Dealer & distributor network\n🤝 Technology partnerships\n🤝 Academic collaborations\n🤝 Integration partners\n🤝 Service center franchises\n\nContact us to explore partnership opportunities!",
    priority: 7
  },

  // Comparisons & Advantages
  {
    keywords: ["why yudru", "why choose", "advantage", "benefit", "better", "best"],
    response: "Why choose YuDru:\n\n✅ 100% Made in India - Zero Chinese parts\n✅ 5+ years of R&D expertise\n✅ End-to-end support & training\n✅ DGCA compliant drones\n✅ Customizable solutions\n✅ Competitive pricing\n✅ Pan-India service network\n\nTrusted by defense, government, and industry leaders!",
    priority: 9
  },
  {
    keywords: ["competitor", "dji", "other brands", "comparison", "vs", "alternative"],
    response: "What sets YuDru apart:\n\n🏆 Indigenous technology (unlike imported brands)\n🏆 Government & defense approved\n🏆 Local support & quick service\n🏆 Customization available\n🏆 No data security concerns\n🏆 Atmanirbhar Bharat aligned\n\nChoose Made in India, choose YuDru! 🇮🇳",
    priority: 8
  },

  // Fun & Miscellaneous
  {
    keywords: ["joke", "funny", "humor", "laugh"],
    response: "Here's a drone joke for you! 😄\n\nWhy did the drone break up with the helicopter?\n\nBecause it needed more *space* to fly! 🚁✨\n\nNow, how can I help you with our actual drone solutions?",
    priority: 5
  },
  {
    keywords: ["name", "what is your name", "who", "called"],
    response: "I'm SkyPilot! 🤖✨ Your intelligent assistant for all things YuDru drones. I'm here to help you navigate our products, services, training, and more. What would you like to know?",
    priority: 6
  },
  {
    keywords: ["help", "assist", "support", "can you"],
    response: "I'm here to help! 🚁 I can assist you with:\n\n• Drone products & specifications\n• Training programs & certification\n• Pricing & quotations\n• Technical questions\n• Contact information\n• And much more!\n\nJust ask your question!",
    priority: 9
  }
];

// Smart matching function
export function findBestResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase().trim();
  
  // Sort by priority (higher first)
  const sortedKnowledge = [...knowledgeBase].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  
  let bestMatch: { entry: KnowledgeEntry; score: number } | null = null;
  
  for (const entry of sortedKnowledge) {
    let score = 0;
    let matchedKeywords = 0;
    
    for (const keyword of entry.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        matchedKeywords++;
        // Longer keyword matches are more valuable
        score += keyword.length;
        // Exact word match bonus
        if (new RegExp(`\\b${keyword}\\b`, 'i').test(lowerMessage)) {
          score += 5;
        }
      }
    }
    
    if (matchedKeywords > 0) {
      // Add priority to score
      score += (entry.priority || 0) * 2;
      
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { entry, score };
      }
    }
  }
  
  if (bestMatch) {
    return bestMatch.entry.response;
  }
  
  // Default response for unmatched queries
  return "Thank you for your question! 🚁 While I don't have specific information about that, I'd be happy to help you with:\n\n• Our drone products & specifications\n• Training & certification programs\n• Pricing & quotations\n• Technical support\n\nFor detailed inquiries, please visit our **Contact page** or share your contact details, and our team will reach out to you shortly!";
}
