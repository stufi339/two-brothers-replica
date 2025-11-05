export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  product: string;
  verified: boolean;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    date: "2024-10-15",
    text: "The A2 Ghee is absolutely authentic! You can taste the difference in quality. My family has been using it for 6 months now and we're never going back to store-bought ghee.",
    product: "A2 Ghee from Free-Grazing Gir Cows",
    verified: true,
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Bangalore, Karnataka",
    rating: 5,
    date: "2024-10-10",
    text: "Best cold-pressed oils I've found online. The wood-pressed method really preserves the nutrients. Highly recommend for health-conscious families!",
    product: "Wood Pressed Organic Cooking Oil Combo",
    verified: true,
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Delhi, NCR",
    rating: 4.5,
    date: "2024-10-05",
    text: "Great quality wheat atta. The rotis come out soft and the taste is so much better than commercial brands. Delivery was prompt too!",
    product: "Stone Ground Whole Wheat Atta",
    verified: true,
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    date: "2024-09-28",
    text: "The basmati rice is fragrant and cooks perfectly every time. You can tell it's organic - the grains are long and separate beautifully.",
    product: "Organic Basmati Rice Varieties",
    verified: true,
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    date: "2024-09-20",
    text: "Switched to organic products from Two Brothers and couldn't be happier. The quality is exceptional and you can trust their sourcing. Worth every rupee!",
    product: "Premium A2 Bilona Ghee",
    verified: true,
  },
  {
    id: 6,
    name: "Amit Patel",
    location: "Ahmedabad, Gujarat",
    rating: 4.5,
    date: "2024-09-15",
    text: "The coconut oil is pure and cold-pressed. Great for cooking and even skincare. My wife loves it!",
    product: "Cold Pressed Coconut Oil",
    verified: true,
  },
];

export const testimonialStats = {
  totalCustomers: "50,000+",
  averageRating: 4.8,
  totalReviews: 2847,
  satisfactionRate: 98,
};
