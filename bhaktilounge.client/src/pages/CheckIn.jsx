import Header from "../components/Header";
import Footer from "../components/Footer";
import NameInput from "../components/NameInputAndDetails";
import CheckinNumbers from "../components/CheckinNumbers";

function CheckIn() {
    return (
        <div className="CheckIn">
            <Header />
            <h2>Customer Check-in</h2>
            <CheckinNumbers />
            <NameInput />
            <Footer />

        </div>
    );
}

export default CheckIn;