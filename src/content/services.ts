/**
 * Service page content. Facts (legislation, figures, process steps) come from
 * the existing biv.com.au service pages, edited for clarity.
 */

export type ServiceSlug = "biv" | "sfp" | "whs" | "asb";
export type ServiceIconName = "building" | "chart" | "shield" | "alert";

export type ContentBlock = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  /** Optional link rendered after the paragraphs. */
  links?: { label: string; href: string }[];
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  /** Lower-case phrase for use mid-sentence, e.g. "asbestos reports". */
  phrase: string;
  icon: ServiceIconName;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  lead: string;
  summary: string;
  highlights: string[];
  why: ContentBlock;
  sections: ContentBlock[];
  process: { heading: string; intro: string; steps: string[] };
  faqHref: string;
  faqLabel: string;
};

export const turnaround = {
  heading: "Turnaround and fees",
  text: "Most reports are delivered within 3 to 7 business days, and urgent jobs can often be prioritised. We will beat any competitor's written quote prepared on the same basis.",
};

export const services: Service[] = [
  {
    slug: "biv",
    name: "Building Insurance Valuation",
    shortName: "Insurance Valuations",
    phrase: "building insurance valuations",
    icon: "building",
    metaTitle: "Building Insurance Valuations for Strata Schemes",
    metaDescription:
      "Certificates of value from Registered Valuers that set an accurate sum insured for strata, community and stand-alone properties, covering demolition, fees, escalation and GST.",
    headline: "An accurate sum insured, certified by a Registered Valuer",
    lead: "Our certificates of value set out what it would genuinely cost to rebuild your strata or community scheme, so the owners corporation is neither under-insured nor paying for cover it doesn't need.",
    summary:
      "Certificates of value for the full replacement and reinstatement cost of the buildings in a strata or community plan, prepared to meet the relevant legislation.",
    highlights: [
      "Prepared by a Registered Valuer, without limitation",
      "$5 million professional indemnity cover",
      "Meets s161 of the Strata Schemes Management Act 2015 (NSW)",
    ],
    why: {
      heading: "Why does a strata scheme need an insurance valuation?",
      paragraphs: [
        "Every strata scheme should have its buildings valued for insurance purposes by a qualified valuer at least once every five years. In practice we recommend a fresh valuation every two to three years, and every year for larger commercial and industrial properties, so the sum insured keeps pace with what it actually costs to rebuild.",
      ],
    },
    sections: [
      {
        heading: "What our certificates of value cover",
        paragraphs: [
          "We value the replacement cost and reinstatement of every building in the strata or community plan so the owners corporation can comply with its obligations. In New South Wales, for example, those obligations sit in section 161 of the Strata Schemes Management Act 2015 and clause 39 of the Strata Schemes Management Regulation 2016.",
          "Each report itemises the components that make up a valid insurance valuation, including demolition and debris removal, professional and council fees, escalation in construction costs and GST. We also account for cost factors such as a regional or hard-to-access location, the construction materials used and the standard of finishes.",
        ],
      },
      {
        heading: "Experience you can rely on",
        paragraphs: [
          "Our chief valuer has more than 30 years of experience, from giving expert evidence in courts to due diligence on some of Australia's largest property transactions and on modest suburban cottages. Insurance valuation is our speciality: in 2014 alone we assessed more than $11 billion worth of property.",
          "We are members of a Cover of Excellence scheme under the Professional Standards Councils (NSW) and hold $5,000,000 in professional indemnity insurance. Whoever you engage, we recommend that your valuation is carried out by a Registered Valuer.",
        ],
      },
      {
        heading: "How often should you revalue?",
        paragraphs: [
          "Experienced strata and property managers recommend a new valuation at least every three years, and for some buildings every year. The safest approach is an annual inspection by a Registered Valuer so your sum insured tracks real movements in building costs.",
          "If a building is under-insured, the insurer may apply the policy's co-insurance or averaging clause and pay only part of the true replacement cost. The shortfall can fall on the owners, or on a strata manager found negligent for not obtaining a current valuation.",
          "Construction costs can rise far faster than CPI. In 2004, for example, the cost of concrete and steel climbed by more than 25 per cent. Simply indexing last year's figure by CPI, or by an arbitrary percentage, is a risk. A current valuation gives you an accurate sum insured and keeps you compliant.",
        ],
      },
    ],
    process: {
      heading: "What happens when you order a valuation",
      intro: "Once we have your instructions, we:",
      steps: [
        "Inspect the property and assess the type and quantity of materials needed to replace the buildings and ancillary improvements, photographing the improvements and their surrounds.",
        "Estimate the full replacement cost, including every item required by the relevant legislation and by good valuation practice.",
        "Have the valuation carried out by a Registered Valuer, without limitation.",
        "Issue your certificates of value, usually as one bound copy, one unbound copy for photocopying and a PDF for emailing.",
      ],
    },
    faqHref: "/building-insurance-valuation/",
    faqLabel: "Building insurance valuation FAQs",
  },
  {
    slug: "sfp",
    name: "Capital Works or Sinking Fund Plan",
    shortName: "Capital Works & Sinking Fund Plans",
    phrase: "capital works and sinking fund plans",
    icon: "chart",
    metaTitle: "Capital Works & Sinking Fund Plans (10 and 15 Year)",
    metaDescription:
      "Compliant 10 and 15 year capital works, sinking fund and maintenance fund plans for NSW, ACT and Victorian strata schemes, with photos and clear annual contribution forecasts.",
    headline: "Plan for every repair before it becomes a special levy",
    lead: "We prepare practical 10 and 15 year capital works, sinking fund and maintenance fund plans that tell owners exactly how much to set aside each year, and why.",
    summary:
      "10 and 15 year capital works, sinking fund and maintenance fund plans that comply with the strata legislation in NSW, the ACT and Victoria.",
    highlights: [
      "Compliant with s80 SSMA 2015 (NSW), s82 UT(M)A 2011 (ACT) and s36 OCA 2006 (Vic)",
      "Easy-to-read reports with photos of each item",
      "$5 million professional indemnity cover",
    ],
    why: {
      heading: "Why does an owners corporation need a capital works plan?",
      paragraphs: [
        "The legislation requires an owners corporation to prepare a 10 year capital works or sinking fund plan and review it at least every five years. This applies under the Strata Schemes Management Act 2015 in NSW and the Unit Titles (Management) Act 2011 in the ACT, while Victoria requires maintenance plans under the Owners Corporations Act 2006. The plan lets owners budget for the upkeep of common property by building up a reserve fund that covers the work as it falls due.",
      ],
    },
    sections: [
      {
        heading: "Plans that comply, and that owners can follow",
        paragraphs: [
          "Capital works, sinking fund and maintenance fund plans are our speciality. Every plan we prepare complies with section 80 of the Strata Schemes Management Act 2015 (NSW), section 82 of the Unit Titles (Management) Act 2011 (ACT) and section 36 of the Owners Corporations Act 2006 (Vic).",
          "A plan works out how much should be put aside each year to meet capital expenses: replacing, renewing or repairing items both large and small, such as windows, fencing, concrete paths and repainting. With a well-funded reserve, the owners corporation can keep the building looking good and in sound condition while meeting its legal obligations.",
        ],
        list: [
          "Easy-to-read reports",
          "A clear explanation of the owners corporation's obligations",
          "A 10 year plan, as the legislation requires, reviewed at least every five years",
        ],
      },
      {
        heading: "The duty to repair and maintain",
        paragraphs: [
          "Owners corporations have a strict duty to repair and maintain common property and, in particular, to keep it safe for owners and visitors. See section 106 of the Strata Schemes Management Act 2015 (NSW), section 24 of the Unit Titles (Management) Act 2011 (ACT) and section 46 of the Owners Corporations Act 2006 (Vic).",
          "Owners also owe a common law duty of care to everyone who comes onto the property. Those duties are generally set out in the Civil Liability Act 2002 (NSW), the Wrongs Act 1958 (Vic) and the Civil Law (Wrongs) Act 2002 (ACT).",
        ],
      },
      {
        heading: "New South Wales: the legislative framework",
        list: [
          "Section 106 of the Strata Schemes Management Act 2015 requires an owners corporation to properly maintain, and keep in a state of good and serviceable repair, the common property and any personal property vested in it.",
          "Section 80 of the same Act provides the mechanism: a capital works fund, maintained so there is enough money to meet the obligations under section 106.",
          "The plan must be reviewed at least every five years and adjusted where necessary.",
        ],
      },
      {
        heading: "Reviewing your plan",
        list: [
          "Review within five years of the last plan, or of the date compliance was required",
          "Commission a new report based on a fresh site inspection",
          "Consider whether the current annual contributions need to change",
          "Think of it as reviewing a budget: fine-tuning the savings of the owners corporation",
        ],
      },
      {
        heading: "Why a professional plan pays for itself",
        list: [
          "Independent, unbiased advice",
          "Helps avoid unnecessary special levies",
          "A user-pays approach that is fairer across owners",
          "Adds value through a well-maintained building and a healthy fund balance",
          "Meets the legal requirement to maintain common property",
          "Saves owners and strata managers time",
          "Transfers risk, backed by $5 million professional indemnity insurance",
          "Allows for latent and unforeseen costs",
        ],
      },
      {
        heading: "What a capital works plan is, and what it isn't",
        paragraphs: [
          "The goal is simple: to work out how much should be set aside each year. A capital works or sinking fund plan is not a detailed quote for every item, a precise prediction of costs and timing, a dilapidation report, a maintenance schedule, or a substitute for specialist building, fire or safety advice.",
        ],
      },
      {
        heading: "Managing the risk of underfunding",
        paragraphs: [
          "Owners corporations without adequate funds cannot meet their statutory duty to repair, and resistance to setting money aside can make a scheme hard to manage, particularly where owners are on fixed incomes. Underfunding also raises safety and litigation risks, potentially without insurance to fall back on.",
          "Appropriate funding helps owners avoid breaching their strict statutory obligation to repair and maintain common property, and the unnecessary costs and penalties seen in cases such as Seiwa Australia Pty Ltd v Owners SP35042 [2006] NSWSC 1157 and Nicita v Owners SP64837 [2010] NSWSC 68.",
        ],
      },
    ],
    process: {
      heading: "What happens when you order a plan",
      intro: "Once you place an order, we:",
      steps: [
        "Inspect the property and identify items likely to need repair, renewal, replacement or maintenance within and beyond the next 10 years.",
        "Give the owners corporation the chance to add items of its own, such as earlier landscaping renewal or new facilities like a barbecue area, playground or gym.",
        "Analyse and issue the 10 year forecast: the recommended annual contribution, the total spend over the term including escalation in construction costs, and the likely timing for each item.",
        "Photograph the relevant replacement and maintenance items.",
        "Have the forecast carried out by a Registered Valuer, without limitation.",
      ],
    },
    faqHref: "/sinking-fund-plans/",
    faqLabel: "Capital works and sinking fund FAQs",
  },
  {
    slug: "whs",
    name: "Work Health and Safety",
    shortName: "WHS Safety Reports",
    phrase: "WHS safety reports",
    icon: "shield",
    metaTitle: "WHS & OHS Safety Reports for Strata Properties",
    metaDescription:
      "Practical work health and safety (WHS) and OHS inspections for strata and commercial properties, with a proper risk assessment of every hazard so owners can prioritise repairs.",
    headline: "Find the hazards on your property before someone else does",
    lead: "Our safety reports identify genuine risks to people and property, rate each one properly, and recommend sensible ways to deal with them.",
    summary:
      "Safety reports that identify any risk of harm to people or damage to property, under both the common law duty of care and WHS legislation.",
    highlights: [
      "A separate risk assessment for every hazard",
      "Colour photos and the location of each item",
      "Covers WHS (NSW, QLD, SA, ACT, WA) and OHS (VIC)",
    ],
    why: {
      heading: "Does your owners corporation need a safety report?",
      paragraphs: [
        "An owners corporation needs to know the likely hazards on its property, and the risks it is obliged to control under its common law duty of care and, where it applies in your state, work health and safety legislation.",
      ],
    },
    sections: [
      {
        heading: "WHS reports, OHS reports and duty of care reports",
        paragraphs: [
          "You may see these called WHS reports, OHS reports (the usual term in Victoria) or duty of care reports. Whatever the name, the purpose is the same: to identify any risk of harm to people, or of damage to property, under both the common law duty of care and work health and safety legislation.",
        ],
      },
      {
        heading: "Your safety obligations",
        paragraphs: [
          "A property must be without risks to the health and safety of any person. Our inspections take a practical, common-sense approach to identifying hazards and the risks that come with them, and to recommending the best way to treat each one.",
        ],
      },
      {
        heading: "Your legislative obligations",
        paragraphs: [
          "In NSW and the ACT, our safety report addresses your general obligations under the Work Health and Safety Act 2011 and the associated Work Health and Safety Regulation, as well as your common law duty of care.",
        ],
        links: [
          {
            label: "Work Health and Safety Act 2011 (NSW)",
            href: "https://legislation.nsw.gov.au/view/html/inforce/current/act-2011-010",
          },
        ],
      },
      {
        heading: "The hazards we look for",
        paragraphs: [
          "Typical hazards fall into a number of broad categories, including trip, slip, fall, electrical and protrusion hazards, among many others.",
        ],
      },
      {
        heading: "A proper risk assessment for every hazard",
        paragraphs: [
          "Each hazard we identify receives its own risk assessment, so you can see at a glance which items matter most and direct your budget accordingly.",
          "Our safety report is not a compliance audit against current standards, where every structure must be brought up to today's Building Code of Australia. It focuses on genuine hazards and real risks to people and property.",
        ],
      },
    ],
    process: {
      heading: "What happens when you order a safety report",
      intro: "Once we have your instructions, we:",
      steps: [
        "Physically inspect the property.",
        "Take a practical, flexible approach to control measures that eliminate or minimise each hazard.",
        "Carry out a proper risk assessment of every hazard so owners can decide which to fix first.",
        "Visually inspect the electrical board if access is available on the day (we are not electrical engineers).",
        "Provide colour photographs, with the location and description of every hazard identified.",
        "Explain our findings thoroughly in the report.",
      ],
    },
    faqHref: "/work-health-and-safety/",
    faqLabel: "Work health and safety FAQs",
  },
  {
    slug: "asb",
    name: "Asbestos Report",
    shortName: "Asbestos Reports",
    phrase: "asbestos reports",
    icon: "alert",
    metaTitle: "Asbestos Registers & Management Plans for Strata",
    metaDescription:
      "One report covering both an asbestos register and an asbestos management plan, prepared by trained inspectors for strata, commercial, retail and mixed-use properties.",
    headline: "Your asbestos register and management plan, in one report",
    lead: "Our asbestos report combines both documents the legislation asks for, so you know where asbestos may be, how risky it is, and what to do about it.",
    summary:
      "A single report that includes both an asbestos register and an asbestos management plan, so you know what is on site and how it should be managed.",
    highlights: [
      "Register and management plan in one fixed price",
      "Visual inspection, with no unnecessary disturbance",
      "Risk assessment and photos for every item",
    ],
    why: {
      heading: "Why do you need an asbestos report?",
      paragraphs: [
        "Our asbestos report is a single document that includes both an asbestos register and an asbestos management plan. In NSW and the ACT, work health and safety legislation makes an asbestos register mandatory for commercial, retail, industrial and mixed-use residential properties with a common property workplace built before 31 December 2003.",
      ],
    },
    sections: [
      {
        heading: "What the legislation asks for",
        paragraphs: [
          "Work health and safety legislation requires an asbestos register to be prepared and kept at the workplace. An asbestos management plan must also be put in place and reviewed periodically.",
        ],
      },
      {
        heading: "The asbestos register",
        paragraphs: [
          "The register identifies asbestos and asbestos-containing material (ACM) and records where it is on the property. As a minimum, a compliant register includes:",
        ],
        list: [
          "A proper risk assessment of each item identified",
          "Appropriate control measures, following the hierarchy of controls, to limit exposure",
          "Whether the ACM is non-friable or friable (able to be crushed by hand pressure)",
          "The size and extent of the ACM",
          "The type or product name of the ACM",
          "Its specific location and whether it is accessible",
          "Its condition and the risk of contamination",
        ],
      },
      {
        heading: "The asbestos management plan",
        paragraphs: [
          "The management plan sets out how the asbestos or ACM will be dealt with, whether through the hierarchy of controls or by leaving it in place and monitoring it. As a minimum, a compliant plan includes:",
        ],
        list: [
          "The start and completion dates for any proposed work",
          "The person responsible for putting the control measures in place",
          "The recommended control measures",
          "The size, extent and location of each item",
          "A description of each item",
        ],
      },
      {
        heading: "Assumed asbestos and testing",
        paragraphs: [
          "In states that have adopted the model work health and safety laws, the key provisions on asbestos are in regulations 422 to 430 of the model regulations. Regulation 422 allows a competent person who reasonably believes a material contains asbestos to assume that it does, and assumed asbestos is then treated as identified at the workplace.",
          "There is no legislative requirement to have samples tested. The guiding principle with asbestos is that it should not be disturbed. Cutting, breaking or gouging material to take a sample only increases the risk of releasing fibres into the air, however carefully the damage is sealed afterwards.",
          "For that reason we do not recommend disturbing asbestos or ACM just to obtain a sample. Where work is planned on or near an item, our trained asbestos inspectors can take a sample in line with the national codes of practice and have it analysed by a NATA-accredited laboratory.",
        ],
      },
      {
        heading: "A prudent step even where exemptions apply",
        paragraphs: [
          "Some residential strata schemes are exempt from parts of the work health and safety legislation in some states. None of those exemptions protect owners from a claim for breaching their common law duty of care. Asbestos is a known hazard, and every owner has a duty to ensure no one is harmed by asbestos on their property.",
          "For a modest fixed fee, an asbestos report gives an owners corporation or property owner real protection: you know which items may contain asbestos, and you can show you took sensible steps to identify the hazards on your property.",
        ],
      },
      {
        heading: "Penalties for non-compliance",
        paragraphs: [
          "Failing to meet the asbestos register and management plan requirements can attract significant penalties under work health and safety legislation, especially if someone is harmed as a result. Penalties are set in three categories, from a failure to comply with a health and safety duty through to reckless conduct that exposes someone to the risk of death or serious injury, and for a corporation the maximum penalties run to millions of dollars.",
        ],
      },
    ],
    process: {
      heading: "What happens when you order an asbestos report",
      intro: "Once we have your instructions, we:",
      steps: [
        "Inspect the property.",
        "Carry out a visual inspection only of each item that may be asbestos or ACM.",
        "Take a practical, flexible approach to control measures that eliminate or minimise each hazard.",
        "Carry out a proper risk assessment of every item so owners can decide which to address first.",
        "Provide colour photographs, with the location and description of every item identified.",
        "Explain our findings thoroughly in the report.",
      ],
    },
    faqHref: "/asbestos-reports/",
    faqLabel: "Asbestos report FAQs",
  },
];

/** Each service takes one of the four diamonds in the BIV mark. */
export const serviceDiamond: Record<ServiceSlug, "blue" | "green" | "yellow" | "red"> = {
  biv: "blue",
  sfp: "green",
  whs: "yellow",
  asb: "red",
};

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
