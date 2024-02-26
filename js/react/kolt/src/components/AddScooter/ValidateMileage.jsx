export const ValidateMileage = () =>
{

    if (isNaN(e.target.value) || e.target.value < 0) {
        setErrors([{
            errorField: 'mileage',
            message: 'Mileage input error'
        }]);
        setMileageError('Mileage input error');
        console.log('Mileage error set');
        // return;
    }
    else {
        setErrors([]);
        setMileageError('');
        setScooter( { ...scooter, ride: e.target.value } );
        console.log(errors);
    }

    return (
        <></>
    )
}

