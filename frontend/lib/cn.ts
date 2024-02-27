import { twMerge, ClassNameValue } from "tailwind-merge"
import clsx from "clsx"

const cn = (...items: ClassNameValue[]) => {
    return twMerge(clsx(items))
}

export default cn