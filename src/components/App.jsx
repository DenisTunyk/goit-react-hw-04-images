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

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toogleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  }, [showModal]);

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
        <Modal onClose={toogleModal} img={imgLarge}>
          {/* {this.props.children} */}
        </Modal>
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     page: 1,
//     query: '',
//     items: [],
//     isLoader: false,
//     showModal: false,
//     imgLarge: '',
//     showButton: false,
//   };

//   toogleModal = (imgLarge = '') => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//       imgLarge,
//     }));
//   };

//   getQuery = query => {
//     if (query !== this.state.query) {
//       this.setState({
//         page: 1,
//         query: query,
//         items: [],
//       });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   async componentDidUpdate(_, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.query !== this.state.query
//     ) {
//       this.setState({ isLoader: true });
//       try {
//         const data = await fetchPictureQuery(this.state.query, this.state.page);
//         this.setState(prevState => ({
//           items: [...prevState.items, ...data.hits],
//         }));
//         if (this.state.page < Math.ceil(data.totalHits / 12)) {
//           this.setState({ showButton: true });
//         } else {
//           this.setState({ showButton: false });
//         }
//       } catch (error) {
//         console.log(error);
//       } finally {
//         this.setState({ isLoader: false });
//       }
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.getQuery} />
//         <ImageGallery query={this.state.items} openModal={this.toogleModal} />
//         {!(this.state.items.length === 0) &&
//           this.state.showButton &&
//           !this.state.isLoader && <Button onClick={this.loadMore} />}
//         <Loader isLoader={this.state.isLoader} />
//         {this.state.showModal && (
//           <Modal onClose={this.toogleModal} img={this.state.imgLarge}>
//             {this.props.children}
//           </Modal>
//         )}
//       </div>
//     );
//   }
// }
