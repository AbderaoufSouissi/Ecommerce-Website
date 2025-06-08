import type { CategoryTypeDTO } from "../../api/types";





const Categories = ({ types = [] }: {types?: CategoryTypeDTO[]}) => {
  return (
    <div>
      {types.map((type) => {
        return (
          <div key={type.id} className="flex items-center p-1">
            <input type="checkbox" name={type?.code} className="border rounded-xl w-4 h-4 accent-black text-black" />
            <label htmlFor={type?.code} className="px-2 text-[14px]">{type?.name}</label>
          </div>
        )
      })}
    </div>
  )
}

export default Categories