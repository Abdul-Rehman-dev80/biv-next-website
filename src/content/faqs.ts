/**
 * FAQ pages. Each page keeps the six questions from the client's existing FAQ
 * pages, answered in fresh wording with the same facts.
 */
import type { ServiceSlug } from "./services";

export type Faq = { question: string; answer: string[]; list?: string[]; table?: { head: [string, string]; rows: [string, string][] } };

export type FaqPage = {
  path: string;
  service: ServiceSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  faqs: Faq[];
};

export const faqPages: Record<ServiceSlug, FaqPage> = {
  biv: {
    path: "/building-insurance-valuation/",
    service: "biv",
    title: "Building insurance valuation FAQs",
    metaTitle: "Building Insurance Valuation FAQs",
    metaDescription:
      "What a building insurance valuation is, whether strata owners need one, how it affects premiums and how often it should be updated, answered by Registered Valuers.",
    lead: "Straight answers to the questions owners and strata managers ask us most about insurance valuations.",
    faqs: [
      {
        question: "What is a building insurance valuation?",
        answer: [
          "It is a professional assessment, carried out by a Registered Valuer, of what it would cost to replace all of the improvements in a strata scheme, community scheme or stand-alone property.",
          "The valuation also allows for construction costs rising over the period of insurance, the time needed to document and rebuild, professional fees, demolition and debris removal, and GST, among other things.",
        ],
      },
      {
        question: "Do owners have to get one?",
        answer: ["Yes. Legislation requires strata properties to obtain a building insurance valuation."],
      },
      {
        question: "What is the benefit of a regular valuation?",
        answer: [
          "A regular valuation keeps your sum insured in line with the real cost of rebuilding after total destruction or partial damage.",
          "We recommend a fresh valuation every year rather than accepting an arbitrary increase that may be well above the actual rise in construction costs.",
        ],
      },
      {
        question: "Will a valuation increase what owners pay each year?",
        answer: [
          "No. A current valuation gives the owners corporation or property owner confidence that the premium is based on an accurate, up-to-date sum insured.",
        ],
      },
      {
        question: "Can owners vary the valuation?",
        answer: [
          "The owners corporation must insure the building for at least the sum insured recommended in its latest valuation. If the owners corporation or property owner and the insurer agree, the property can be insured for more than that amount.",
        ],
      },
      {
        question: "How often should the valuation be reviewed?",
        answer: [
          "It depends on the type of property. As a guide, these are the minimum revaluation intervals we consider reasonable:",
        ],
        table: {
          head: ["Property type", "Revalue at least"],
          rows: [
            ["Lot 1 in most community schemes", "Every 5 years"],
            [
              "Lot 1 with major improvements (sheds, cabana, pool, recreation or community hall, barbecue areas)",
              "Every 2 to 3 years",
            ],
            ["Three-level walk-ups (12 and 18 packs)", "Every 2 to 3 years"],
            ["Villas, townhouses and similar", "Every 2 to 3 years"],
            ["Schemes of six levels or more (residential or other)", "Every year"],
            ["Industrial office warehouses, older", "Every 1 to 2 years"],
            ["Industrial office warehouses, newer", "Every 2 to 3 years"],
            ["Commercial office buildings, large", "Every 1 to 2 years"],
            ["Commercial office buildings, small", "Every 2 to 3 years"],
          ],
        },
      },
    ],
  },
  sfp: {
    path: "/sinking-fund-plans/",
    service: "sfp",
    title: "Capital works and sinking fund plan FAQs",
    metaTitle: "Capital Works & Sinking Fund Plan FAQs",
    metaDescription:
      "Answers on capital works and sinking fund plans: what they are, the legal requirement, how they affect levies, whether owners can vary them and how often to review.",
    lead: "What every owners corporation should know about planning and funding its capital works.",
    faqs: [
      {
        question: "What is a capital works or sinking fund plan?",
        answer: [
          "It is a plan for how the owners in a strata scheme will repair and maintain the common property, and how they will raise enough money to pay for it.",
          "The annual amount needed over the 10 year plan varies from scheme to scheme. A newer building may need relatively little, while an older scheme with more repairs due will need more.",
        ],
      },
      {
        question: "Are owners required to have one?",
        answer: [
          "Yes. Legislation in NSW, the ACT and Victoria requires a plan. In NSW, every strata scheme has been required to have a 10 year plan since July 2009, first under the Strata Schemes Management Act 1996 and now under section 80 of the Strata Schemes Management Act 2015.",
          "The plan must be approved by the owners at an annual general meeting, and reviewed and adjusted if necessary at least every five years.",
        ],
      },
      {
        question: "What are the benefits of a plan?",
        answer: [
          "A good plan should add to the value of your property by keeping it well presented and well maintained. Our Australian designed and owned software gives us the flexibility to make sure that:",
        ],
        list: [
          "Excess money isn't sitting idle in the bank",
          "Annual contributions are as low as possible while still sufficient, avoiding special levies",
          "Owners never pay larger levies than they need to",
        ],
      },
      {
        question: "Will a plan increase what owners pay each year?",
        answer: [
          "There is no single answer, because every plan should reflect the needs of its own scheme. We have sometimes recommended reducing contributions where money was sitting idle in the fund.",
          "Equally, we may recommend an increase where current contributions won't cover the projected cost of repairing, maintaining or renewing the improvements and their surrounds.",
        ],
      },
      {
        question: "Can owners vary the plan?",
        answer: [
          "Yes. It is the owners' fund to use as they need, provided they meet their strict obligation to repair and maintain the common property.",
        ],
      },
      {
        question: "How often should the plan be reviewed?",
        answer: ["We recommend having a plan prepared every two to three years."],
      },
    ],
  },
  whs: {
    path: "/work-health-and-safety/",
    service: "whs",
    title: "Work health and safety FAQs",
    metaTitle: "Work Health & Safety Inspection FAQs",
    metaDescription:
      "Common questions about WHS safety inspections for strata and commercial properties: what they cover, whether owners need one, costs, variations and re-inspection cycles.",
    lead: "Answers to the questions owners corporations ask before booking a safety inspection.",
    faqs: [
      {
        question: "What is a work health and safety inspection?",
        answer: [
          "Its main purpose is to identify any risk of harm to people, or of damage to property, under both the common law duty of care and legislative requirements.",
          "Put simply, a property must be without risks to the health and safety of anyone. Our inspections take a practical, sensible approach to identifying and treating hazards and the risks that come with them.",
          "It is not a compliance report against current standards, where every structure and item must be brought up to today's building standards.",
        ],
      },
      {
        question: "Do owners need one?",
        answer: [
          "A purely residential strata scheme may be exempt from being classed as a person conducting a business or undertaking (PCBU), and so from complying with work health and safety legislation, unless it engages a worker as an employee.",
          "However, the owners corporation or property owner still owes a common law duty of care to make sure the property is without risks to the health and safety of anyone. That duty is set out in civil liability legislation: the Civil Liability Act 2002 (NSW), the Wrongs Act 1958 (Vic) and the Civil Law (Wrongs) Act 2002 (ACT).",
          "A professional safety report is a prudent way to show a court that you have taken reasonable steps and proper care in owning and managing your property.",
        ],
      },
      {
        question: "What is the benefit of an inspection?",
        answer: [
          "It identifies likely hazards so they can be fixed and the property is safe for you, your family and your visitors.",
          "It also greatly reduces your legal exposure, because you can show a court that you have taken reasonable steps and proper care.",
        ],
      },
      {
        question: "Will an inspection increase what owners pay each year?",
        answer: [
          "Where a property has significant hazards that need attention, it can.",
          "Proper management of a property ordinarily includes reducing the risk of harm. Risks, and the costs that follow, usually arise where maintenance has been neglected.",
        ],
      },
      {
        question: "Can owners vary the safety report?",
        answer: [
          "Yes, in how they deal with the recommended control measures. For example, we might recommend grinding down a trip hazard in an accessway, but the owners may decide it is reasonably practicable to close off the area, or to apply highlight paint and warning signs instead.",
          "A different control measure can be used, but the identified hazard must still be addressed.",
        ],
      },
      {
        question: "How often should a property be re-inspected?",
        answer: [
          "It depends on the property, but an annual re-inspection is the prudent approach. A modern small villa complex with limited common property may be well served by a re-inspection every two to three years, while a commercial or retail property with many people passing through may need one every six or twelve months.",
        ],
      },
    ],
  },
  asb: {
    path: "/asbestos-reports/",
    service: "asb",
    title: "Asbestos report FAQs",
    metaTitle: "Asbestos Report FAQs for Property Owners",
    metaDescription:
      "What an asbestos report includes, whether strata owners need one, how it can save money, when registers can be varied and how often reports should be reviewed.",
    lead: "Everything owners ask us about asbestos registers and management plans.",
    faqs: [
      {
        question: "What is an asbestos report?",
        answer: [
          "Our asbestos report includes both an asbestos register and an asbestos management plan.",
          "An asbestos register is a legislative requirement, usually found in work health and safety legislation, and relates to a workplace. An asbestos management plan sets out the control measures and timeframes for dealing with any asbestos or asbestos-containing material (ACM) identified.",
        ],
      },
      {
        question: "Do owners need an asbestos report?",
        answer: [
          "Residential strata schemes have specific exemptions from the requirement to hold an asbestos register and management plan under work health and safety legislation, particularly where the scheme does not employ any workers.",
          "None of those exemptions protect owners from legal action for a breach of their common law duty of care. Asbestos is a known dangerous material, and every owner has a duty to make sure no one is harmed by asbestos on their property. A prudent owner simply obtains a report, which costs a modest fixed fee and includes both the register and the management plan.",
        ],
      },
      {
        question: "What is the benefit of an asbestos report?",
        answer: [
          "You comply with the legislation where it applies, and you discharge one of the key duties of a responsible owner under the common law: identifying hazards.",
          "Without a register, both a contractor and the owner or agent who engaged them are at risk, particularly if contamination occurs. With one, contractors know which items contain or are likely to contain asbestos and can take the right precautions, such as masks, goggles and protective clothing, sealing off the area, collecting dust properly and disposing of hazardous material correctly.",
        ],
      },
      {
        question: "Will an asbestos report increase what owners pay each year?",
        answer: [
          "No. If anything, it saves money.",
          "Under work health and safety legislation a workplace must have an asbestos register, and significant fines apply if one is not in place. If several contractors need to work on a property, each would otherwise need a register. It is far more sensible for the owner to obtain one register than to pay for several through each contractor's quote.",
        ],
      },
      {
        question: "Can owners vary an asbestos report?",
        answer: [
          "An owner generally cannot vary an asbestos register at will. If an item was assumed to contain asbestos (which regulation 422 of the Work Health and Safety Regulation permits in NSW and the ACT), the register can be updated if a sample of that item is analysed by a NATA-accredited laboratory and found to be free of asbestos. The laboratory's analysis should then be attached to the register.",
          "An asbestos management plan can be varied by an owner, provided appropriate measures are taken. The plan deals with the rectification, removal or other work needed to eliminate or minimise harm from asbestos on the property, who is responsible for that work and when it must be done.",
        ],
      },
      {
        question: "How often should an asbestos report be reviewed?",
        answer: [
          "Every year, to confirm that no item containing asbestos, or assumed to contain asbestos, has been damaged.",
        ],
      },
    ],
  },
};
