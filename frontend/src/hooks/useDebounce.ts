import { useState, useEffect } from 'react'

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDeoubncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDeoubncedValue(value), delay)

        return () => clearTimeout(handler)
    }, [value])

    return debouncedValue
}

export default useDebounce