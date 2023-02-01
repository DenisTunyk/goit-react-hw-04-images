import css from "./Button.module.css"
import PropTypes from 'prop-types';

export const Button = ({onClick}) => {
    return (
        <button className={css.Button} disabled={false} style={{display: "block"}} type="button" onClick={onClick}>Load more</button>
    )
}

Button.propTypes = {
    onClick: PropTypes.func,
}