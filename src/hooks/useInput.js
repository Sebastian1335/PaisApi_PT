import { useState } from "react"

export const useInput = (initialState) => {
    const [form, setForm] = useState(initialState)
    
    const onInputChange = ({target}) => {
          const { name, value } = target;
        setForm({
            ...form,
            [name]: value,
        });
    }

    const refreshForm = () => {
        setForm(initialState)
    }

    return {
        form,
        setForm,
        onInputChange,
        refreshForm
    }
}
