"use client";

import { useState } from "react";

export default function TowelOrder(){
    const[quantity,setQuantity] = useState(1);

    return(
        <div  className="mt-6 rounded-xl bg-green-50 p-6 text-center shadow-md"   >
            <h2 className="mb-4 text-2xl font-bold text-green-800">طلب المناشف</h2>
            <p className="mb-4 text-lg font-medium text-gray-700">الكمية: {quantity} </p>
        <div className="flex items-center justify-center gap-3">
            <button onClick={() => setQuantity(quantity + 1)}  className="rounded-lg bg-green-800 px-5 py-2 text-white hover:bg-green-700"  > + </button>

            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}  className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700" >  -  </button>
        </div>
        
        </div>
    );
}