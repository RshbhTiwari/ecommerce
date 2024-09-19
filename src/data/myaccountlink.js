import usericon from '../assets/myaccount/usericon.png';
import book from '../assets/myaccount/phone-book.png';
import box from '../assets/myaccount/return-box.png';
import commerce from '../assets/myaccount/e-commerce.png';

const myaccountlink = [
    {
        title: "My Profile",
        subtitle: "Edit your basic details",
        link: "/my-account",
        image: usericon,
        
    },
    {
        title: "My Address",
        subtitle: "Manage your saved addresses",
        link: "/my-account/address-book",
        image: book,
    },
    {
        title: "My Orders",
        subtitle: "View, track, cancel orders and buy again",
        link: "/my-account/orders",
        image: box,
    },
    {
        title: "My wishlist ",
        subtitle: "Save for Later: Your Personal Shopping Cart",
        link: "/my-account/wishlist",
        image: commerce,
    },

];

export default myaccountlink;