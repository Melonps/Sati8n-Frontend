import { useState, useEffect } from "react";

// ShowHelloコンポーネントの定義
const ShowHello = () => {
    const [price, setPrice] = useState(1000);
    const [taxRate, setTaxRate] = useState(10);
    const priceWithTax = Math.ceil(price * (1 + taxRate / 100));

    return (
        <div>
            <div>価格: {price}円</div>
            <div>税率: {taxRate}%</div>
            <div>価格（税込）: {priceWithTax}円</div>
            <div>
                <button onClick={() => setTaxRate((n) => n + 5)}>+5%</button>
                <button onClick={() => setPrice((n) => n + 1000)}>
                    +1000円
                </button>
            </div>
        </div>
    );
};
export default ShowHello;
