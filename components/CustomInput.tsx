import React from 'react'
import { authFormSchema } from '@/lib/utils';
import z from 'zod'
import { Control } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
type FormValues = z.infer<ReturnType<typeof authFormSchema>>;

interface CustomInput {
    control: Control<FormValues>;
    name: keyof FormValues;
    label: string;
    placeholder: string;
}
const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <div className="form-item">
                    <FormLabel className="form-label">{label}</FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className="input-class"
                                type={name === "password" ? "password" : "text"}
                                {...field}
                            />
                        </FormControl>
                        <FormMessage className="form-message mt-2" />
                    </div>
                </div>
            )}

        />
    )
}

export default CustomInput