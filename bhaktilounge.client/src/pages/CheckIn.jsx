import Header from "../components/Header";
import Footer from "../components/Footer";
import NameInput from "../components/NameInputAndDetails";

function CheckIn() {
    return (
        <div className="CheckIn">
            <Header  />
            <h2>Customer Check-in</h2>
            <NameInput />
            <Footer />
        </div>
    );
}

export default CheckIn;