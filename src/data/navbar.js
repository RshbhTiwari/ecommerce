import two from '../assets/header/home.png';
import three from '../assets/header/shop.png';
import four from '../assets/header/blogging.png';
import five from '../assets/header/contact.png';

const navigation = [
  {
    name: "Home",
    link: "/",
    current: '/',
    image: two
  },
  {
    name: "Shop",
    link: "/shop",
    current: '/shop',
    image: three
  },
  {
    name: "Blog",
    link: "/blog",
    current: '/blog',
    image: four
  },

  {
    name: "Contact",
    link: "/contact",
    current: '/contact',
    image: five
  },

];

export default navigation;