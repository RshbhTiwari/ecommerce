import './navbar.css';
import Nav from "./nav";
import TopHeader from "./TopHeader";

export default function Navbarone({cartData, itemCount}) {
    const path = window.location.pathname;
    return (
        <>
            {/* {path === "/" &&
                <>
                    <TopHeader />
                </>
            } */}
            <TopHeader cartData={cartData} itemCount={itemCount}/>
            <Nav />
        </>
    )
}

