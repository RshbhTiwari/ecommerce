import './navbar.css';
import Nav from "./nav";
import TopHeader from "./TopHeader";

export default function Navbarone() {
    const path = window.location.pathname;
    return (
        <>
            {/* {path === "/" &&
                <>
                    <TopHeader />
                </>
            } */}
            <TopHeader />
            <Nav />
        </>
    )
}

