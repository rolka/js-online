import './customHeadingTextStyles.css';
import classNames from "classnames";

export const CustomHeading = ({
    color = 'black',
    children = 'Provide customHeadingText'
}) => (
    // <div className={classNames({ customHeading: true })}>
    <div className={customHeadingClass}>
        <h1 style={{ color: color }}>{children}</h1>
    </div>
)
const customHeadingClass = classNames({
    customHeading: true,
});
