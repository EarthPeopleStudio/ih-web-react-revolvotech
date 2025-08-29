// App-specific financial data and metrics

export const appData = {
  choreo: {
    name: 'Choreo',
    description: 'Neighborhood chore marketplace platform',
    
    // Financial Overview
    overview: {
      totalRevenue: 45000,
      totalExpenses: 28000,
      netProfit: 17000,
      monthlyGrowth: 12.5,
      activeUsers: 2400,
      projectStatus: 'Beta Launch'
    },
    
    // Monthly Revenue Data
    revenue: [
      { month: 'Jul', revenue: 2000, expenses: 3500, profit: -1500, users: 150 },
      { month: 'Aug', revenue: 3500, expenses: 3200, profit: 300, users: 280 },
      { month: 'Sep', revenue: 5200, expenses: 3800, profit: 1400, users: 420 },
      { month: 'Oct', revenue: 7800, expenses: 4200, profit: 3600, users: 650 },
      { month: 'Nov', revenue: 12500, expenses: 5500, profit: 7000, users: 980 },
      { month: 'Dec', revenue: 18000, expenses: 6200, profit: 11800, users: 1450 },
      { month: 'Jan', revenue: 25000, expenses: 7500, profit: 17500, users: 2100 }
    ],
    
    // Choreo-Specific Expense Breakdown
    expenses: {
      categories: [
        { name: 'Development', value: 12000, color: '#ff6b35', percentage: 43 },
        { name: 'Marketing & Growth', value: 8500, color: '#8e24aa', percentage: 30 },
        { name: 'External Services', value: 4200, color: '#1e88e5', percentage: 15 },
        { name: 'Legal & Compliance', value: 2100, color: '#26a69a', percentage: 7 },
        { name: 'Gift Cards & Rewards', value: 1200, color: '#fbbf24', percentage: 4 }
      ],
      monthly: [
        { month: 'Jul', development: 2800, marketing: 500, infrastructure: 200, legal: 0, other: 0 },
        { month: 'Aug', development: 2500, marketing: 400, infrastructure: 300, legal: 0, other: 0 },
        { month: 'Sep', development: 2200, marketing: 800, infrastructure: 500, legal: 300, other: 0 },
        { month: 'Oct', development: 2000, marketing: 1200, infrastructure: 600, legal: 300, other: 100 },
        { month: 'Nov', development: 1800, marketing: 2000, infrastructure: 900, legal: 500, other: 300 },
        { month: 'Dec', development: 1600, marketing: 2500, infrastructure: 1200, legal: 600, other: 300 },
        { month: 'Jan', development: 1500, marketing: 3000, infrastructure: 1500, legal: 800, other: 700 }
      ]
    },
    
    // Choreo-Specific Business Metrics
    metrics: {
      // User Acquisition & Retention
      userAcquisitionCost: 12.50,
      lifetimeValue: 180,
      churnRate: 5.2,
      conversionRate: 3.8,
      monthlyActiveUsers: 2100,
      revenuePerUser: 21.43,
      
      // Role-Specific Metrics
      youngHelpers: {
        count: 850,
        avgEarnings: 35,
        completionRate: 92,
        badgesEarned: 1240,
        giftCardsRedeemed: 420
      },
      adultHelpers: {
        count: 520,
        avgEarnings: 180,
        completionRate: 96,
        backgroundChecks: 495,
        avgRating: 4.7
      },
      chorePoster: {
        count: 730,
        avgSpent: 62,
        satisfactionRate: 4.6,
        repeatCustomers: 68
      },
      guardians: {
        count: 420,
        oversightActions: 1250,
        safetyReports: 3
      },
      business: {
        count: 12,
        teamSize: 145,
        bulkOrders: 85,
        corporateRevenue: 12000
      },
      
      // Marketplace Metrics
      avgOrderValue: 45,
      bidAcceptanceRate: 78,
      avgBiddingTime: 12, // minutes
      taskCompletionRate: 94,
      disputeRate: 0.8,
      
      // Safety & Security
      emergencyAlerts: 2,
      verifiedUsers: 89, // percentage
      trustedDevices: 3200,
      suspiciousActivity: 8,
      
      // Real-time Activity
      activeBids: 145,
      websocketConnections: 850,
      liveChats: 320,
      onlineUsers: 420
    },
    
    // Choreo Revenue Sources
    revenueSources: [
      { source: 'Commission Fees (5-10%)', amount: 28000, percentage: 62, color: '#ff6b35' },
      { source: 'Premium Subscriptions', amount: 12000, percentage: 27, color: '#8e24aa' },
      { source: 'Local Business Ads', amount: 5000, percentage: 11, color: '#1e88e5' }
    ],
    
    // External Service Costs (Real marketplace infrastructure)
    servicesCosts: {
      monthly: {
        // Payment & Financial
        stripe: 1800, // Payment processing fees (~2.9% + $0.30)
        tremendous: 320, // Gift card API (2.2% fee on $14,700)
        
        // Cloud Infrastructure  
        heroku: 450, // Backend hosting (Standard dynos + add-ons)
        aws: 850, // S3, SES, Comprehend, Rekognition, Textract
        mongodb: 250, // Database hosting (Atlas M10)
        cloudinary: 180, // Image optimization & CDN
        
        // Communication
        twilio: 420, // SMS verification & emergency alerts
        sendgrid: 120, // Email delivery (backup/marketing)
        pusher: 85, // WebSocket/real-time features
        
        // Security & Compliance
        checkr: 380, // Background checks for adult helpers
        jumio: 240, // Identity verification
        recaptcha: 0, // Google reCAPTCHA (free tier)
        
        // Location & Mobile
        mapbox: 90, // Location services for Flutter
        firebase: 65, // Push notifications & analytics
        
        // Monitoring & Analytics
        datadog: 180, // Application monitoring
        sentry: 45, // Error tracking
        mixpanel: 120, // User analytics
        
        // Development & Tools
        github: 21, // Code repository (Team plan)
        figma: 45, // Design collaboration
        notion: 16, // Documentation & project management
      },
      total: 5727,
      categories: {
        payments: 2120, // Stripe + Tremendous
        infrastructure: 1645, // Heroku + AWS + MongoDB + Cloudinary
        security: 620, // Checkr + Jumio
        communication: 625, // Twilio + SendGrid + Pusher
        analytics: 345, // Datadog + Sentry + Mixpanel
        mobile: 155, // Mapbox + Firebase
        tools: 82 // GitHub + Figma + Notion
      }
    },
    
    // Badge System Analytics
    badgeSystem: {
      totalBadgesEarned: 1240,
      popularBadges: [
        { name: 'First Chore', earned: 850, difficulty: 'Starter' },
        { name: 'Reliable Helper', earned: 420, difficulty: 'Bronze' },
        { name: 'Community Star', earned: 180, difficulty: 'Silver' },
        { name: 'Super Helper', earned: 65, difficulty: 'Gold' },
        { name: 'Neighborhood Hero', earned: 12, difficulty: 'Platinum' }
      ],
      avgBadgesPerUser: 1.5,
      gamificationEngagement: 84 // percentage
    },
    
    // Growth Targets & KPIs
    targets: {
      monthlyRevenue: 30000,
      monthlyUsers: 3000,
      profitMargin: 45,
      customerSatisfaction: 4.8,
      
      // Role-specific targets
      youngHelperTarget: 1200, // active young helpers
      adultHelperTarget: 800, // verified adult helpers
      businessAccountTarget: 25, // enterprise accounts
      
      // Safety & Quality targets
      verificationRate: 95, // percentage of verified users
      disputeRateTarget: 0.5, // below 0.5%
      emergencyResponseTime: 5, // minutes
      
      // Technical targets
      appStoreRating: 4.8,
      websocketUptime: 99.9,
      apiResponseTime: 200 // milliseconds
    },
    
    // Geographic Performance
    geography: {
      primaryMarkets: [
        { city: 'Austin, TX', users: 850, revenue: 18000, growth: 15.2 },
        { city: 'Denver, CO', users: 620, revenue: 12000, growth: 12.8 },
        { city: 'Portland, OR', users: 480, revenue: 9500, growth: 18.5 },
        { city: 'Seattle, WA', users: 450, revenue: 8500, growth: 10.2 }
      ],
      expansionTargets: ['Phoenix, AZ', 'Nashville, TN', 'Raleigh, NC']
    }
  },
  
  website: {
    name: 'Revolvo Website',
    description: 'Main company website & portfolio',
    
    overview: {
      totalRevenue: 35000,
      totalExpenses: 8500,
      netProfit: 26500,
      monthlyGrowth: 8.2,
      activeProjects: 8,
      projectStatus: 'Live'
    },
    
    revenue: [
      { month: 'Jul', revenue: 3500, expenses: 800, profit: 2700, projects: 2 },
      { month: 'Aug', revenue: 4200, expenses: 900, profit: 3300, projects: 3 },
      { month: 'Sep', revenue: 5800, expenses: 1200, profit: 4600, projects: 4 },
      { month: 'Oct', revenue: 6500, expenses: 1400, profit: 5100, projects: 5 },
      { month: 'Nov', revenue: 7200, expenses: 1600, profit: 5600, projects: 6 },
      { month: 'Dec', revenue: 8500, expenses: 1800, profit: 6700, projects: 7 },
      { month: 'Jan', revenue: 9300, expenses: 2000, profit: 7300, projects: 8 }
    ],
    
    expenses: {
      categories: [
        { name: 'Hosting & Domain', value: 2400, color: '#1e88e5', percentage: 28 },
        { name: 'SEO & Marketing', value: 3200, color: '#8e24aa', percentage: 38 },
        { name: 'Maintenance', value: 1800, color: '#ff6b35', percentage: 21 },
        { name: 'Tools & Software', value: 900, color: '#26a69a', percentage: 11 },
        { name: 'Other', value: 200, color: '#fbbf24', percentage: 2 }
      ]
    },
    
    metrics: {
      monthlyVisitors: 15000,
      conversionRate: 2.8,
      avgProjectValue: 4500,
      clientRetention: 85,
      pagespeedScore: 95,
      seoRanking: 'Top 10'
    },
    
    revenueSources: [
      { source: 'Web Development', amount: 22000, percentage: 63 },
      { source: 'Consulting', amount: 8500, percentage: 24 },
      { source: 'Maintenance', amount: 4500, percentage: 13 }
    ]
  },
  
  other: {
    name: 'Other Projects',
    description: 'Client projects & R&D experiments',
    
    overview: {
      totalRevenue: 45000,
      totalExpenses: 15000,
      netProfit: 30000,
      monthlyGrowth: 15.8,
      activeProjects: 12,
      projectStatus: 'Various'
    },
    
    revenue: [
      { month: 'Jul', revenue: 4500, expenses: 1500, profit: 3000, projects: 8 },
      { month: 'Aug', revenue: 5200, expenses: 1800, profit: 3400, projects: 9 },
      { month: 'Sep', revenue: 6800, expenses: 2200, profit: 4600, projects: 10 },
      { month: 'Oct', revenue: 7500, expenses: 2500, profit: 5000, projects: 11 },
      { month: 'Nov', revenue: 8200, expenses: 2800, profit: 5400, projects: 12 },
      { month: 'Dec', revenue: 9800, expenses: 3200, profit: 6600, projects: 12 },
      { month: 'Jan', revenue: 11500, expenses: 3500, profit: 8000, projects: 12 }
    ],
    
    expenses: {
      categories: [
        { name: 'Development', value: 8500, color: '#ff6b35', percentage: 57 },
        { name: 'Third-party APIs', value: 2800, color: '#1e88e5', percentage: 19 },
        { name: 'Marketing', value: 2100, color: '#8e24aa', percentage: 14 },
        { name: 'Infrastructure', value: 1200, color: '#26a69a', percentage: 8 },
        { name: 'Other', value: 400, color: '#fbbf24', percentage: 3 }
      ]
    },
    
    metrics: {
      avgProjectDuration: 45, // days
      clientSatisfaction: 4.9,
      projectSuccessRate: 95,
      repeatClientRate: 70,
      avgProjectValue: 3750
    }
  }
};

// Calculate overview data across all apps
export const getOverviewData = () => {
  const apps = ['choreo', 'website', 'other'];
  
  const totalRevenue = apps.reduce((sum, app) => sum + appData[app].overview.totalRevenue, 0);
  const totalExpenses = apps.reduce((sum, app) => sum + appData[app].overview.totalExpenses, 0);
  const netProfit = totalRevenue - totalExpenses;
  
  // Combined monthly data
  const combinedRevenue = [];
  const months = appData.choreo.revenue.map(item => item.month);
  
  months.forEach(month => {
    const monthData = {
      month,
      revenue: 0,
      expenses: 0,
      profit: 0
    };
    
    apps.forEach(app => {
      const appMonth = appData[app].revenue.find(item => item.month === month);
      if (appMonth) {
        monthData.revenue += appMonth.revenue;
        monthData.expenses += appMonth.expenses;
        monthData.profit += appMonth.profit;
      }
    });
    
    combinedRevenue.push(monthData);
  });
  
  return {
    name: 'All Apps Overview',
    description: 'Combined metrics across all projects',
    overview: {
      totalRevenue,
      totalExpenses,
      netProfit,
      monthlyGrowth: 12.1, // Average
      totalProjects: 22,
      projectStatus: 'Mixed'
    },
    revenue: combinedRevenue,
    expenses: {
      categories: [
        { name: 'Development', value: 22000, color: '#ff6b35', percentage: 43 },
        { name: 'Marketing', value: 14300, color: '#8e24aa', percentage: 28 },
        { name: 'Infrastructure', value: 7400, color: '#1e88e5', percentage: 14 },
        { name: 'Legal & Admin', value: 3600, color: '#26a69a', percentage: 7 },
        { name: 'Other', value: 4200, color: '#fbbf24', percentage: 8 }
      ]
    }
  };
};

export const getAppData = (appId) => {
  if (appId === 'overview') {
    return getOverviewData();
  }
  return appData[appId] || appData.choreo;
};