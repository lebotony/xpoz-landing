import React, { useEffect } from 'react';

const StructuredData: React.FC = () => {
  useEffect(() => {
    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CareerWitch",
        "url": "https://careerwitch.com",
        "logo": "https://careerwitch.com/logo512.png",
        "description": "AI-powered work log tracker and resume builder for students and professionals worldwide",
        "sameAs": [
          "https://twitter.com/careerwitch",
          "https://www.facebook.com/careerwitch",
          "https://www.linkedin.com/company/careerwitch"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "availableLanguage": ["English"]
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "CareerWitch",
        "url": "https://careerwitch.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://careerwitch.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "CareerWitch",
        "operatingSystem": "Web, iOS, Android",
        "applicationCategory": "BusinessApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1247"
        },
        "description": "Track work projects and learning discoveries. Auto-generate AI-powered resumes. Share your profile with recruiters via AI chat."
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "AI Resume Builder & Work Log Tracker",
        "provider": {
          "@type": "Organization",
          "name": "CareerWitch"
        },
        "description": "AI-powered platform for students and professionals to track work, generate resumes, and share profiles with recruiters",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is CareerWitch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CareerWitch is an AI-powered platform that helps students and professionals track their work projects and learning discoveries, auto-generate tailored resumes, and share their profiles with recruiters through AI chat."
            }
          },
          {
            "@type": "Question",
            "name": "Is CareerWitch free for students?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, CareerWitch offers free access to students to log their learning journey, generate CVs, and create shareable profiles for internship opportunities."
            }
          },
          {
            "@type": "Question",
            "name": "How does the AI resume builder work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The AI resume builder analyzes your logged work projects and learning notes, then automatically generates tailored CVs optimized for specific job opportunities or internships."
            }
          },
          {
            "@type": "Question",
            "name": "Can recruiters chat with AI about my profile?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can share a unique profile link where recruiters can chat with AI about your verified work logs, projects, and learning journey to get deeper insights about your experience."
            }
          },
          {
            "@type": "Question",
            "name": "What is work log verification?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Work log verification is an optional feature where your logged work can be approved by managers, supervisors, or clients to add credibility. However, verification is not required to use the platform."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://careerwitch.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Features",
            "item": "https://careerwitch.com/#features"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Sign Up",
            "item": "https://careerwitch.com/#signup"
          }
        ]
      }
    ];

    // Add structured data scripts to head
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup on unmount
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};

export default StructuredData;
