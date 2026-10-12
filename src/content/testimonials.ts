/**
 * Client testimonials, copied verbatim from the client's existing site. The
 * quotes are genuine client feedback, so the wording is not changed; only
 * obvious typos in the attribution lines are corrected.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  organisation: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "At Albury Wodonga Real Estate we have found that ‘BIV Reports’ provide cost effective, well written reports that are easy to follow. They offer a good service responding quickly to any urgent requests and their extensive knowledge and advice provides us with absolute confidence in their product. BIV Reports makes our job easier.",
    name: "Christine Nesbit",
    role: "Principal and Licensee",
    organisation: "Albury Wodonga Real Estate",
  },
  {
    quote:
      "The BIV Reports we receive are clear, concise and of the highest quality. I use BIV Reports for all of my necessary Reports and wouldn’t go anywhere else. Their back office is a pleasure to deal with and their prices are excellent. I have no hesitation in recommending their services.",
    name: "Bryan",
    role: "Owners Corporation Manager",
    organisation: "Tideways",
  },
  {
    quote:
      "They are always obliging to help. A quick service and they travel to the Far South Coast without hesitation. They have provided Plans for our Community Schemes.",
    name: "Leo Paternoster",
    organisation: "Strata Management Services Nowra",
  },
  {
    quote: "Excellent simple format that is easy to understand. Keep up the good work.",
    name: "Michael Antonakiou",
    organisation: "Strathfield Strata Management",
  },
  {
    quote: "Competitive pricing, quick turn around & easy to read reports.",
    name: "Active Strata Services",
    organisation: "UpSolution client",
  },
  {
    quote:
      "I placed an order two days earlier and called them at 5pm as I realised that I needed the Report for a 6pm meeting that night. By 5:45pm I had received the Sinking Fund Report as the property had been inspected the day before. An excellent service, I highly recommend them.",
    name: "Steve Lincoln",
    organisation: "Hawkesbury Real Estate",
  },
  {
    quote:
      "They are reliable, knowledgeable, and a real pleasure to deal with. They have travelled to Wagga three times in the last year and enthusiastically provide this Country service.",
    name: "Helen Davies",
    organisation: "Hore & Davies, Wagga Wagga",
  },
  {
    quote:
      "We obtained sample Sinking Fund Plans from six other providers and chose Sinking Fund Plans (Aust) Pty Limited because your reports were easy to understand, well presented and cost effective. Now that we have our Sinking Fund Plan and Building Insurance Valuation, I can also add how very happy we are with your excellent service and speedy delivery. Thank you. We have no hesitation in recommending your services.",
    name: "Sandra F",
    role: "Secretary",
    organisation: "A self-managed scheme",
  },
  {
    quote:
      "Without a doubt, BIV Reports are the leaders when it comes to obtaining compliance reports for my Owners Corporations. They are fast, reliable and concise. BIV are always happy to assist me with any questions and always provide the right information to help. I would recommend BIV Reports to all my clients as they get the job done.",
    name: "John Baylouni",
    organisation: "ACE Body Corporate Management (Chippendale)",
  },
  {
    quote:
      "We emailed a question to BIV Reports and within an hour we had a reply phone call and an answer. These guys are prompt, professional and caring. BIV Reports know their work and they know strata properties. They have valued our portfolio and we have been very happy with receiving the valuations on time and well before each insurance renewal. I recommend their service to any prudent strata manager.",
    name: "Michael Kimpton",
    role: "Director",
    organisation: "MK Owners Corporation Services Pty Ltd",
  },
  {
    quote:
      "BIV Reports are price competitive and their Reports usually take two weeks, with urgent requests being completed in a few days. I can speak to the Directors easily and Shane Foley has attended one of my Executive Meetings to support me in explaining the purpose and utility of a Maintenance Fund Plan. In addition, queries are responded to very quickly from their office.",
    name: "Emma Fairbrother",
    organisation: "Strata Plan Pty Ltd",
  },
  {
    quote:
      "I am absolutely happy with the service provided by Sinking Fund Plans (Aust) P/L. The feedback from our clients is very good, they can easily understand their Sinking Fund Reports. When we have any queries we always get a good response from Wal or Shane. In one case we gave two days notice for a Sinking Fund Plan and they delivered in the limited time we gave them and at a very good price.",
    name: "Debbie Price",
    organisation: "George Brand Strata",
  },
  {
    quote:
      "Very speedy delivery! Easy to understand reports, good to see photos too, first Sinking Fund Plan I have ordered that’s had photos! Will use again. Thank you!",
    name: "Rebecca Jarrett",
    organisation: "Strathfield Strata Management",
  },
  {
    quote:
      "Building Insurance Valuations are an efficient and diligent company to have associations with. The service Shane and his team provides is highly commendable and the reports provided are professional and prompt.",
    name: "Nicole Fytanis",
    organisation: "Platinum Prestige Strata Management",
  },
  {
    quote:
      "The feedback we get from our owners is that their Sinking Fund Plans are very easy to read and understand. It makes my job easier as a Strata Manager if I don’t have to explain someone else’s report. They are always available for my clients to talk to.",
    name: "Andrew Gavin",
    organisation: "Michael Roberts Strata Management",
  },
  {
    quote:
      "These guys are impressive and have the fastest turnaround for both Sinking Fund Plans and Building Insurance Valuations when required. I like their flexibility and willingness to discuss and add items to the Sinking Fund Plan without any additional charge. They are worth getting on-board.",
    name: "Steve O'Brien",
    organisation: "Strata Partners",
  },
];

/** Shown on the services overview page of the existing site. */
export const servicesTestimonial: Testimonial = {
  quote:
    "We have been so pleased with the service provided to us by Building Insurance Valuations Pty Limited. Shane and his staff are fantastic to deal with. They really are one of those companies that you just love dealing with because they make it all so easy! Any additional services we have requested have been handled seamlessly. Being in Armidale has proved no trouble for Building Insurance Valuations Pty Limited, we never imagined we would receive such great service from Sydney; they may as well be just down the road!",
  name: "Sarah Clarke",
  organisation: "Armidale First National Real Estate",
};
