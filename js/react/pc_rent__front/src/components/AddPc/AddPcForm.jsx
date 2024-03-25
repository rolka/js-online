import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createPcWithImage } from "../utils/pcService.js";
export const AddPcForm = () =>
{
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const pcName = useRef();
    const cpu = useRef();
    const gpu = useRef();
    const ramType = useRef();
    const ramSpeed = useRef();
    const ramAmount = useRef();
    const pcType = useRef();
    const pcPhoto = useRef();
    const submitButton = useRef();
    // useEnterNavigationAndSelectOpening([pcName, cpu, gpu, ramType, ramSpeed,ramAmount, pcType, pcPhoto]);
    /*
    * todo:
    *  1. change to individual ref fields
    *  so that focus could be used
    *  check on simple input, maybe it's not working because of these floating labels?
    *  - add all input fields to submit form data
    *  2. create a class/model for PC
    *  3. try to create a focus jump to nxt field on keyboard enter
    *  open select fields also
    * */
    const createNewPc = () => {
        // const allInputData = {
        //     pcName: pcName.current.value,
        //     cpu: cpu.current.value,
        //     gpu: gpu.current.value,
        //     ramType: ramType.current.value,
        //     ramSpeed: ramSpeed.current.value,
        //     ramAmount: ramAmount.current.value,
        //     pcType: pcType.current.value
        // }
        const formData = new FormData();
        formData.append('pcName', pcName.current.value);
        formData.append('cpu', cpu.current.value);
        formData.append('gpu', gpu.current.value);
        formData.append('ramType', ramType.current.value);
        formData.append('ramSpeed', ramSpeed.current.value);
        formData.append('ramAmount', ramAmount.current.value);
        formData.append('pcType', pcType.current.value);
        // formData.append('test', 'test!!!');
        formData.append('files', pcPhoto.current.value);
        console.log(formData);
        // console.log(formData.get('ramAmount'));
        // console.log(formData.get('test'));
        // console.log(formData.get('cpu'));

        // createPc(allInputData, (resp) => {
        // createPc( formData, (resp) => {
        //     console.log(resp);
        //     if ( resp.success )
        //     {
        //         alert(`New ${resp.newPc.pcType} created `);
        //         navigate('/');
        //     }
        //     else
        //     {
        //         alert('Problem creating new PC');
        //     }
        // })
        createPcWithImage( formData, (resp) => {
            console.log(resp);
            if ( resp.success )
            {
                alert(`New ${resp.newPc.pcType} created `);
                navigate('/');
            }
            else
            {
                alert('Problem creating new PC');
            }
        })

    }
    const useEnterNavigationAndSelectOpening = (fields) => {
        useEffect(() => {
            const handleEnterPress = (currentRef, nextRef) => (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (nextRef && nextRef.current) {
                        nextRef.current.focus();
                    }
                }
            };
            const handleFocus = (selectRef) => () => {
                selectRef.current.focus();
            };
            const cleanupListeners = () => {
                fields.forEach((currentRef) => {
                    const element = currentRef.current;
                    if (element) {
                        element.removeEventListener('keydown', handleEnterPress);
                        if (element.tagName === 'SELECT') {
                            element.removeEventListener('focus', handleFocus);
                        }
                    }
                });
            };
            fields.forEach((currentRef, index) => {
                const nextRef = fields[index + 1];
                const element = currentRef.current;
                if (element) {
                    element.addEventListener('keydown', handleEnterPress(currentRef, nextRef));
                    if (element.tagName === 'SELECT') {
                        element.addEventListener('focus', handleFocus(currentRef));
                    }
                }
            });
            return cleanupListeners;
        }, [fields]);
    };
    
    useEnterNavigationAndSelectOpening([pcName, cpu, gpu, ramType, ramSpeed,ramAmount, pcType, pcPhoto]);

    useEffect(() => {
        const testEventHandler = () => {
            // alert('CPU clicked')
        }
        // console.log('useEffect worked!!!');
        // console.log(cpu.current);
        const cpuElement = cpu.current;
        if ( cpuElement )
        {
            cpuElement.addEventListener('click', testEventHandler)
        }
        return () => {
            if ( cpuElement )
            {
                cpuElement.removeEventListener('click', testEventHandler)
            }
        }
    }, []);

    /*
    * todo: possible problem with file input is that it has wrong name attribute
    * */
    return (
        <div className='container mx-auto'>
            <h1 className='text-center my-5 text-2xl select-none'>Add new PC</h1>
            {errorMessage && (
                <p className='text-red-500 font-bold text-center mb-5'>{errorMessage.message}</p>
            )}
            <form className="border-2 border-gray-100 shadow-gray-300 p-5">
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_pc_name" id="floating_pc_name"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           ref={pcName}
                    />
                    <label htmlFor="floating_pc_name"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        PC name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_cpu" id="floating_cpu"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           ref={cpu}
                    />
                    <label htmlFor="floating_cpu"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CPU</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_gpu" id="floating_gpu"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           ref={gpu}
                    />
                    <label htmlFor="floating_gpu"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Graphics
                        card (GPU)</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select id="floating_ram_type" name='floating_ram_type'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            defaultValue={'Select'}// does not work
                            ref={ramType}
                    >
                        <option value="ddr">DDR</option>
                        <option value="ddr2">DDR2</option>
                        <option value="ddr3">DDR3</option>
                        <option value="ddr4">DDR4</option>
                        <option value="ddr5">DDR5</option>
                    </select>
                    <label htmlFor="floating_ram_type"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ram
                        Type</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" name="floating_ram_speed" id="floating_ram_speed"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" " required
                           ref={ramSpeed}
                    />
                    <label htmlFor="floating_ram_speed"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Ram
                        speed (MHZ)</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select id="floating_ram_amount" name='floating_ram_amount'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            defaultValue={'Select'}// does not work
                            ref={ramAmount}
                    >
                        <option value="8">8GB</option>
                        <option value="16">16GB</option>
                        <option value="32">32GB</option>
                    </select>
                    <label htmlFor="floating_ram_amount"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RAM
                        amount</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <select id="floating_pc_type" name='floating_pc_type'
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            defaultValue={'Select'}// does not work
                            ref={pcType}
                    >
                        <option value="macbook">Macbook</option>
                        <option value="laptop">Laptop</option>
                        <option value="desktop">Desktop Computer</option>
                    </select>
                    <label htmlFor="floating_pc_type"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Computer
                        type</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input type="file"
                           accept='.jpg, .png'
                           multiple={true}
                           name="files" id="floating_pc_photo"
                           className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                           placeholder=" "
                           required
                           onChange={(event) => {
                               console.log(event);
                               if ( event.target.files.length > 2 )
                               {
                                   alert('Max 2 files!');
                                   event.target.value = '';
                               }
                           }}
                           ref={pcPhoto}
                    />
                    <label htmlFor="floating_pc_photo"
                           className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">PC
                        photo</label>
                </div>

                <button type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                        ref={submitButton}
                        onClick={createNewPc}>Submit
                </button>
            </form>

        </div>
    )
}

/*
 * todo: change the above useEffect with listener to the one below
 * */
function Dropdown ()
{
    const ref = useRef(null);
    const [open, setOpen] = useState(false);
    const [options, setoptions] = useState([
        { key: 1, value: "Audi" },
        { key: 2, value: "BMW" },
        { key: 3, value: "Jaguar" },
        { key: 4, value: "Ferrari" }
    ]);
    const [option, setOption] = useState("");

    useEffect(() =>
    {
        const handleClickOutside = (event) =>
        {
            if ( ref.current && ! ref.current.contains(event.target) )
            {
                setOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={ref}>
            <button onClick={() => setOpen( ! open)}>Toggle Dropdown</button>
            {open && (
                <ul>
                    {options.map((option) => (
                        <li key={option.key} onClick={() => setOption(option.value)}>
                            {option.value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}