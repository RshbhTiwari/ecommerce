import './navbar.css';
import Nav from "./nav";
import TopHeader from "./TopHeader";

export default function Navbarone({cartData, itemCount}) {
    return (
        <>
            <TopHeader cartData={cartData} itemCount={itemCount}/>
            <Nav />
        </>
    )
}

