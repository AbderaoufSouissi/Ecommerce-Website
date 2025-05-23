import { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../Filters/PriceFilter.css'


const PriceFilter = () => {

    const [range, setRange] = useState({
        min: 10,
        max: 250
    })


    return (
        <div>
            <p className="text-[16px] text-black mt-5 p-1">Price</p>
            <RangeSlider className='custom-range-slider ' min={0} max={300} defaultValue={[range.min, range.max]} onInput={(values) => {
                setRange({
                    min: values[0],
                    max: values[1]
                })
            }} />
            <div>
                <div className="flex justify-between">
                    <div className="border rounded-lg h-8 mt-4 pl-3 max-w-[50%] w-[40%] flex items-center justify-center">
                        <input
                            type="number"
                            value={range?.min}
                            className="outline-none w-full h-full text-center"
                            placeholder="min"
                            disabled
                        />
                    </div>

                    <div className="border rounded-lg h-8 mt-4 pl-3 max-w-[50%] w-[40%] flex items-center justify-center">
                        <input
                            type="number"
                            value={range?.max}
                            className="outline-none w-full h-full text-center"
                            placeholder="max"
                            disabled
                        />
                    </div>


                </div>



            </div>
        </div>
    )
}

export default PriceFilter