import Header from "../components/Header";
import Footer from "../components/Footer";
import NameInput from "../components/NameInputAndDetails";
import CheckinNumbers from "../components/CheckinNumbers";

function CheckIn() {
    return (
        <>
            <Header />
            <h2>Customer Check-in</h2>
            {/* <CheckinNumbers /> */}
            <NameInput />
            <Footer />
        </>
    );
}

export default CheckIn;
