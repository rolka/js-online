import PropTypes from "prop-types";

export const KoltButton = ({
    buttonText = 'Button text',
    bgColor,
    bgColorClass,
    onClick
}) => {
    const buttonStyle = {
        // backgroundColor: bgColor || '', // Set a default color if not provided
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    };

    const classes = [
        'rounded-md',
        'px-6',
        'py-1',
        'w-1/4',
        'bg-opacity-85',
        'hover:bg-opacity-100',
        bgColorClass || 'bg-indigo-600'
    ].join(' ');

    return (
        <button className={classes}
                style={buttonStyle}
                onClick={onClick}>
            {buttonText}
        </button>
    );
};

KoltButton.propTypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func
}