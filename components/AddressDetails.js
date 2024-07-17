import {Controller, useForm} from "react-hook-form";
import PhoneInput, {isValidPhoneNumber} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {useEffect, useState} from "react";

export default function AddressDetails(props) {

    const {
        register,
        handleSubmit,
        clearErrors,
        resetField,
        control,
        formState: {errors}
    } = useForm();
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleValidate = (value) => {
        if (value !== undefined && value !== '') {
            setPhoneNumber(value);
            const isValid = isValidPhoneNumber(value.toString());
            return isValid;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (document.getElementById('Phone_Number') !== null)
            document.getElementById('Phone_Number').classList.add("border", "border-custom-stepGrey", "opacity-90", "font-medium", "text-sm", "rounded-lg", "block", "w-full", "p-2.5");
    }, [])

    async function saveData(data) {
        try {
            document.getElementById('responseData').innerText = JSON.stringify(data);

            clearFields();
        } catch (err) {
        }
    }

    function clearFields() {
        try {
            setPhoneNumber('');
            resetField("name");
            resetField("mobile");
            resetField("email");
            resetField("address");
            clearErrors();

        } catch (e) {

        }
    }

    return (
        <div>
            <div className="max-w-7xl mx-4 lg:mx-28">
                <div className="container">
                    <div className="mt-11 animate-[fade-in_1s_ease-in-out] bg-white ">
                        <div className={"pt-[71px]"}>
                            <div id="userInfo" className={"contact"}>
                                <div className="w-full contact rounded text-xl font-bold text-center text-custom-dark">

                                    <div className="text-3xl pt-7 font-bold text-center text-custom-dark">Fill the details!
                                    </div>
                                    <div className="text-3xl mx-4 pt-3 font-bold text-center text-custom-dark">Just drop us a message, and our expert team<br/>
                                        <span> will assist you every step of the way !</span>
                                    </div>
                                </div>
                                <form className="mt-16 contact rounded p-5 md:px-12 text-custom-dark"
                                      onSubmit={handleSubmit(saveData)}>
                                    <div className="text-custom-dark">
                                        <div className={"mb-6"}>
                                            <label htmlFor="Name"
                                                   className="block mb-3 text-lg font-normal opacity-90">
                                                Name
                                            </label>
                                            <input type="text" id="Name"
                                                   className="border border-custom-stepGrey opacity-90 font-medium text-sm rounded-lg block w-full p-2.5"
                                                   placeholder="Name" {...register("name", {required: true})}/>
                                            {errors.name &&
                                                <div className="mt-2 text-red-500">Name is required.</div>}
                                        </div>
                                        <div className="grid gap-6 mb-6 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="Email"
                                                       className="block mb-3 text-lg font-normal opacity-90">
                                                    Your Email
                                                </label>
                                                <input type="Email" id="Email"
                                                       pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                       className="border border-custom-stepGrey opacity-90 font-medium text-sm rounded-lg block w-full p-2.5 "
                                                       placeholder="Email"{...register('email', {required: true})} />
                                                {errors.email &&
                                                    <div className="mt-2 text-red-500">Email is required.</div>}
                                            </div>

                                            <div>
                                                <label htmlFor="Phone_Number"
                                                       className="block mb-3 text-lg font-normal opacity-90">
                                                    Phone Number
                                                </label>
                                                <Controller
                                                    name="mobile"
                                                    control={control}
                                                    defaultValue=""
                                                    placeHolder="Enter Phone Number"
                                                    className=" border border-custom-stepGrey opacity-90 font-medium text-sm rounded-lg block w-full p-2.5"
                                                    rules={{
                                                        required: "Phone number is required",
                                                        validate: (value) => handleValidate(value)
                                                    }}
                                                    render={({field: {onChange, value}}) => (
                                                        <PhoneInput
                                                            value={phoneNumber}
                                                            control={control}
                                                            autoComplete={"nope"}
                                                            onChange={onChange}
                                                            defaultCountry="IN"
                                                            id="Phone_Number"
                                                            placeholder="Enter Phone Number"
                                                            rules={{
                                                                required: "Phone number is required",
                                                                validate: (value) => handleValidate(value)
                                                            }}
                                                        />
                                                    )}
                                                />
                                                {errors.mobile && (
                                                    <div
                                                        className="mt-2 mobile text-red-500">{errors.mobile.message !== "" ? errors.mobile.message : "Enter Valid Phone Number"}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={"mt-5"}>
                                            <label htmlFor="message"
                                                   className="block mb-2 text-lg font-normal opacity-90 ">Your
                                                Address</label>
                                            <textarea id="message" rows="4"
                                                      className="border border-custom-stepGrey opacity-90 font-medium text-sm rounded-lg block w-full p-2.5"
                                                      placeholder="Type your message..." {...register("address", {required: true})}></textarea>
                                            {errors.address &&
                                                <div className="mt-2 text-red-500">Address is required.</div>}
                                        </div>
                                        <div className="flex justify-center w-full cursor-pointer text-white">
                                            <input value="Submit"
                                                   className="px-1.5 flex cursor-pointer justify-center submit bg-[#7ba07b] text-center text-white mt-6  py-1.5 rounded-md text-lg font-normal"
                                                   type="submit" id="userInfoSubmit"/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div id="responseData" className="error text-center mt-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

