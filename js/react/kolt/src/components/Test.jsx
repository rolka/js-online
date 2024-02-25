import PropTypes from "prop-types";
import classNames from "classnames";

export const Test = ( {btnType} ) => (
        <>
            <p className={classNames({
                someClass: {btnType} === 'default'
            })}>Type is: {btnType}</p>
        </>
    )

Test.propTypes = {
    btnType: PropTypes.string
}
