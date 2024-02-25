import classNames from "classnames";
import PropTypes from "prop-types";
export const Button = ( { btnType = 'default' } ) =>
{
    const validBtnTypes = ['default', 'warning'];
    const normalizedBtnType = validBtnTypes.includes(btnType) ? btnType : 'default';
    // const classes = classNames('btn', normalizedBtnType);

    const classes = classNames(
        'btn',
        { [normalizedBtnType]: true },
        { 'isBtnWarningColor': btnType === 'warning' },
        { 'isBtnDefaultColor': btnType === 'default' },
    );

    return (
        <>
            <button type="button" className={classes}>{normalizedBtnType}</button>
        </>
    )
}

Button.propTypes = {
    btnType: PropTypes.string
}