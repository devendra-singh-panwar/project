import React, { useState } from "react";
import "./RemoveAccess.css";

const RemoveAccess = ({ contract }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");

  const removeAccess = async () => {
    if (selectedAddress) {
      await contract.disallow(selectedAddress);
      setModalOpen(false);
    }
  };

  return (
    <>
      <button className="removeAccessBtn" onClick={() => setModalOpen(true)}>
        Remove Access
      </button>
      {modalOpen && (
        <div className="modalBackground">
          <div className="modalContainer">
            <div className="title">Remove Access</div>
            <div className="body">
              <form>
                <select
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                >
                  <option value="">Select Address to Remove Access</option>
                  {/* Here you can map through the list of addresses that have access and create <option> elements for each */}
                  {/* Example: */}
                  {/* {addressList.map((address) => (
                    <option key={address} value={address}>
                      {address}
                    </option>
                  ))} */}
                </select>
              </form>
            </div>
            <div className="footer">
              <div className="btn-group">
                <button onClick={() => setModalOpen(false)} id="cancelBtn">
                  Cancel
                </button>
              </div>
              <div className="btn-group">
                <button onClick={() => removeAccess()}>Remove Access</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RemoveAccess;
