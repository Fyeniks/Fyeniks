window.SITE = {
  brand: {
    name: "Fyeniks",
    role: "Video Editor · Motion Designer · Web Developer",
    profileKicker: "Hi, it's",
    roleLine: "Video Editor · Motion Designer\nWeb Developer",
    eyebrow: "YOUR BEST CHOICE!",
    aboutIndex: "01 / FYENIKS",
    aboutTitle: "Let's expand your",
    aboutAccent: "digital footprint.",
    aboutLines: [
      "Hiiii! I’m Fyeniks! I’m a freelance video editor focused on VTubers, streamers,",
      "and online creators. I’m also a web developer, motion designer and aspiring illustrator",
      "with a passion for gaming, programming and music.",
    ],
  },

  promo: {
    enabled: true,
    text: "✦ LAUNCH PRICES ARE LOWER ✦",
    href: "commission.html",
  },

  analytics: {
    measurementId: "G-CKY2YRPNYQ",
  },

  twitchStatus: {
    enabled: true,
    channel: "fyeniks",

    endpoint: "https://decapi.me/twitch/uptime?channel={channel}",
  },

  links: {
    email: "mailto:fyeniksparty@gmail.com",
    twitch: "https://twitch.tv/fyeniks",
    youtube: "https://youtube.com/@fyeniks",
    youtubeRaw: "https://youtube.com/@fyeniksraw",
    youtubeClips: "https://youtube.com/@fyeniksclips",
    x: "https://x.com/Fyeniks",
    discord: "https://discord.com/users/Fyeniks",
    tiktok: "https://www.tiktok.com/@fyeniks_",
    instagram: "https://www.instagram.com/fyeniks_/",
    ytjobs: "https://ytjobs.co/talent/vitrine/505761",

    googleDrive: "https://drive.google.com/",
  },

  socials: [
    {
      key: "twitch",
      label: "Twitch",
      handle: "@fyeniks",
      icon: "twitch",
      showOnHome: true,
      featured: "twitch",
    },
    {
      key: "youtube",
      label: "YouTube",
      handle: "@fyeniks",
      icon: "youtube",
      showOnHome: true,
      featured: "youtube",
    },
    {
      key: "x",
      label: "X / Twitter",
      handle: "@Fyeniks",
      icon: "x",
      showOnHome: true,
      featured: "x",
    },
    {
      key: "discord",
      label: "Discord",
      handle: "@Fyeniks",
      icon: "discord",
      showOnHome: true,
      contactNote: "FASTEST RESPONSE",
    },
    {
      key: "youtubeRaw",
      label: "YouTube",
      handle: "@fyeniksraw",
      icon: "youtube",
      showOnHome: false,
    },
    {
      key: "tiktok",
      label: "TikTok",
      handle: "@fyeniks",
      icon: "tiktok",
      showOnHome: true,
    },
    {
      key: "ytjobs",
      label: "YT Jobs",
      handle: "Talent profile",
      icon: "briefcase",
      showOnHome: false,
    },
    {
      key: "youtubeClips",
      label: "YouTube",
      handle: "@fyeniksclips",
      icon: "youtube",
      showOnHome: false,
    },
    {
      key: "instagram",
      label: "Instagram",
      handle: "@fyeniks",
      icon: "instagram",
      showOnHome: true,
    },
    {
      key: "email",
      label: "Email",
      handle: "fyeniksparty@gmail.com",
      icon: "mail",
      showOnHome: false,
      showOnLinks: false,
    },
  ],

  nav: [
    {
      label: "Links",
      href: "links.html",
    },
    {
      label: "Portfolio",
      href: "portfolio.html",
    },
    {
      label: "Commission",
      href: "commission.html",
    },
    {
      label: "T.O.S.",
      href: "tos.html",
    },
    {
      label: "Contact",
      href: "contact.html",
    },
  ],

  services: [
    {
      name: "Short-form Clips",
      status: "open",
      showOnHub: true,
      showOnCommission: true,
    },
    {
      name: "YouTube Videos",
      status: "open",
      showOnHub: true,
      showOnCommission: true,
    },
    {
      name: "VOD Scrubbing",
      status: "selective",
      showOnHub: true,
      showOnCommission: true,
    },
    {
      name: "Thumbnails",
      status: "selective",
      showOnHub: false,
      showOnCommission: false,
    },
    {
      name: "Web Development",
      status: "open",
      showOnHub: false,
      showOnCommission: false,
    },
  ],

  contactForm: {
    briefs: {
      shorts:
        "How many clips do you need? Include the target length, platform (Youtube, TikTok, Instagram), footage links and editing references.",
      "long-form":
        "Include your footage length, target video length, number of videos, editing style and reference links.",
      "vod-scrubbing":
        "Include the VOD links, total footage length and any moments to look for.",
      thumbnails:
        "How many thumbnails do you need? Include the video topic, title, links to images, brand assets and style references.",
      "web-development":
        "Describe the website purpose, pages, features, design references, assets and whether you already have a domain and hosting.",
      custom:
        "Describe what you would like to create. Include the scope, reference links and any important requirements.",
    },
  },
  portfolio: {
    sections: [
      {
        id: "shorts",
        commissionService: "shorts",
        showOnPortfolio: true,
        label: "Shorts",
        title: "Short-form Clips",
        kicker: "SHORT-FORM",
        intro: "Fast-paced creator edits made for Shorts, TikTok and Reels.",
        mediaStyle: "wide",
        showYtJobs: true,
      },
      {
        id: "long-form",
        commissionService: "long-form",
        showOnPortfolio: false,
        label: "Long-form",
        title: "Long-form Videos",
        kicker: "LONG-FORM",
        intro: "Longer creator-focused edits, highlights and YouTube videos.",
        mediaStyle: "wide",
        showYtJobs: true,
      },
      {
        id: "thumbnails",
        commissionService: "thumbnails",
        showOnPortfolio: false,
        label: "Thumbnails",
        title: "Thumbnails",
        kicker: "THUMBNAIL DESIGN",
        intro: "Thumbnail design showcase — image-first presentation for visual work.",
        mediaStyle: "thumbnail",
        showYtJobs: true,
      },
      {
        id: "web-development",
        commissionService: "web-development",
        showOnPortfolio: false,
        label: "Web Dev",
        title: "Web Development",
        kicker: "WEB DEVELOPMENT",
        intro: "Responsive creator-focused websites, portfolio hubs and custom landing pages.",
        mediaStyle: "website",
        showYtJobs: false,
      },
      {
        id: "other-projects",
        showOnPortfolio: false,
        label: "Other Projects",
        title: "My Other Projects",
        kicker: "SIDE PROJECTS",
        intro:
          "Creative experiments, visual work and side projects outside my main editing, thumbnail and web work.",
        mediaStyle: "other",
        showYtJobs: false,
        emptyText: "More side projects will appear here as I make them.",
      },
    ],

    items: [
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Ironmouse",
        title: "I Know I Have BAD LUCK 🍀",
        youtubeId: "DFHuRlXLaPs",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@CottontailVA",
        title: "Cotton is DESPERATE for LOVE 💜",
        youtubeId: "lB8tuS5cFaQ",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@MegalodonVT",
        title: "Are VTubers STILL Doing THIS in 2026?! 🥰",
        youtubeId: "1Lwi1OYc9zw",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Kumi",
        title: "How Many GALLONS of Milk Do You Have? 🐄",
        youtubeId: "DBS6RcSgC_w",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@LucyPyre",
        title: "Very STUBBORN Squirrel 🐿️",
        youtubeId: "fCMFE8jqog0",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Shylili",
        title: "Why Is Everyone CHEATING Now?! 💔",
        youtubeId: "dHzPiziFjLo",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Chibidoki",
        title: "WORST Gnomes Ever... 💀",
        youtubeId: "gJzHNLKnA34",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Squchan",
        title: "Squ Has the WORST Food Taste Ever 🍟",
        youtubeId: "PC4Z4J9eq2A",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        showOnPortfolio: true,
        section: "shorts",
        creator: "@Deme",
        title: "Deme is the worst driver 💥",
        youtubeId: "jsgozkXJRDg",
        mediaType: "youtube",
        youtubeFormat: "short",
        commissioned: false,
      },
      {
        section: "long-form",
        showOnPortfolio: false,
        creator: "",
        title: "",
        youtubeId: "",
        mediaType: "youtube",
        youtubeFormat: "video",
        commissioned: true,
      },
      {
        section: "thumbnails",
        showOnPortfolio: false,
        creator: "",
        title: "",
        youtubeId: "",
        mediaType: "youtube-thumbnail",
        youtubeFormat: "video",
        commissioned: true,
      },
      {
        section: "web-development",
        showOnPortfolio: false,
        creator: "",
        creatorUrl: "",
        title: "",
        mediaType: "image",
        image: "",
        url: "",
        tags: ["Portfolio", "Responsive"],
      },
      {
        section: "other-projects",
        showOnPortfolio: false,
        creator: "",
        creatorUrl: "",
        title: "",
        mediaType: "youtube",
        youtubeId: "",
        youtubeFormat: "video",
        projectType: "concept",
        work: ["MOTION DESIGN"],
      },
    ],
  },

  commission: {
    processingFee: "+5% processing fee added to the final invoice",
    processingFeeNote: "This fee helps cover currency conversion and fees charged by payment services.",
    feeNotes: {
      Complexity:
        "This fee may apply when a project requires extra complexity, additional requested elements, or significantly more time to fully match your vision.",
      "Rush Fee":
        "Rush commissions are moved to the front of the queue. Once I finish the project I am currently working on, your commission will be worked on next.",
      "Privacy Fee":
        "With the privacy fee, I will not use your material in my portfolio, you do not need to credit or tag me, and your material will not be shown to third parties during production.",
    },
    turnaroundNote:
      "Estimated turnaround. It may vary depending on current workload and project complexity. The final delivery time is confirmed when placing the commission.",

    approxCurrency: {
      eurPerPln: 0.2300,
      usdPerPln: 0.2653,
      asOf: "2026-09-21",
    },

    fees: [
      {
        label: "Complexity",
        value: "Up to 500PLN",
      },
      {
        label: "Rush Fee",
        value: "35%",
      },
      {
        label: "Privacy Fee",
        value: "25%",
      },
    ],

    sections: [
      {
        id: "shorts",
        label: "Shorts",
        serviceName: "Short-form Clips",
        kicker: "SHORT-FORM",
        title: "Short-form Clips",
        intro: "Fast-paced vertical edits built for Shorts, TikTok and Reels.",
        fees: [
          {
            label: "Complexity",
            value: "Up to 30 PLN",
          },
          {
            label: "Rush Fee",
            value: "35%",
          },
          {
            label: "Privacy Fee",
            value: "25%",
          },
        ],
        tiers: [
          {
            name: "Dynamic Edit",
            enabled: true,
            accent: "dynamic",
            price: "50 PLN",
            turnaround: "Up to 24 hours",
            estimatedTurnaround: true,
            summary: "Fast-paced short-form editing.",
            features: [
              "Dynamic pacing and cuts",
              "Styled captions and visual callouts",
              "Zooms / visual emphasis",
              "Sound design",
            ],
            sendMe: [
              "Footage or a VOD link with timestamps",
              "Channel emotes, logos and other assets",
              "Target length",
              "References, notes and your target deadline",
            ],
          },
          {
            name: "Scripted Edit",
            enabled: true,
            accent: "scripted",
            price: "65 PLN",
            turnaround: "Up to 48 hours",
            estimatedTurnaround: true,
            summary:
              "A scripted short built around a supplied voice-over, with visuals matched to the narration.",
            features: [
              "Edit built around your voice-over",
              "Styled captions and visual callouts",
              "Zooms / visual emphasis",
              "B-roll / supplied assets",
              "Sound design",
            ],
            sendMe: [
              "Footage and, optionally, separate recorded layers / tracks",
              "Voice-over script",
              "Channel emotes, logos and other assets",
              "Target length",
              "References, notes and your target deadline",
            ],
          },
        ],
        packLabel: "Shorts packs",
        packs: [
          {
            name: "Shorts 5-Pack",
            count: "5 SHORTS",
            quantity: 5,
            discount: 0.1,
            discountLabel: "−10%",
            note: "Applies when you order 5 Shorts in one commission. You can mix and match eligible tiers within the pack.",
          },
          {
            name: "Shorts 15-Pack",
            count: "15 SHORTS",
            quantity: 15,
            discount: 0.15,
            discountLabel: "−15%",
            note: "Applies when you order 15 Shorts in one commission. You can mix and match eligible tiers within the pack.",
            featured: true,
          },
        ],
      },
      {
        id: "long-form",
        label: "Long-form",
        serviceName: "YouTube Videos",
        kicker: "LONG-FORM",
        title: "YouTube Videos",
        intro: "Longer creator-focused edits, highlights and polished YouTube videos.",
        fees: [
          {
            label: "Complexity",
            value: "Up to 100 PLN",
          },
          {
            label: "Rush Fee",
            value: "35%",
          },
          {
            label: "Privacy Fee",
            value: "25%",
          },
        ],
        tiers: [
          {
            name: "Gaming Edit",
            enabled: true,
            accent: "gaming",
            price: "190 PLN",
            turnaround: "Up to 4 days",
            estimatedTurnaround: true,
            summary: "Gameplay-focused videos made from streams or recorded gaming footage.",
            features: [
              "Gameplay pacing and cleanup",
              "Highlights / funny moments",
              "Styled captions, visual callouts and graphics",
              "Sound design",
            ],
            sendMe: [
              "Footage or a VOD link with timestamps",
              "Channel emotes, logos and other assets",
              "Target length",
              "References, notes and your target deadline",
            ],
          },
          {
            name: "Stream Edit",
            enabled: true,
            accent: "stream",
            price: "220 PLN",
            turnaround: "Up to 4 days",
            estimatedTurnaround: true,
            summary: "For talking streams, reactions, watch-alongs and other personality-led content.",
            features: [
              "Conversation and reaction pacing",
              "Dead-air cleanup",
              "Styled captions, visual callouts and graphics",
              "Sound design",
            ],
            sendMe: [
              "Footage or a VOD link with timestamps",
              "Channel emotes, logos and other assets",
              "Target length",
              "References, notes and your target deadline",
            ],
          },
          {
            name: "Scripted Video Edit",
            enabled: true,
            accent: "scripted-video",
            price: "270 PLN",
            turnaround: "Up to 7 days",
            estimatedTurnaround: true,
            summary: "A structured YouTube edit built around a script or prepared voice-over.",
            features: [
              "Edit built around narration",
              "B-roll / supplied assets",
              "Styled captions, visual callouts and graphics",
              "Sound design",
            ],
            sendMe: [
              "Footage and, optionally, separate recorded layers / tracks",
              "Video script",
              "Channel emotes, logos and other assets",
              "Target length",
              "References, notes and your target deadline",
            ],
          },
        ],
        packLabel: "Video packs",
        packs: [
          {
            name: "Video 3-Pack",
            count: "3 VIDEOS",
            quantity: 3,
            discount: 0.1,
            discountLabel: "−10%",
            note: "Applies when you order 3 videos in one commission. You can mix and match eligible tiers within the pack.",
          },
          {
            name: "Video 9-Pack",
            count: "9 VIDEOS",
            quantity: 9,
            discount: 0.15,
            discountLabel: "−15%",
            note: "Applies when you order 9 videos in one commission. You can mix and match eligible tiers within the pack.",
            featured: true,
          },
        ],
      },
      {
        id: "vod-scrubbing",
        label: "VOD Scrubbing",
        serviceName: "VOD Scrubbing",
        kicker: "VOD REVIEW",
        title: "VOD Scrubbing",
        intro: "I go through longer VODs and pull out the moments worth turning into content.",
        fees: [
          {
            label: "Rush Fee",
            value: "35%",
          },
        ],
        tiers: [
          {
            name: "Timestamps",
            enabled: true,
            price: "30 PLN / h",
            turnaround: "Up to 2 days",
            accent: "timestamps",
            summary:
              "I watch through the VOD and mark the moments you can use. Billed per hour of VOD reviewed.",
            features: ["VOD review", "Organized timestamps", "Moment labels", "Short notes / context"],
            sendMe: [
              "Twitch / YouTube VOD link or footage",
              "What kind of moments you want found",
              "Any topics or moments to avoid",
              "Your target deadline",
            ],
          },
          {
            name: "Edit Preparation",
            enabled: true,
            price: "35 PLN / h",
            turnaround: "Up to 2 days",
            accent: "edit-prep",
            summary: "I review the VOD, cut selected moments and deliver organized clips ready for editing.",
            features: [
              "VOD review",
              "Selected moments cut from the stream",
              "Edit-ready clip files",
              "Organized files for editing",
            ],
            sendMe: [
              "Twitch / YouTube VOD link or footage",
              "What kind of moments you want found",
              "Any topics or moments to avoid",
              "Your target deadline",
            ],
          },
        ],
        packs: [
          {
            name: "VOD + Editing Rate",
            count: "VOD + EDITING",
            flatRate: "30 PLN / h",
            flatRateLabel: "VOD Scrubbing",
            badge: "BUNDLE RATE",
            note: "Applies when VOD Scrubbing is ordered together with any Short-form or Long-form edit in the same commission.",
          },
        ],
      },
      {
        id: "thumbnails",
        label: "Thumbnails",
        serviceName: "Thumbnails",
        kicker: "THUMBNAIL DESIGN",
        title: "Thumbnail Design",
        intro: "Thumbnail concepts and polished visual compositions built around the video idea.",
        fees: [
          {
            label: "Complexity",
            value: "Up to 50 PLN",
          },
          {
            label: "Rush Fee",
            value: "35%",
          },
          {
            label: "Privacy Fee",
            value: "25%",
          },
        ],
        addOns: [
          {
            label: "Similar Version",
            value: "+50%",
            accent: "thumb-similar",
            note: "You receive two similar thumbnail versions for YouTube A/B testing, so you can compare which version performs better.",
          },
        ],
        tiers: [
          {
            name: "Simple Thumbnail",
            enabled: true,
            price: "30 PLN",
            turnaround: "Up to 1 day",
            estimatedTurnaround: true,
            accent: "thumb-clean",
            summary: "A simple long-form thumbnail with a clean composition and clear focal point.",
            features: ["Simple composition", "Text and graphic treatment", "Final 16:9 export"],
            sendMe: [
              "Video title / concept",
              "Screenshots, renders or character assets",
              "Brand references and examples",
              "Any required text or visual direction",
            ],
          },
          {
            name: "Simple Shorts Thumbnail",
            enabled: true,
            price: "15 PLN",
            turnaround: "Up to 1 day",
            estimatedTurnaround: true,
            accent: "thumb-shorts-clean",
            summary: "A simple Shorts thumbnail designed for quick readability on mobile.",
            features: ["Simple composition", "Text and graphic treatment", "Final 9:16 export"],
            sendMe: [
              "Video title / concept",
              "Screenshots, renders or character assets",
              "Brand references and examples",
              "Any required text or visual direction",
            ],
          },
          {
            name: "Custom Thumbnail",
            enabled: false,
            price: "90 PLN",
            turnaround: "Up to 4 days",
            estimatedTurnaround: true,
            accent: "thumb-custom",
            summary:
              "A more detailed long-form thumbnail with custom compositing, effects and visual treatment.",
            features: [
              "Custom compositing",
              "Lighting / color matching",
              "Effects and graphic elements",
              "Detailed 16:9 final export",
            ],
            sendMe: [
              "Video title / concept",
              "Screenshots, renders or character assets",
              "Brand references and examples",
              "Any required text or visual direction",
            ],
          },
          {
            name: "Custom Shorts Thumbnail",
            enabled: false,
            price: "65 PLN",
            turnaround: "Up to 3 days",
            estimatedTurnaround: true,
            accent: "thumb-shorts-custom",
            summary:
              "A stylized Shorts thumbnail with custom compositing, effects and stronger graphic treatment.",
            features: [
              "Custom compositing",
              "Mobile-first graphic treatment",
              "Effects and visual callouts",
              "Shorts-ready final export",
            ],
            sendMe: [
              "Video title / concept",
              "Screenshots, renders or character assets",
              "Brand references and examples",
              "Any required text or visual direction",
            ],
          },
        ],
        packs: [
          {
            name: "Edited Video Thumbnail",
            count: "VIDEO + THUMBNAIL",
            quantity: 1,
            discount: 0.15,
            discountLabel: "−15%",
            note: "Applies when the thumbnail is for a video edited by me.",
            featured: true,
          },
        ],
      },
      {
        id: "web-development",
        label: "Web Development",
        serviceName: "Web Development",
        kicker: "WEB DEVELOPMENT",
        title: "Web Development",
        intro:
          "Responsive creator websites, portfolio hubs and landing pages built around your brand and content.",
        fees: [
          {
            label: "Complexity",
            value: "Up to 300 PLN",
          },
          {
            label: "Rush Fee",
            value: "35%",
          },
          {
            label: "Privacy Fee",
            value: "25%",
          },
        ],
        addOns: [
          {
            label: "Domain & Hosting Setup",
            value: "100 PLN",
            accent: "web-setup",
            note: "Advice on choosing a domain and hosting, plus configuring the website so it works correctly on them.",
          },
          {
            label: "6-Month Maintenance",
            value: "100 PLN / 6 months",
            accent: "web-maintenance",
            note: "Website maintenance and agreed changes for 6 months after delivery.",
          },
        ],
        tiers: [
          {
            name: "Links Website",
            enabled: true,
            accent: "web-links",
            price: "300 PLN",
            turnaround: "Up to 1 week",
            estimatedTurnaround: true,
            summary: "A compact links hub for your socials, contact links and creator profiles.",
            features: [
              "Responsive link hub",
              "Social / CTA sections",
              "Custom branding",
              "Deployment-ready files",
            ],
            sendMe: [
              "Branding, logo, colors and social links",
              "Page copy, sections and content you want included",
              "Reference websites or visual direction",
              "Required pages and features",
            ],
          },
          {
            name: "Portfolio Website",
            enabled: true,
            accent: "web-portfolio",
            price: "450 PLN",
            turnaround: "Up to 2 weeks",
            estimatedTurnaround: true,
            summary: "A creator portfolio for showcasing work, services and contact information.",
            features: [
              "Portfolio / work showcase",
              "Links and contact sections",
              "Responsive navigation",
              "Custom creator-focused design",
            ],
            sendMe: [
              "Branding, logo, colors and social links",
              "Page copy, sections and content you want included",
              "Reference websites or visual direction",
              "Required pages and features",
            ],
          },
        ],
        packs: [
          {
            name: "Links Website Bundle",
            count: "WEBSITE BUNDLE",
            discount: 0.15,
            discountLabel: "−15%",
            featured: true,
            note: "Includes a Links Website, domain & hosting setup, and 6 months of maintenance in one commission.",
            bundleItems: [
              {
                label: "Links Website",
                price: 300,
                accent: "web-links",
                type: "service",
              },
              {
                label: "Domain & Hosting Setup",
                price: 100,
                accent: "web-setup",
                type: "addon",
              },
              {
                label: "6-Month Maintenance",
                price: 100,
                accent: "web-maintenance",
                type: "addon",
              },
            ],
          },
        ],
      },
    ],
  },

  tos: [
    {
      title: "General Agreement & Orders",
      text: "By requesting or placing a commission, you confirm that you have read and accepted these Terms. Before payment, we agree on the selected service or tier, project scope, required materials, final price and estimated turnaround. I reserve the right to decline a commission.",
    },
    {
      title: "Payments",
      text: "Payments are normally processed through Stripe unless agreed otherwise. A 5% processing fee is added to the final invoice to help cover currency conversion and fees charged by payment services. The commission is considered confirmed and the turnaround period starts once the agreed payment has been received.",
    },
    {
      title: "What You Need to Send",
      text: "Please provide the footage, VOD links, timestamps, references, channel assets, text, branding and any other files required for the selected service. Specific requirements are listed under each individual commission option on the Commission page. You are responsible for making sure you are allowed to provide and use the materials you send.",
    },
    {
      title: "VOD Scrubbing",
      text: "VOD Scrubbing is charged per hour of VOD reviewed at the rate shown on the Commission page. For billing purposes, any started hour with more than 15 minutes of VOD is charged as a full hour. Timestamps provides marked moments, while Edit Preparation provides selected clips cut from the stream and organized so they are ready for editing.",
    },
    {
      title: "Cancellation",
      text: "A commission may be cancelled depending on how much of the work has already been completed. If the project is more than 50% complete, cancellation is no longer available. If the project is up to 50% complete, cancellation may be accepted at my discretion and, if approved, I may refund 50% of the agreed commission price. If I cancel the commission, a full refund may be issued depending on how much of the work has already been completed.",
    },
    {
      title: "Turnaround & Deadlines",
      text: "Turnaround times shown on the Commission page are estimates and may vary depending on current workload, project complexity and the amount of material. The final estimated delivery time is confirmed with the commission. Any fixed deadline must be disclosed before payment. Rush work must be agreed before the project starts. If a delay occurs, I will inform you as soon as possible.",
    },
    {
      title: "Revisions",
      text: "Revisions are provided at my discretion as part of the normal editing process, but they may also be requested by the client when the situation reasonably requires changes within the original agreed brief. Major direction changes, new material or extra work outside the original scope may be treated as additional work and can affect the price or turnaround. Changes requested after final delivery may require a separate quote.",
    },
    {
      title: "Packs, Bundles & Discounts",
      text: "Pack and bundle discounts apply only when the requirements shown on the Commission page are met, such as ordering the required number of videos or combining eligible services in one commission. Eligible tiers can be mixed where the pack says so. Discounts cannot be assumed outside the listed conditions unless agreed otherwise.",
    },
    {
      title: "Website Projects",
      text: "Website commissions are based on the selected website tier and agreed project scope. Domain & Hosting Setup and 6-Month Maintenance are optional add-ons unless they are included in a listed bundle. Any third-party domain, hosting or service costs are separate unless explicitly included in the agreed quote.",
    },
    {
      title: "Licensing & Supplied Assets",
      text: "If your project uses licensed assets from an external platform, let me know before work begins and provide the access, licence information or permissions needed for me to use those materials. You are responsible for ensuring that supplied footage, music, artwork, fonts and other assets can legally be used in the commission.",
    },
    {
      title: "Rights of Use & Portfolio",
      text: "You may use the delivered work on your social media and for personal or commercial projects unless a different licence is agreed. Reselling the delivered work as a standalone product or claiming the work itself as your own creation is not permitted. I may showcase commissioned work in my portfolio or social media unless a Privacy Fee or another confidentiality arrangement has been agreed.",
    },
    {
      title: "Final Delivery",
      text: "Final files are usually delivered through Google Drive and will normally remain available there for 48 hours after delivery unless agreed otherwise. Please download and back up your files within that period.",
    },
  ],

  pages: {
    links: {
      title: "All My Links",
      kicker: "FYENIKS · LINKS",
      intro: "Everything in one place.",
    },
    portfolio: {
      title: "Selected Work",
      kicker: "FYENIKS · PORTFOLIO",
      intro: "",
    },
    commission: {
      title: "Commissions & Pricing",
      kicker: "FYENIKS · COMMISSIONS",
      intro: "Compare services, tiers, add-ons, packs and fees before placing a commission.",
    },
    tos: {
      title: "Terms of Service",
      kicker: "FYENIKS · T.O.S.",
      intro:
        "Clear commission terms covering scope, pricing, materials, turnaround, revisions, discounts, licensing and delivery.",
    },
    contact: {
      title: "Get in Touch",
      kicker: "FYENIKS · CONTACT",
      intro:
        "Have an edit, website, collaboration, or a custom commission that doesn’t fit the listed services? Send me a message on Discord, X, or via email.",
    },
  },
};
