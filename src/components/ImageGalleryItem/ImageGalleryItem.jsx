
import css from "./ImageGalleryItem.module.css"

export const ImageGalleryItem = ({id, imgSmall, imgLarge, openModal}) => {
    return (
        <li key={id} className={css.ImageGalleryItem} onClick={() => openModal(imgLarge)}>
            <img className={css.ImageGalleryItemImage} src={imgSmall} alt={id} />
        </li>
    )
}