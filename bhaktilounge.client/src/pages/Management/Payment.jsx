import React from "react";
import { useEffect, useState } from "react";
import ItemList from "/src/components/management/ItemList";
import ToolBar from "../../components/management/ToolBar";
import OptionButton from "../../components/management/OptionButton";
import { itemHighlight, updateData, deleteData } from "./method";
import spinner from "/spinner.svg";
import authFetch from "@/utils/authFetch.js";
import { toast } from "react-toastify";

function Payment() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setLoading] = useState(true);

  async function populateData() {
      authFetch("/api/v1/Payment")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.length > 0) {
          setItems(data);
          setSelectedItem(data[0]);
          const sortedItems = data.sort((a, b) => a.id - b.id);
          setItems(sortedItems);
          setSelectedItem(sortedItems[0]);
        }
      });
  }

  useEffect(() => {
    populateData();
  }, []);

  useEffect(() => itemHighlight(selectedItem), [selectedItem]);

  function UpdateItemForm() {
    let content = null;
    if (isLoading) {
      content = (
        <div className="flex p-6 h-full bg-gray-200 rounded-br-2xl justify-center">
          <img src={spinner} width="96px" alt="spinner" />
        </div>
      );
    } else if (!selectedItem) {
      content = (
        <div className="flex p-6 h-full bg-gray-200 rounded-br-2xl justify-center">
          <label className="font-bold text-4xl text-gray-400 mt-40" htmlFor="">
            No Data
          </label>
        </div>
      );
    } else {
      useEffect(() => {
        setName(selectedItem.name);
        setFixedPriceEnabled(selectedItem.fixedPriceEnabled);
        setFixedPrice(selectedItem.fixedPrice);
        setDeductEnabled(selectedItem.deductEnabled);
        setDeduct(selectedItem.deduct);
        setDiscountEnabled(selectedItem.discountEnabled);
        setDiscount(selectedItem.discount);
      }, [selectedItem]);
      const [name, setName] = useState(selectedItem.name);
      const [fixedPriceEnabled, setFixedPriceEnabled] = useState(selectedItem.fixedPriceEnabled);
      const [fixedPrice, setFixedPrice] = useState(selectedItem.fixedPrice);
      const [deductEnabled, setDeductEnabled] = useState(selectedItem.deductEnabled);
      const [deduct, setDeduct] = useState(selectedItem.deduct);
      const [discountEnabled, setDiscountEnabled] = useState(selectedItem.discountEnabled);
      const [discount, setDiscount] = useState(selectedItem.discount);

        function handleUpdate() {
            if (fixedPrice < 0) {
                toast.error(`Update failed: fixed price should be bigger than 0`);
                setFixedPrice(0);
                return
            }
            if (deduct < 0) {
                toast.error(`Update failed: deduct amount should be bigger than 0`);
                setDeduct(0);
                return
            }
            if (discount < 0 || discount > 1) {
                toast.error(`Update failed: discount rate should be bigger than 0 and less than 1`);
                setDiscount(0);
                return
            }
        let newData = {
          id: selectedItem.id,
          name,
          fixedPriceEnabled: fixedPriceEnabled || false,
          fixedPrice:fixedPrice || 0,
          deductEnabled: deductEnabled || false,
          deduct: deduct || 0,
          discountEnabled: discountEnabled || false,
          discount: discount || 0
        };
        //console.log("payment", newData);
        updateData("payment", newData, items, setItems, setSelectedItem);
      }

      function handleDelete() {
        deleteData(
          "payment",
          items,
          setItems,
          selectedItem,
          setSelectedItem,
          populateData,
        );
      }

      content = (
        <div className="flex grow p-6 bg-gray-200 rounded-br-2xl">
          <div className="w-64">
            <h2 className=" mb-4 overflow-hidden">{name}</h2>
            <p>ID: {selectedItem.id}</p>
          </div>
          <div className="w-64 flex-col">
            <label htmlFor="payment-name">Payment Name*</label>
            <input
              type="text"
              id="payment-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" tw-input"
              maxLength="60"
            />
            <div className="grid grid-cols-2 space-x-6 mt-2">
              <label htmlFor="fixed-price-enable">Fixed Price</label>
              <input
                type="checkbox"
                id="fixed-price-enable"
                checked={fixedPriceEnabled}
                onChange={(e) => setFixedPriceEnabled(e.target.checked)}
                className="tw-check"
              />
            </div>
            {/*<label htmlFor="fixed-price">Fixed Price</label>*/}
            <input
              type="number"
              id="fixed-price"
              value={fixedPrice}
              onChange={(e) => setFixedPrice(e.target.value)}
              className=" tw-input"
              min="0"
              disabled={!fixedPriceEnabled}
              placeholder={fixedPriceEnabled?"" :"please check the box to input"}
            />
            <div className="grid grid-cols-2 space-x-6 mt-2">
              <label htmlFor="dedict-enable">Deduct</label>
              <input
                type="checkbox"
                id="dedict-enable"
                checked={deductEnabled}
                onChange={(e) => setDeductEnabled(e.target.checked)}
                className="tw-check"
              />
            </div>
            {/* <label htmlFor="deduct">Deduct</label> */}
            <input
              type="number"
              id="deduct"
              value={deduct}
              onChange={(e) => setDeduct(e.target.value)}
              className=" tw-input"
              min="0"
              disabled={!deductEnabled}
            />
            <div className="grid grid-cols-2 space-x-6 mt-2">
              <label htmlFor="discount-enable">Discount(% off)</label>
              <input
                type="checkbox"
                id="discount-enable"
                checked={discountEnabled}
                onChange={(e) => setDiscountEnabled(e.target.checked)}
                className="tw-check"
              />
            </div>            
            {/* <label htmlFor="discount">Discount (% off)</label> */}
            <input
              type="number"
              id="discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className=" tw-input"
              min="0"
              max="1"
              disabled={!discountEnabled}
            />
            <p className="-mt-2 text-xs font-normal" htmlFor="discount">e.g.: 0.2 means 20% off</p>
            <OptionButton updateData={handleUpdate} deleteData={handleDelete} />
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col w-192">
        <ToolBar title="Payment" />
        {content}
      </div>
    );
  }

  return (
    <>
      <ItemList
        type={"payment"}
        items={items}
        setItems={setItems}
        setSelectedItem={setSelectedItem}
      />
      <UpdateItemForm />
    </>
  );
}

export default Payment;
