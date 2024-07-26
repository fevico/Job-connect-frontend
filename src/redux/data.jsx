

// Sample product images (using the same image for all products for illustration)
import productImage from "@/assets/images/product1.png";

// Define categories
import category1 from "@/assets/images/category1.png";
import category2 from "@/assets/images/category2.png";
import category3 from "@/assets/images/category3.png";

export const categories = [
  {
    title: "Home Appliances",
    image: category1,
    id: 1,
    slug: "home-appliances",
  },
  {
    title: "Wiring and Cable",
    image: category2,
    id: 2,
    slug: "wiring-and-cable",
  },
  {
    title: "Lighting",
    image: category3,
    id: 3,
    slug: "lighting",
  },
  {
    title: "Kitchen Appliances",
    image: category1,
    id: 4,
    slug: "kitchen-appliances",
  },
  {
    title: "Garden Tools",
    image: category2,
    id: 5,
    slug: "garden-tools",
  },
  {
    title: "Power Tools",
    image: category3,
    id: 6,
    slug: "power-tools",
  },
  {
    title: "Bathroom Fixtures",
    image: category1,
    id: 7,
    slug: "bathroom-fixtures",
  },
  {
    title: "Outdoor Lighting",
    image: category2,
    id: 8,
    slug: "outdoor-lighting",
  },
  {
    title: "Security Systems",
    image: category3,
    id: 9,
    slug: "security-systems",
  },
  {
    title: "Smart Home Devices",
    image: category1,
    id: 10,
    slug: "smart-home-devices",
  },
];

// Generate unique product names and descriptions
const products = [
  {
    id: 1,
    slug: "led-bulb-extension",
    name: "LED Bulb Extension",
    description:
      "Our energy-efficient LED bulb extension provides bright and long-lasting illumination, perfect for any room. With advanced LED technology, it reduces energy consumption and lowers electricity bills.",
    category: categories[2], // Example: Lighting category
    image: productImage,
    price: 3900,
    tags: ["LED", "Extension"],
  },
  {
    id: 2,
    slug: "smart-speaker",
    name: "Smart Speaker",
    description:
      "Enjoy high-quality sound and voice control with our smart speaker. Connect effortlessly to your favorite music and smart home devices for an enhanced audio experience.",
    category: categories[9], // Example: Smart Home Devices category
    image: productImage,
    price: 1860,
    tags: ["Smart", "Speaker"],

  },
  {
    id: 3,
    slug: "kitchen-blender",
    name: "Kitchen Blender",
    description:
      "Our versatile kitchen blender makes meal preparation a breeze. From smoothies to sauces, its powerful motor and multiple speed settings ensure optimal blending performance.",
    category: categories[4], // Example: Kitchen Appliances category
    image: productImage,
    price: 2200,
    tags: ["Kitchen", "Blender", "Cooking", "Vegetables"],


  },
  {
    id: 4,
    slug: "garden-trimmer",
    name: "Garden Trimmer",
    description:
      "Maintain your garden with ease using our garden trimmer. Its lightweight design and ergonomic handle provide comfort during long trimming sessions.",
    category: categories[5], // Example: Garden Tools category
    image: productImage,
    price: 1500,
    tags: ["Garden", "Trimmer", "Gardening", "Tools"],


  },
  {
    id: 5,
    slug: "power-drill",
    name: "Power Drill",
    description:
      "Complete your DIY projects efficiently with our power drill. Featuring variable speed settings and durable construction, it's ideal for various drilling tasks.",
    category: categories[6], // Example: Power Tools category
    image: productImage,
    price: 3100,
    tags: ["Power", "Drill", "DIY", "Projects"],


  },
  {
    id: 6,
    slug: "bathroom-faucet",
    name: "Bathroom Faucet",
    description:
      "Upgrade your bathroom with our stylish and functional faucet. Its sleek design and water-saving features enhance both aesthetics and efficiency.",
    category: categories[7], // Example: Bathroom Fixtures category
    image: productImage,
    price: 6500,
    tags: ["Bathroom", "Faucet", "Water", "Saving"],



  },
  {
    id: 7,
    slug: "outdoor-solar-lights",
    name: "Outdoor Solar Lights",
    description:
      "Illuminate your outdoor space with our energy-efficient solar lights. They automatically charge during the day and provide ambient lighting at night.",
    category: categories[8], // Example: Outdoor Lighting category
    image: productImage,
    price: 9000,
    tags: ["Outdoor", "Solar", "Lights", "Lighting"],


  },
  {
    id: 8,
    slug: "security-camera-system",
    name: "Security Camera System",
    description:
      "Protect your property with our advanced security camera system. Featuring HD video quality and remote monitoring capabilities, it ensures peace of mind.",
    category: categories[9], // Example: Security Systems category
    image: productImage,
    price: 8000,
    tags: ["Security", "Camera", "System", "Security"],



  },
  {
    id: 9,
    slug: "robot-vacuum-cleaner",
    name: "Robot Vacuum Cleaner",
    description:
      "Keep your floors clean effortlessly with our robot vacuum cleaner. It navigates through rooms, detects obstacles, and offers efficient cleaning modes.",
    category: categories[10], // Example: Smart Home Devices category
    image: productImage,
    price: 5000,
    tags: ["Robot", "Vacuum", "Cleaner", "Cleaning"],



  },
  {
    id: 10,
    slug: "air-purifier",
    name: "Air Purifier",
    description:
      "Breathe cleaner air with our advanced air purifier. It removes airborne pollutants and allergens, creating a healthier indoor environment for you and your family.",
    category: categories[1], // Example: Home Appliances category
    image: productImage,
    price: 2000,
    tags: ["Air", "Purifier", "Air", "Cleaner"],




  },
];

export default products;
