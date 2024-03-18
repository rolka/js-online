// import { useDebugValue, useState } from "react";
import { validateNumber } from "./utils/FormValidation.jsx";
import { useEffect, useMemo, useState } from "react";
import { getCountries } from "/src/components/utils/api/getCountries.jsx";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./utils/registerService.js";
import { sessionManager } from "./utils/sessionManager.js";

const isValidNumber = (input) => {
    const phoneNumberRegex = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    return phoneNumberRegex.test(input);
};
export const Register = () =>
{
    const [countries, setCountries] = useState([]);
    
    const navigate = useNavigate();
    useEffect(() => {
        getCountries( (responseCountries) => {
            // console.log(responseCountries);
            setCountries(responseCountries)
        })
        sessionManager((someData) => {
            // console.log(someData);
            if ( someData.isLoggedIn )
            {
                navigate('/');
                // console.log('User IS logged in');
                // return;
            }
            console.log('User not logged in');
        });
    }, [navigate]);

    const [userDetails, setUserDetails] = useState({
        user_name: '',
        password: '',
        email: '',
        dob: '',
        phone: '',
    });

    const [userAddressDetails, setUserAddressDetails] = useState({
        country: '',
        county: '',
        municipality: '',
        zipcode: '',
        city: '',
        street: '',
        houseNumber: '',
        apartmentNumber: '',
    })

    const onFieldChange = ( e, field ) => {
        const newUserObject = {...userDetails};
        newUserObject[field] = e.target.value;
        setUserDetails({ ...newUserObject });
    }
    const onUserAddressChange = ( e, field, validate = null ) => {
        const newUserAddressObject = {...userAddressDetails};
        newUserAddressObject[field] = e.target.value;
        if ( validate !== null )
        {
            switch (validate)
            {
                case 'number':
                    // alert(newUserAddressObject[field]);
                    if ( !validateNumber(newUserAddressObject[field]) )
                    {
                        // alert('not a number!!');
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        setUserAddressDetails({...newUserAddressObject});
    }
    const isPhoneNumberValid = isValidNumber(userDetails.phone);

    // sendRegistrationDetails
    const createNewUser = () => {
        // console.log(userDetails)
        // console.log(userAddressDetails)
        const registrationDetails = { ...userDetails, ...userAddressDetails };
        console.log(registrationDetails);
        registerUser(registrationDetails);
    }

    const sortedCountries = useMemo( () => {
        return countries.sort(( a, b ) => {
            // console.log(a);
            // console.log(b);
            // console.log('---');
            return a.coutry_title.localeCompare(b.coutry_title)
        })
    }, [countries] );


    return (
        <div className='container mx-auto'>
            <h1 className='text-center my-5 text-2xl'>Register</h1>
            <p className='mb-5'>
                <Link to='/login' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</Link>
            </p>
            <form className="border-2 border-gray-100 shadow-gray-300 p-5">
                <h2 className='text-xl my-5'>User details</h2>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_username" id="floating_username"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userDetails.user_name}
                           onChange={(e) =>
                           {
                               onFieldChange(e, 'user_name')
                           }}/>
                    <label htmlFor="floating_username"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="password" name="floating_password" id="floating_password"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required autoComplete="on"
                           value={userDetails.password}
                           onChange={(e) =>
                           {
                               onFieldChange(e, 'password')
                           }}
                    />
                    <label htmlFor="floating_password"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="email" name="floating_email" id="floating_email"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userDetails.email}
                           onChange={(e) =>
                           {
                               onFieldChange(e, 'email')
                           }}
                    />
                    <label htmlFor="floating_email"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
                        address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="date" name="floating_dob" id="floating_dob"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userDetails.dob}
                           onChange={(e) =>
                           {
                               onFieldChange(e, 'dob')
                           }}
                    />
                    <label htmlFor="floating_dob"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">DOB</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone"
                           className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                               isPhoneNumberValid ? '' : 'border-red-500'
                           }`}
                           placeholder=" " required
                           value={userDetails.phone}
                           onChange={(e) =>
                           {
                               onFieldChange(e, 'phone')
                           }}
                    />
                    <label htmlFor="floating_phone"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
                        number (123-456-7890)</label>
                </div>

                <h2 className='text-xl my-5'>User address</h2>

                <div className="relative z-0 w-full mb-5 group">
                    <select id="floating_countries" name='floating_countries'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            value={userAddressDetails.country}
                            onChange={(e) =>
                            {
                                onUserAddressChange(e, 'country')
                            }}
                    >
                        {/*<option selected>Choose a country</option>*/}
                        {
                            // countries.map((country) =>
                            sortedCountries.map((country) =>
                            {
                                return (
                                    // if it breaks, use: key={'country-' + country.id}
                                    <option key={country.id}
                                            value={`${country.id}-${country.country_code}`}>
                                        {country.coutry_title} {/* Also fixed typo from coutry_title to country_title */}
                                    </option>
                                )
                            })
                        }
                        {/*<option value="notSelected">Choose a country</option>*/}
                        {/*<option value="US">United States</option>*/}
                        {/*<option value="CA">Canada</option>*/}
                        {/*<option value="FR">France</option>*/}
                        {/*<option value="DE">Germany</option>*/}
                    </select>
                    <label htmlFor="floating_countries"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Choose
                        country</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_county" id="floating_county"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.county}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'county')
                           }}
                    />
                    <label htmlFor="floating_county"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">County</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_municipality" id="floating_municipality"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.municipality}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'municipality')
                           }}
                    />
                    <label htmlFor="floating_municipality"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Municipality</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_postcode" id="floating_postcode"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.zipcode}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'zipcode')
                           }}
                    />
                    <label htmlFor="floating_postcode"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Post
                        code</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_city" id="floating_city"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.city}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'city')
                           }}
                    />
                    <label htmlFor="floating_city"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_street" id="floating_street"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.street}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'street')
                           }}
                    />
                    <label htmlFor="floating_street"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_housenumber" id="floating_housenumber"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.houseNumber}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'houseNumber', 'number')
                           }}
                    />
                    <label htmlFor="floating_housenumber"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">House
                        number</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_flatnumber" id="floating_flatnumber"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           value={userAddressDetails.apartmentNumber}
                           onChange={(e) =>
                           {
                               onUserAddressChange(e, 'apartmentNumber')
                           }}
                    />
                    <label htmlFor="floating_flatnumber"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Flat
                        number</label>
                </div>
                <div className="flex items-center">
                    <input id="link-checkbox" type="checkbox" required value=""
                           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                    <label htmlFor="link-checkbox"
                           className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a
                        href="#" className="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                </div>

                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                        onClick={createNewUser}
                >Submit
                </button>
            </form>
        </div>
    )
}