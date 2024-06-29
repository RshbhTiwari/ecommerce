import { OrdersDetailsPage } from "./components/orders";
import four from '../assets/home/12.png';

const ordersdata = {
    id: 1,
    title: "Red Radish 1 pack",
    subtitle: "The color of a radish is a strong indicator of its taste. Pick the ones that are a rich, full red.",
    price: "20.00",
    image: four,
    offer: "new",
    date: "12/10/2018",
    categorie: "Drinks & Juice",
    phone:"7974842788"
};

function OrdersDetails() {
    
    return (
        <>
            <OrdersDetailsPage ordersitem={ordersdata} />
        </>

    );
}

export default OrdersDetails;