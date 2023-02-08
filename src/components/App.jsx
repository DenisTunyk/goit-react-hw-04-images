import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchPictureQuery } from '../api/api.js';
import { useState } from 'react';
import { useEffect } from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imgLarge, setImageLarge] = useState('');
  const [showButton, setShowButton] = useState(false);

  const toogleModal = (imgLarge = '') => {
    setShowModal(prevState => !prevState);
    setImageLarge(imgLarge);
  };

  //   const closeModal = () => {
  //     setShowModal(prevState => !prevState);
  //   };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const getQuery = queryForm => {
    if (queryForm !== query) {
      setPage(1);
      setQuery(queryForm);
      setItems([]);
    }
  };

  useEffect(() => {
    if (query === '') return;
    setIsLoader(true);
    async function foo() {
      try {
        const data = await fetchPictureQuery(query, page);
        setItems(prevState => [...prevState, ...data.hits]);
        if (page < Math.ceil(data.totalHits / 12)) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoader(false);
      }
    }
    foo();
  }, [query, page]);

  return (
    <div>
      <Searchbar onSubmit={getQuery} />
      <ImageGallery query={items} openModal={toogleModal} />
      {!(items.length === 0) && showButton && !isLoader && (
        <Button onClick={loadMore} />
      )}
      <Loader isLoader={isLoader} />
      {showModal && (
        <Modal
          onClose={toogleModal}
          img={imgLarge}
          showModal={showModal}
          setShowModal={setShowModal}
        ></Modal>
      )}
    </div>
  );
};
