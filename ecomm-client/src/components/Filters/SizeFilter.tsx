import { useState } from "react"


interface SizeFilterProps {
    sizes?: Array<string>,
    hideTitle: boolean,
    multi: boolean
}

const SizeFilter = ({ sizes , hideTitle , multi = true}: SizeFilterProps) => {

    const [appliedSizes, setAppliedSizes] = useState<Array<string>>([])


    const handleOnClick = (size: string) => {
        if (appliedSizes.includes(size)) {
            setAppliedSizes(appliedSizes.filter(s => s != size))
        }
        else {
            if (multi) {
                
                setAppliedSizes([...appliedSizes, size])
            }
            else {
                setAppliedSizes([size])
            }
        }

    }


    return (
        <div className="flex flex-col mb-4">
            {!hideTitle &&  <p className="text-[16px] text-black mt-5 mb-5">Sizes</p>}
           
            <div className="flex flex-wrap gap-3">
                {sizes?.map((size) => (
                    <div
                        key={size}
                        className={`w-8 h-8 rounded-xl shadow-sm hover:scale-105 transition-transform duration-150 cursor-pointer ${appliedSizes.includes(size) ? "ring-2 ring-purple-900 ring-offset-1" : "border-0"}`}
                        onClick={() => handleOnClick(size)}
                    >
                    <p aria-disabled className="text-center pt-1">{size}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SizeFilter