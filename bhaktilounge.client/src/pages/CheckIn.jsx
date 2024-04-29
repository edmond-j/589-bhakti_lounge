import Header from "./Header";
import Footer from "./Footer";
import NameInput from "./NameInputAndDetails";

function CheckIn() {
    return (
        <div className="CheckIn">
            <Header pageNumber={1} />
            <h2>Customer Check-in</h2>
            <NameInput />
            <Footer />
        </div>
    );
}

export default CheckIn;