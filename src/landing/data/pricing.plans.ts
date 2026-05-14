interface Tier {
  name: string;
  price: string;
  priceSuffix: string;
  desc: string;
  features: string[];
  popular: boolean;
}
export const TIERS : Tier[] = [
  {
    name: "Reader",
    price: "Free",
    priceSuffix: "forever",
    desc: "For the casual explorer.",
    features: [
      "Unlimited Tracking",
      "Basic Recommendations",
      "Community Access",
    ],
    popular: false,
  },
  {
    name: "Voyager",
    price: "$8",
    priceSuffix: "mo",
    desc: "For the dedicated bibliophile.",
    features: [
      "Deep DNA Analytics",
      "Hyper-specific Suggestions",
      "Advanced Stats",
      "No Ads",
    ],
    popular: true,
  },
];
