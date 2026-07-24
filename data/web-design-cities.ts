import { cities } from "@/data/cities";

export type WebDesignCityFaq = {
  question: string;
  answer: string;
};

export type WebDesignCityContent = {
  citySlug: string;
  intro: string;
  whyBetterWebsites: string[];
  localNotes: string;
  faqs: WebDesignCityFaq[];
};

/**
 * Unique copy packs for every Macomb County /web-design/[city] page.
 * Combinations not listed here should not be routed (we include all cities).
 */
export const webDesignCityPages: WebDesignCityContent[] = [
  {
    citySlug: "sterling-heights",
    intro:
      "Sterling Heights businesses compete across Hall Road, Van Dyke, and dense residential corridors. A clear, fast website helps customers choose you before they drive past three other options. Macomb Code builds modern web design for Sterling Heights small businesses that need more than a template — pages that load quickly, explain your offer, and turn local search into calls and quote requests.",
    whyBetterWebsites: [
      "Neighbors compare two or three providers online before they ever call",
      "Hall Road and Van Dyke traffic means customers expect a polished first impression",
      "Mobile search dominates — slow pages lose leads to the next listing",
      "A local Macomb partner can update hours, offers, and seasonal campaigns without drama",
    ],
    localNotes:
      "Sterling Heights is one of Michigan’s largest cities, with medical offices, retailers, contractors, and service brands serving families across central Macomb. Your site should speak to that scale while staying personal and easy to contact.",
    faqs: [
      {
        question: "Do you offer web design for Sterling Heights businesses?",
        answer:
          "Yes. Macomb Code designs and builds websites for Sterling Heights companies — from service businesses to clinics and retailers — with local SEO structure and clear conversion paths.",
      },
      {
        question: "How is Macomb Code different from a national website builder?",
        answer:
          "We focus on Macomb County markets, write for how locals search, and stay available for updates after launch instead of leaving you with a login and a template.",
      },
      {
        question: "Can you help with SEO for Sterling Heights searches?",
        answer:
          "We build on-page structure, city-aware messaging, and clear service pages aimed at high-intent searches like web design and your industry keywords in Sterling Heights.",
      },
    ],
  },
  {
    citySlug: "warren",
    intro:
      "Warren’s manufacturers, retailers, and service firms need sites that load fast on mobile and make the next step obvious — call, quote, or book — for customers searching along Van Dyke and 12 Mile. Macomb Code delivers professional website design in Warren, MI for businesses that want a digital storefront as serious as their reputation.",
    whyBetterWebsites: [
      "Warren’s size means more competitors fighting for the same local searches",
      "Industrial and retail customers both expect clear contact and credibility online",
      "Corridor traffic from Van Dyke and 12 Mile starts with a Google search",
      "An outdated site signals an outdated operation to new customers",
    ],
    localNotes:
      "As Michigan’s third-largest city, Warren mixes manufacturing campuses, retail strips, and neighborhood service businesses. Web design here should feel trustworthy, fast, and ready for phone leads.",
    faqs: [
      {
        question: "Can you redesign an existing Warren business website?",
        answer:
          "Yes. We rebuild or refresh sites that look dated, load slowly, or bury the call-to-action — common issues for long-running Warren businesses.",
      },
      {
        question: "Do you work with manufacturers and B2B firms in Warren?",
        answer:
          "We do. Many Warren companies need clear capability pages, contact paths for buyers, and mobile-friendly presentations — not just consumer storefronts.",
      },
      {
        question: "What does web design cost for a Warren small business?",
        answer:
          "Scope drives price. We outline options on a short call — from focused marketing sites to retainers that keep your site improving after launch.",
      },
    ],
  },
  {
    citySlug: "clinton-township",
    intro:
      "Clinton Township shops, clinics, and contractors win when the website matches how locals search: by neighborhood, corridor, and “near me.” Macomb Code helps Clinton Township small businesses build modern websites that generate customers — with clear offers, fast mobile pages, and local SEO built in from day one.",
    whyBetterWebsites: [
      "One of Macomb’s densest markets — customers have plenty of alternatives",
      "Commercial corridors reward businesses that look ready online",
      "Clinics and contractors lose leads when booking or quote paths are buried",
      "Seasonal campaigns need a site you can update without waiting weeks",
    ],
    localNotes:
      "Clinton Township’s population and commercial density create real competition. Your website should make it obvious why a neighbor should choose you — and how to reach you in one tap.",
    faqs: [
      {
        question: "Is Macomb Code a Clinton Township web design company?",
        answer:
          "We are a Macomb County agency serving Clinton Township and nearby communities. We build websites specifically for how local customers search and convert.",
      },
      {
        question: "How long does a new Clinton Township website take?",
        answer:
          "Most marketing sites land in a matter of weeks once content and goals are clear. We set a realistic timeline on the first conversation.",
      },
      {
        question: "Do you offer ongoing website care after launch?",
        answer:
          "Yes. Our web design retainers cover updates, local SEO tweaks, and fixes so your Clinton Township site keeps working after launch day.",
      },
    ],
  },
  {
    citySlug: "macomb-township",
    intro:
      "Macomb Township’s growing mix of professionals and service businesses needs a digital storefront that feels local and trustworthy — not a template that could belong to any suburb. Macomb Code builds website design for Macomb Township owners who want more calls, clearer branding, and a partner who understands the area’s growth.",
    whyBetterWebsites: [
      "New neighborhoods mean new customers discovering you for the first time online",
      "Family-run businesses compete against franchises with polished digital presence",
      "Fast growth rewards companies that look established and easy to contact",
      "Local search is how many residents find HVAC, dental, roofing, and dining",
    ],
    localNotes:
      "Macomb Township continues to add households and commercial demand. A modern site helps you capture that growth instead of sending it to a competitor with a sharper Google listing experience.",
    faqs: [
      {
        question: "Do you build websites for Macomb Township businesses?",
        answer:
          "Yes. We design and develop sites for Macomb Township professionals, contractors, and retailers who need local visibility and strong lead paths.",
      },
      {
        question: "Can you connect my site to booking or quote tools?",
        answer:
          "We can integrate forms, scheduling, or quote workflows that match how your team already works — without forcing awkward software on your staff.",
      },
      {
        question: "Will my site mention Macomb Township for SEO?",
        answer:
          "We write and structure pages so local intent is clear, including city-aware titles, copy, and internal links to related Macomb County pages.",
      },
    ],
  },
  {
    citySlug: "shelby-township",
    intro:
      "Shelby Township businesses along Hall Road and beyond need sites that look sharp, load quickly, and make it easy for busy customers to get in touch on the first visit. Macomb Code provides professional web design in Shelby Township for owners who treat their website like a sales tool — not a digital brochure.",
    whyBetterWebsites: [
      "Hall Road shoppers and clients research on phones before they visit",
      "Northern Macomb competition is rising as suburbs keep growing",
      "Weak mobile UX costs quote requests during evening search sessions",
      "A clear brand online supports word-of-mouth you already earn offline",
    ],
    localNotes:
      "Shelby Township’s busy corridors and residential base create steady demand for services. Your website should match that energy with speed, clarity, and strong calls to action.",
    faqs: [
      {
        question: "Who do you design websites for in Shelby Township?",
        answer:
          "Service businesses, clinics, restaurants, contractors, and professional offices — anyone who needs more qualified local leads from their site.",
      },
      {
        question: "Do you handle hosting and updates?",
        answer:
          "We can coordinate hosting, SSL, backups, and monthly updates through our web design retainers so you’re not hunting freelancers for every change.",
      },
      {
        question: "Can I see examples before we start?",
        answer:
          "Yes. Browse our demos and work samples, then book a call — we’ll talk about what fits Shelby Township customers in your industry.",
      },
    ],
  },
  {
    citySlug: "st-clair-shores",
    intro:
      "St. Clair Shores restaurants, marina businesses, and professional services benefit from a polished site that reflects lakeside reputation and converts browsers into booked tables or appointments. Macomb Code designs websites for St. Clair Shores businesses that need to look as good online as they do on Jefferson.",
    whyBetterWebsites: [
      "Lakeside dining and services compete on atmosphere and trust",
      "Visitors and locals both search before they choose a restaurant or pro",
      "Seasonal tourism and events reward sites that stay current",
      "Mobile maps and reviews send traffic that expects a strong website",
    ],
    localNotes:
      "St. Clair Shores blends marina culture, dining, and neighborhood professionals. Web design here should feel polished, local, and conversion-ready — not generic Midwest stock photography.",
    faqs: [
      {
        question: "Do you design restaurant websites in St. Clair Shores?",
        answer:
          "Yes. Menus, hours, location, and reservation CTAs are core to how we build for lakeside dining and hospitality businesses.",
      },
      {
        question: "Can you help professional offices in St. Clair Shores too?",
        answer:
          "Absolutely — clinics, advisors, and service firms get the same focus on clarity, trust, and easy contact paths.",
      },
      {
        question: "How do I get a free website review?",
        answer:
          "Use our free website review tool or book a call. We’ll look at speed, clarity, and lead paths for your St. Clair Shores site.",
      },
    ],
  },
  {
    citySlug: "center-line",
    intro:
      "Center Line’s compact, walkable core rewards businesses that are easy to find online and easy to contact. Macomb Code builds website design for Center Line shops and professionals who want a clear digital presence without big-agency complexity.",
    whyBetterWebsites: [
      "Small-city customers still start with Google before they walk in",
      "Being nested near Warren means competing with larger neighbors online",
      "A sharp site makes a compact business feel established and ready",
      "Local searches often include nearby Warren and southern Macomb terms",
    ],
    localNotes:
      "Center Line sits inside the Warren area with a distinct local identity. Your site should own that neighborhood feel while ranking for the services people actually need.",
    faqs: [
      {
        question: "Do you work with Center Line small businesses?",
        answer:
          "Yes. We build practical marketing sites for Center Line owners who need leads, not bloated enterprise websites.",
      },
      {
        question: "Should my site target Warren searches too?",
        answer:
          "Often yes. We plan city and nearby-area messaging so you capture relevant search demand without confusing visitors about where you serve.",
      },
      {
        question: "What’s the first step?",
        answer:
          "Book a call or request a free website review. We’ll map goals, timeline, and whether a redesign or new build fits best.",
      },
    ],
  },
  {
    citySlug: "eastpointe",
    intro:
      "Eastpointe businesses along Gratiot and Nine Mile win when customers can confirm hours, services, and trust in seconds. Macomb Code delivers web design for Eastpointe companies that want a stronger first impression and more phone calls from local search.",
    whyBetterWebsites: [
      "Corridor traffic starts with search and map results",
      "Neighborhood businesses lose to competitors with clearer CTAs",
      "Mobile-first design matters for customers checking you at a stoplight",
      "A modern site supports hiring, partnerships, and customer confidence",
    ],
    localNotes:
      "Eastpointe’s southern Macomb location puts you near dense residential demand. Web design should emphasize local credibility and frictionless contact.",
    faqs: [
      {
        question: "Can you redesign my Eastpointe business website?",
        answer:
          "Yes. We refresh outdated sites with faster pages, clearer offers, and stronger local messaging for Eastpointe customers.",
      },
      {
        question: "Do you help with Google Business Profile alignment?",
        answer:
          "We align website NAP-style details and service messaging so your site supports the way customers find you on Google — you manage the profile; we make the site match.",
      },
      {
        question: "Which industries do you serve in Eastpointe?",
        answer:
          "Contractors, clinics, restaurants, retailers, and professional services — anyone competing for local attention online.",
      },
    ],
  },
  {
    citySlug: "fraser",
    intro:
      "Fraser’s contractors, clinics, and family businesses compete on trust. Macomb Code builds websites for Fraser owners who want that trust to show up online — with clear services, proof, and a next step that’s obvious on mobile.",
    whyBetterWebsites: [
      "Word of mouth still matters — a weak site undercuts referrals",
      "Close-knit markets punish businesses that look abandoned online",
      "Quote and appointment requests happen after hours on phones",
      "Local SEO helps you show up when neighbors search nearby",
    ],
    localNotes:
      "Fraser sits among southern Macomb communities where reputation travels fast. Your website should reinforce the reputation you earn on the job and in the office.",
    faqs: [
      {
        question: "Do you offer website design for Fraser businesses?",
        answer:
          "Yes. Macomb Code designs marketing sites for Fraser small businesses focused on leads and local visibility.",
      },
      {
        question: "Can you show project photos or testimonials?",
        answer:
          "We structure sites so proof — photos, reviews, and case-style blurbs — sits where visitors need confidence before they call.",
      },
      {
        question: "Do you also build software or AI tools?",
        answer:
          "Yes. Beyond web design, we offer software development and AI solutions when your operations need more than a marketing site.",
      },
    ],
  },
  {
    citySlug: "roseville",
    intro:
      "Roseville is retail- and service-heavy — customers often search online before they ever walk through the door. Macomb Code creates website design for Roseville businesses that need to convert that research into visits, calls, and booked appointments.",
    whyBetterWebsites: [
      "Retail corridors mean shoppers compare options instantly",
      "Service businesses lose leads when hours and offers are unclear",
      "Speed and clarity beat flashy designs that confuse visitors",
      "Local competitors with newer sites set customer expectations",
    ],
    localNotes:
      "Roseville’s commercial energy rewards businesses that look open, ready, and easy to reach. We build for that reality — not for awards, for appointments.",
    faqs: [
      {
        question: "What makes a good Roseville business website?",
        answer:
          "Fast mobile pages, clear offers, obvious contact paths, and local messaging that matches how Roseville customers search.",
      },
      {
        question: "Can you improve an existing site instead of starting over?",
        answer:
          "Sometimes a focused refresh is enough. We’ll recommend rebuild vs. redesign after reviewing your current site and goals.",
      },
      {
        question: "How do I book a consultation?",
        answer:
          "Use Book A Call or call us directly. We’ll talk scope, timeline, and whether web design, software, or support fits best.",
      },
    ],
  },
  {
    citySlug: "grosse-pointe-shores",
    intro:
      "Grosse Pointe Shores is a small lakeside community where reputation and presentation matter. Macomb Code designs refined, conversion-focused websites for local professionals and service businesses that need to look polished without feeling corporate.",
    whyBetterWebsites: [
      "Affluent, reputation-sensitive markets judge presentation quickly",
      "Small communities still rely on Google and referrals online",
      "A refined site supports premium positioning",
      "Nearby Grosse Pointe and southern Macomb search spillover is real",
    ],
    localNotes:
      "On Macomb’s southern lakeside edge, your digital presence should feel calm, credible, and local — matching the standards of the neighborhoods you serve.",
    faqs: [
      {
        question: "Do you design websites for Grosse Pointe Shores businesses?",
        answer:
          "Yes. We build custom marketing sites for professionals and local services on the lakeside southern Macomb edge.",
      },
      {
        question: "Will the design feel premium without being flashy?",
        answer:
          "That’s the goal — restrained typography, strong photography guidance, and clear CTAs that respect your brand.",
      },
      {
        question: "Can you target nearby communities too?",
        answer:
          "We plan internal links and copy so you capture relevant nearby demand while keeping your service area clear.",
      },
    ],
  },
  {
    citySlug: "utica",
    intro:
      "Utica’s historic downtown sits inside fast-growing suburban demand. Macomb Code builds modern website design for Utica businesses that want downtown character online — with the speed and lead paths today’s customers expect.",
    whyBetterWebsites: [
      "Historic charm online still needs modern mobile performance",
      "Surrounding suburbs bring new customers who discover you via search",
      "Downtown retailers and pros compete with big-box polish",
      "Event and seasonal traffic rewards sites that stay updated",
    ],
    localNotes:
      "Utica blends Main Street identity with Hall Road–adjacent growth. Your website should honor local character while converting suburban search traffic.",
    faqs: [
      {
        question: "Can you build a website that fits Utica’s downtown feel?",
        answer:
          "Yes. We design for place — photography, tone, and structure that feel local, not franchise-generic.",
      },
      {
        question: "Do you work with restaurants and boutiques in Utica?",
        answer:
          "We do. Hospitality and retail sites get menu or catalog clarity, hours, and strong visit/call CTAs.",
      },
      {
        question: "What’s included in your web design process?",
        answer:
          "Discovery, structure, design, build, launch, and optional retainer care — explained clearly before we start.",
      },
    ],
  },
  {
    citySlug: "mount-clemens",
    intro:
      "Mount Clemens is Macomb County’s seat — a downtown of law firms, clinics, restaurants, and civic neighbors. Macomb Code designs websites for Mount Clemens businesses that need credibility, clarity, and a professional digital front door.",
    whyBetterWebsites: [
      "Downtown professionals are judged by presentation as much as credentials",
      "Patients and clients research offices before they call",
      "Restaurant and retail traffic depends on hours and atmosphere online",
      "County-seat visibility should not mean a neglected website",
    ],
    localNotes:
      "Mount Clemens combines civic energy with local hospitality and professional services. Web design here should feel established, approachable, and ready for inquiries.",
    faqs: [
      {
        question: "Do you design websites for Mount Clemens professional offices?",
        answer:
          "Yes — legal, medical, advisory, and service firms that need trust-first design and easy contact paths.",
      },
      {
        question: "Can restaurants in downtown Mount Clemens work with you?",
        answer:
          "Absolutely. We build menu-forward sites with location, hours, and reservation or call CTAs.",
      },
      {
        question: "Do you serve all of Macomb County from Mount Clemens work?",
        answer:
          "We serve the full county. Mount Clemens projects often include nearby township and city targeting as needed.",
      },
    ],
  },
  {
    citySlug: "new-baltimore",
    intro:
      "New Baltimore’s Anchor Bay shops, waterfront businesses, and service providers need a digital storefront that feels local and inviting. Macomb Code builds website design for New Baltimore owners who want more visits from nearby townships and weekend traffic.",
    whyBetterWebsites: [
      "Waterfront and Anchor Bay visitors research before they drive over",
      "Township neighbors often search by city name for services",
      "Seasonal swings reward sites that highlight what’s open and current",
      "Small-city brands need polish without big-city agency overhead",
    ],
    localNotes:
      "New Baltimore anchors a lakeside market that stretches into Chesterfield and beyond. Your site should welcome both locals and visitors with clear offers and contact options.",
    faqs: [
      {
        question: "Do you build websites for New Baltimore businesses?",
        answer:
          "Yes. We design marketing sites for shops, hospitality, and service providers around Anchor Bay.",
      },
      {
        question: "Can you help us show up for Chesterfield searches too?",
        answer:
          "When it fits your service area, we plan nearby-city messaging and internal links so relevant searches find you.",
      },
      {
        question: "How do we start?",
        answer:
          "Request a free website review or book a call — we’ll review your current presence and recommend next steps.",
      },
    ],
  },
  {
    citySlug: "chesterfield-township",
    intro:
      "Chesterfield Township is growing — contractors, retailers, and new brands are establishing themselves along Anchor Bay corridors. Macomb Code provides web design for Chesterfield Township businesses that need to look established from day one and keep winning local search as the market expands.",
    whyBetterWebsites: [
      "Growth markets punish businesses that wait too long to modernize online",
      "New competitors arrive with fresh sites and aggressive CTAs",
      "Home-service demand follows new construction and renovations",
      "Clear service-area pages help you cover township and nearby cities",
    ],
    localNotes:
      "Chesterfield’s expansion means opportunity — if customers can find you. We build sites that capture that demand with local SEO and conversion-focused layouts.",
    faqs: [
      {
        question: "Is Macomb Code a good fit for Chesterfield Township startups?",
        answer:
          "Yes. New businesses get a clear launch site with room to grow — branding, pages, and lead paths without unnecessary complexity.",
      },
      {
        question: "Do you work with contractors in Chesterfield?",
        answer:
          "Contractors are a core focus — quote CTAs, project proof, and city pages for the areas you serve.",
      },
      {
        question: "Can you maintain the site after launch?",
        answer:
          "Our retainers cover updates, monitoring, and ongoing improvements so your Chesterfield site stays current.",
      },
    ],
  },
  {
    citySlug: "harrison-township",
    intro:
      "Harrison Township’s marina services, restaurants, and home services need to show up when lakeside customers search. Macomb Code designs websites for Harrison Township businesses that convert map traffic into reserved tables, service calls, and booked appointments.",
    whyBetterWebsites: [
      "Lakeside search behavior is mobile-first and urgent",
      "Marina and hospitality brands compete on atmosphere and availability",
      "Home services win when emergency and seasonal CTAs are obvious",
      "Tourism and local demand both start with Google",
    ],
    localNotes:
      "Harrison Township’s waterfront identity should come through online — without sacrificing speed or clarity. We design for both weekend visitors and year-round residents.",
    faqs: [
      {
        question: "Do you design marina and restaurant sites in Harrison Township?",
        answer:
          "Yes. Hospitality and lakeside services get location-forward design, hours, and strong booking or call paths.",
      },
      {
        question: "Can home service companies in Harrison Township work with you?",
        answer:
          "Absolutely — HVAC, contractors, and related trades get quote-first sites tuned for local search.",
      },
      {
        question: "Will my site load well for visitors on their phones?",
        answer:
          "Mobile performance is a core requirement for every Macomb Code web design project.",
      },
    ],
  },
  {
    citySlug: "washington-township",
    intro:
      "Washington Township blends suburban growth with nearby Romeo Village amenities. Macomb Code builds website design for Washington Township businesses that want to capture northern Macomb demand with a professional, conversion-ready site.",
    whyBetterWebsites: [
      "Northern growth brings new households researching local providers",
      "Competition from Romeo and Shelby-adjacent markets is increasing",
      "Home services and retail need clear digital proof",
      "A strong site supports hiring and partnerships as you scale",
    ],
    localNotes:
      "Washington Township customers expect suburban convenience. Your website should feel modern, local, and easy to act on — call, quote, or visit.",
    faqs: [
      {
        question: "Do you serve Washington Township for web design?",
        answer:
          "Yes. We design and build sites for Washington Township owners across services, retail, and professional categories.",
      },
      {
        question: "Should we link to Romeo pages too?",
        answer:
          "If you serve both markets, we connect city and village pages so internal linking supports how customers search.",
      },
      {
        question: "What’s a typical timeline?",
        answer:
          "We set timelines after discovery. Many marketing sites launch in weeks once content is ready.",
      },
    ],
  },
  {
    citySlug: "romeo",
    intro:
      "Romeo’s historic village charm is perfect for boutique brands and local service businesses — if the website matches. Macomb Code designs web experiences for Romeo businesses that feel handmade and local while converting modern search traffic.",
    whyBetterWebsites: [
      "Visitors research downtown Romeo before they make the trip",
      "Boutique brands lose trust with generic templates",
      "Event weekends reward sites with clear hours and offers",
      "Northern Macomb service businesses need local SEO beyond the village",
    ],
    localNotes:
      "Romeo’s Main Street identity is a marketing asset. We design websites that carry that character into search results and mobile visits.",
    faqs: [
      {
        question: "Do you design websites for Romeo shops and restaurants?",
        answer:
          "Yes. We build place-driven sites for hospitality and retail that highlight Romeo’s character and convert visitors.",
      },
      {
        question: "Can service businesses outside downtown still work with you?",
        answer:
          "Yes — many Romeo-area trades and professionals need city-aware pages for northern Macomb searches.",
      },
      {
        question: "Is there a restaurant demo we can see?",
        answer:
          "Explore our Romeo & Vine demo for an example of hospitality-focused web design.",
      },
    ],
  },
  {
    citySlug: "armada",
    intro:
      "In Armada, word of mouth still matters — and a sharp website multiplies it. Macomb Code builds practical website design for Armada businesses that want to look professional online without overcomplicating a small-village operation.",
    whyBetterWebsites: [
      "Referrals fade if newcomers can’t verify you online",
      "Small markets still lose leads to competitors with better sites",
      "Clear hours and contact info prevent missed calls",
      "Simple, fast sites outperform bloated builds for village businesses",
    ],
    localNotes:
      "Armada’s northern Macomb setting rewards straightforward digital presence. We keep scope practical while making sure you look ready for new customers.",
    faqs: [
      {
        question: "Do you work with Armada small businesses?",
        answer:
          "Yes. We design lean, effective marketing sites for Armada owners who need results without enterprise complexity.",
      },
      {
        question: "Can you cover Armada Township as well?",
        answer:
          "Yes — we often plan messaging for both the village and township when your service area spans both.",
      },
      {
        question: "How do I request a demo of your work?",
        answer:
          "Browse our demos online or book a call and we’ll walk through examples relevant to your industry.",
      },
    ],
  },
  {
    citySlug: "armada-township",
    intro:
      "Armada Township’s agricultural and local operators need clear, professional online presence. Macomb Code delivers website design for Armada Township businesses that want customers across northern Macomb to find them fast and get in touch easily.",
    whyBetterWebsites: [
      "Rural-suburban customers still start with Google Maps and search",
      "Service radius marketing needs clear area messaging",
      "Operators competing with larger towns need digital credibility",
      "Phone-first CTAs matter when customers are on the road",
    ],
    localNotes:
      "Armada Township businesses often serve a wide radius. We structure sites so service areas and contact paths are unmistakable.",
    faqs: [
      {
        question: "Can you build a site for an Armada Township contractor or farm-adjacent business?",
        answer:
          "Yes. We tailor structure and messaging to how northern Macomb customers search for your services.",
      },
      {
        question: "Do you offer ongoing support?",
        answer:
          "Retainers are available for updates, fixes, and steady improvements after launch.",
      },
      {
        question: "Will the site work on mobile?",
        answer:
          "Every Macomb Code site is mobile-first — essential for customers searching from trucks, fields, or driveways.",
      },
    ],
  },
  {
    citySlug: "bruce-township",
    intro:
      "Bruce Township’s rural-suburban mix creates demand for home services and small businesses that look ready online. Macomb Code builds web design for Bruce Township owners who want northern Macomb customers to choose them with confidence.",
    whyBetterWebsites: [
      "Growing home-service demand follows residential expansion",
      "Customers compare reviews and websites before calling",
      "Wide service areas need clear geographic messaging",
      "A modern site supports word-of-mouth from Romeo-area networks",
    ],
    localNotes:
      "North of Romeo, Bruce Township businesses serve neighbors who expect professionalism. Your website should make that professionalism obvious in seconds.",
    faqs: [
      {
        question: "Do you design websites for Bruce Township businesses?",
        answer:
          "Yes. We build marketing sites for home services, trades, and local operators across Bruce Township.",
      },
      {
        question: "Can you help with quote forms?",
        answer:
          "We implement mobile-friendly quote and contact forms that capture the details your team needs.",
      },
      {
        question: "How do we get a free review of our current site?",
        answer:
          "Use Get Your Free Website Review on our analyzer tool, or book a call for a guided walkthrough.",
      },
    ],
  },
  {
    citySlug: "ray-township",
    intro:
      "Ray Township contractors and family businesses often serve a wide radius. Macomb Code designs websites that make that radius clear, your services obvious, and the next step — call or quote — impossible to miss.",
    whyBetterWebsites: [
      "Wide coverage areas confuse visitors if the site doesn’t explain them",
      "Quiet markets still lose work to louder online competitors",
      "Family businesses need digital presence that matches offline trust",
      "Phone leads are often the primary conversion — design should reflect that",
    ],
    localNotes:
      "Ray Township operators win with reliability. We build sites that communicate reliability quickly and route customers to contact without friction.",
    faqs: [
      {
        question: "Is web design worth it for a Ray Township business?",
        answer:
          "If customers search Google before they call, yes. A clear site captures demand you’d otherwise lose to competitors.",
      },
      {
        question: "Can you list multiple towns we serve?",
        answer:
          "Yes. We structure service-area messaging and internal links for the communities you actually cover.",
      },
      {
        question: "What’s the booking process?",
        answer:
          "Book a short call, share your goals, and we’ll recommend a path — new site, refresh, or retainer support.",
      },
    ],
  },
  {
    citySlug: "lenox-township",
    intro:
      "Lenox Township — home to New Haven and nearby corridors — is a practical market for websites that drive phone calls. Macomb Code builds conversion-focused web design for Lenox Township businesses that care more about leads than fluff.",
    whyBetterWebsites: [
      "Gratiot and corridor traffic starts with search",
      "Practical buyers want hours, services, and a phone number fast",
      "Growing villages nearby create new customer discovery",
      "Competitors with newer sites set the bar for credibility",
    ],
    localNotes:
      "Lenox Township businesses succeed with straightforward offers. We design sites that respect that — clear, fast, and built for calls.",
    faqs: [
      {
        question: "Do you serve Lenox Township for website design?",
        answer:
          "Yes. We design and develop sites for Lenox Township and New Haven–area businesses.",
      },
      {
        question: "Can my site feature New Haven specifically?",
        answer:
          "If you operate there, we can emphasize New Haven messaging and link related city pages appropriately.",
      },
      {
        question: "Do you offer AI or software beyond the website?",
        answer:
          "Yes — when intake, follow-up, or operations need automation, we can extend into AI solutions or custom software.",
      },
    ],
  },
  {
    citySlug: "new-haven",
    intro:
      "New Haven is growing along Gratiot — new businesses need to stand out from day one. Macomb Code provides website design for New Haven owners who want a credible launch presence and a clear path for customers to call.",
    whyBetterWebsites: [
      "New businesses without a site look unfinished to searching customers",
      "Growth corridors reward early movers with strong digital presence",
      "Local competition includes nearby township and city providers",
      "Launch marketing fails if the website can’t convert interest",
    ],
    localNotes:
      "New Haven’s growth is an opening. We help you claim it with a site that looks established, loads fast, and turns curiosity into contact.",
    faqs: [
      {
        question: "Can you build a brand-new website for a New Haven startup?",
        answer:
          "Yes. We specialize in practical launch sites with branding guidance, core pages, and lead capture.",
      },
      {
        question: "How fast can we launch?",
        answer:
          "Depends on content readiness. We’ll give a clear timeline after a short discovery call.",
      },
      {
        question: "Do you help with ongoing updates after opening?",
        answer:
          "Retainers keep hours, offers, and pages current as your New Haven business evolves.",
      },
    ],
  },
  {
    citySlug: "richmond",
    intro:
      "Richmond is a northern gateway city serving Macomb and St. Clair customers who search locally for services. Macomb Code designs websites for Richmond businesses that need to win on both sides of that border with clear offers and strong local SEO.",
    whyBetterWebsites: [
      "Gateway markets pull search traffic from multiple counties",
      "Customers comparing providers need proof and easy contact",
      "Northern Macomb growth increases competition for attention",
      "A weak site wastes the advantage of a recognizable city name",
    ],
    localNotes:
      "Richmond businesses often serve a broader radius than their peers. We plan web design and messaging to match that real-world footprint.",
    faqs: [
      {
        question: "Do you design websites for Richmond, MI businesses?",
        answer:
          "Yes. Macomb Code builds marketing sites for Richmond companies competing for northern Macomb and nearby St. Clair demand.",
      },
      {
        question: "Can you help with service-area SEO?",
        answer:
          "We structure pages and copy for the cities and townships you serve — without stuffing or confusing visitors.",
      },
      {
        question: "What’s the best way to start?",
        answer:
          "Get a free website review or book a call. We’ll prioritize fixes that improve leads first.",
      },
    ],
  },
  {
    citySlug: "richmond-township",
    intro:
      "Richmond Township operators win with clear websites and strong reviews. Macomb Code builds website design for Richmond Township businesses that want rural-to-suburban customers to find them, trust them, and call.",
    whyBetterWebsites: [
      "Rural townships still lose deals to competitors with better Google presence",
      "Review-driven decisions need a site that confirms credibility",
      "Wide service radii require clear geographic messaging",
      "Mobile contact paths matter for customers on the move",
    ],
    localNotes:
      "Around Richmond, local operators compete on reliability. Your website should make reliability visible — services, proof, and a one-tap call button.",
    faqs: [
      {
        question: "Do you work with Richmond Township contractors and services?",
        answer:
          "Yes. Trades and local services are a core fit for our quote-first web design approach.",
      },
      {
        question: "Can the site highlight both Richmond and the township?",
        answer:
          "When it matches how you market, we connect city and township pages so searchers land in the right place.",
      },
      {
        question: "Do you offer demos for contractor-style businesses?",
        answer:
          "Browse our contractor and trade-related demos, then book a call to discuss a custom build.",
      },
    ],
  },
  {
    citySlug: "memphis",
    intro:
      "Memphis sits on Macomb’s northern edge, serving a broad surrounding area. Macomb Code designs websites for Memphis businesses that need to look credible across a wide radius and convert phone-first customers without friction.",
    whyBetterWebsites: [
      "Edge-of-county markets draw customers from multiple communities",
      "Small-city brands need digital polish to compete with larger towns",
      "Phone and quote CTAs outperform complex funnels for many local services",
      "A neglected site makes a reliable business look inactive",
    ],
    localNotes:
      "Memphis businesses often punch above their weight geographically. We build sites that explain where you serve and make contact effortless.",
    faqs: [
      {
        question: "Do you offer web design for Memphis, MI businesses?",
        answer:
          "Yes. We design and build marketing websites for Memphis and northern Macomb operators.",
      },
      {
        question: "Can you list nearby towns we serve?",
        answer:
          "Yes — clear service-area sections and internal links help customers confirm you cover their location.",
      },
      {
        question: "How do I book a call with Macomb Code?",
        answer:
          "Use Book A Call on our site or call us directly. We’ll talk goals, timeline, and fit.",
      },
    ],
  },
];

export function getWebDesignCityPage(
  citySlug: string,
): WebDesignCityContent | undefined {
  return webDesignCityPages.find((page) => page.citySlug === citySlug);
}

export function assertAllCitiesHaveWebDesignPages() {
  const missing = cities.filter(
    (city) => !webDesignCityPages.some((page) => page.citySlug === city.slug),
  );
  return missing;
}
