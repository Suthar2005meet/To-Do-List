import React from 'react'
import { useForm } from 'react-hook-form'
 
export const Login = () => {

    const {register,handleSubmit,formState:{errors}} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }


  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("email",{required:true})} />
            <input type="password" {...register("password",{required:true})} />
            <input type="submit" />
        </form>
    </div>
  )
}
