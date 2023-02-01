import { ColorRing } from 'react-loader-spinner'
import css from './Loader.module.css'
import PropTypes from 'prop-types';

export const Loader = ({isLoader}) => {
    return (
        <div className={css.Loader}>
            <ColorRing
            visible={isLoader}
            height="80"
            width="80"
            ariaLabel="radio-loading"
            wrapperStyle={{}}
            wrapperClass="radio-wrapper"
        />
        </div>
    )
}

Loader.propTypes = {
    isLoader: PropTypes.bool,
}