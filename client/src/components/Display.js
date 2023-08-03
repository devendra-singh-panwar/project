/*import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item, index) => {
       
        return (
          <a href={item} key={index} target="_blank">
            <img
              key={index}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img> 
          </a>
        );
      });
      setData(images);
      console.log(images);
      console.log(data);
    } else {
      alert("No image to display");
    }
  };
  return (
    <div className="display">
      <h3>Get the Data of Any Address</h3>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list">{data}</div>
    </div>
  );
};
export default Display;


*/

import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getdata = async () => {
    const Otheraddress = document.querySelector(".address").value;
    try {
      let dataArray;
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }

      if (dataArray.length > 0) {
        const files = dataArray.map((file, index) => (
          <a href={file} key={index} target="_blank">
           <h3 style={{color:"black"}}>File No.{index + 1}</h3>  <h3 style={{color:"black"}}>File Name:</h3> {file.substring(file.lastIndexOf("/") + 1)}
           
          </a>
        ));
        setData(files);
      } else {
        setData([]);
        alert("No files to display");
      }
    } catch (e) {
      alert("You don't have access");
    }
  };

  return (
    <div className="display">
      <h3>Get the Data of Any Address</h3>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
      <div className="image-list">{data}</div>
    </div>
  );
};

export default Display;

