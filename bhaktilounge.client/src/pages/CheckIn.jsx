import Header from "../components/Header";
import Footer from "../components/Footer";
import NameInput from "../components/NameInputAndDetails";
import DinersNumber from "../components/DinersNumber";

function CheckIn() {
    return (
        <div className="CheckIn">
            <Header />
            <DinersNumber />
            <h2>Customer Check-in</h2>
            <NameInput />
            <Footer />

        </div>
    );
}

export default CheckIn;