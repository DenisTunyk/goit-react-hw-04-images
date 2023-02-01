//import { Component } from "react";
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
//import { fetchPictureQuery } from '../../api/api.js';


export const ImageGallery = ({ query, openModal }) => {
    return (
            <ul className={css.ImageGallery}>
                {query.map(({ id, webformatURL, largeImageURL }) => (
                    <ImageGalleryItem key={id} imgSmall={webformatURL} imgLarge={largeImageURL} openModal={openModal} />
                    )
                )}
            </ul>
        )
}


ImageGallery.propTypes = {
    query: PropTypes.array,
    openModal: PropTypes.func,
}